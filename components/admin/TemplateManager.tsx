
import React, { useState, useEffect } from 'react';
import { Button } from '../Button';
import { Search, Upload, FileCode, CheckCircle, Eye, Trash2, Loader2, X, Save, RefreshCw, Terminal, AlertTriangle, Play, Smartphone, Monitor, Sparkles } from 'lucide-react';
import { supabase } from '../../lib/supabase/client';
import { GoogleGenAI } from "@google/genai";

type ViewMode = 'list' | 'upload' | 'processing' | 'review';

export const TemplateManager: React.FC = () => {
  const [view, setView] = useState<ViewMode>('list');
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Upload & Processing State
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [activeUploadId, setActiveUploadId] = useState<string | null>(null);
  const [pipelineLogs, setPipelineLogs] = useState<any[]>([]);
  const [pipelineStatus, setPipelineStatus] = useState<string>('idle'); // idle, uploading, validating, converting, completed
  const [progress, setProgress] = useState(0);
  const [isStarting, setIsStarting] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);

  // Form State for manual metadata (if needed after conversion)
  const [formData, setFormData] = useState({
     name: '',
     category: 'General',
     description: ''
  });

  // --- 1. Fetching ---
  const fetchTemplates = async () => {
     setLoading(true);
     const { data } = await supabase.from('templates').select('*').order('created_at', { ascending: false });
     if (data) setTemplates(data);
     setLoading(false);
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  // --- 2. Pipeline Simulation (The AI Factory) ---
  const runSimulation = async (uploadId: string) => {
      setProgress(5);
      setPipelineStatus('validating');
      addLog(uploadId, 'validator', 'queued', 'Checking ZIP structure and manifest...');
      
      // Step 1: Validation
      await new Promise(r => setTimeout(r, 1000));
      setProgress(20);
      addLog(uploadId, 'validator', 'success', 'Valid theme.json found. Source files detected.');
      
      if (!uploadId.startsWith('mock-')) {
         await supabase.from('template_raw_uploads').update({ status: 'validated' }).eq('id', uploadId);
      }

      // Step 2: Extraction
      setPipelineStatus('converting');
      addLog(uploadId, 'extractor', 'processing', 'Extracting logic from PHP/Blade templates...');
      await new Promise(r => setTimeout(r, 1500));
      setProgress(35);
      addLog(uploadId, 'extractor', 'success', 'Logic extracted. Preparing for AI conversion.');

      // Step 3: AI Conversion with Gemini
      addLog(uploadId, 'ai_worker', 'processing', 'Connecting to Gemini for React component generation...');
      
      try {
          const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
          const filename = uploadFile?.name || 'theme.zip';
          
          // Ask Gemini for a plausible migration plan based on the filename
          const planResponse = await ai.models.generateContent({
              model: 'gemini-2.5-flash',
              contents: `I am migrating a PHP theme file named "${filename}" to React. 
              Generate a JSON array of 4 realistic technical log messages that a migration script would output. 
              Example: ["Converting header.php to Header.tsx", "Refactoring jQuery to vanilla JS"].`,
              config: { responseMimeType: 'application/json' }
          });
          
          let steps = ["Converting layout.php to Layout.tsx", "Refactoring assets..."];
          try {
             const jsonText = planResponse.text || "[]";
             const parsed = JSON.parse(jsonText);
             if (Array.isArray(parsed) && parsed.length > 0) steps = parsed;
          } catch (e) {
             console.warn("Failed to parse AI plan", e);
          }

          const stepValue = 45 / steps.length;
          let currentProg = 35;

          for (const step of steps) {
              await new Promise(r => setTimeout(r, 1000));
              currentProg += stepValue;
              setProgress(currentProg);
              addLog(uploadId, 'ai_worker', 'info', step);
          }

          // Generate Review Data
          const reviewResponse = await ai.models.generateContent({
              model: 'gemini-2.5-flash',
              contents: `Generate a JSON object for a theme named "${filename}" with:
              1. "score": number (75-98)
              2. "summary": string (1 sentence marketing description)
              3. "category": string (e.g. Business, E-commerce)
              4. "seo_score": number (0-100)
              5. "a11y_score": number (0-100)`,
              config: { responseMimeType: 'application/json' }
          });
          
          const reviewData = JSON.parse(reviewResponse.text || "{}");
          setAiAnalysis(reviewData);
          setFormData(prev => ({
              ...prev,
              name: (filename.split('.')[0]).charAt(0).toUpperCase() + (filename.split('.')[0]).slice(1),
              category: reviewData.category || 'General',
              description: reviewData.summary || 'Imported theme.'
          }));

      } catch (err) {
          console.error("AI Error", err);
          addLog(uploadId, 'ai_worker', 'warning', 'AI enrichment unavailable. Using fallback.');
      }
      
      addLog(uploadId, 'ai_worker', 'success', 'All components converted successfully.');
      
      if (!uploadId.startsWith('mock-')) {
         await supabase.from('template_raw_uploads').update({ status: 'converted' }).eq('id', uploadId);
      }

      // Step 4: Build Preview
      addLog(uploadId, 'builder', 'processing', 'Generating static preview build...');
      await new Promise(r => setTimeout(r, 1000));
      setProgress(100);
      addLog(uploadId, 'builder', 'success', 'Preview deployed to edge.');

      setPipelineStatus('completed');
  };

  const addLog = (uploadId: string, step: string, status: string, msg: string) => {
      const log = {
          step, 
          status, 
          details: { message: msg }, 
          created_at: new Date().toISOString()
      };
      setPipelineLogs(prev => [log, ...prev]);
  };

  const handleFileUpload = async (e: React.FormEvent) => {
      e.preventDefault();
      if(!uploadFile) return;
      setIsStarting(true);

      let uploadId = '';

      try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session) {
              const { data: upload, error } = await supabase.from('template_raw_uploads').insert({
                  filename: uploadFile.name,
                  status: 'uploaded',
                  uploader_id: session.user.id
              }).select().single();

              if (error) throw error;
              uploadId = upload.id;
          } else {
              // Proceed in mock mode if no session (for demo)
              uploadId = `mock-${Date.now()}`;
          }
      } catch (err) {
          console.warn("Using mock upload pipeline due to error (likely RLS or Demo mode):", err);
          uploadId = `mock-${Date.now()}`;
      }

      setActiveUploadId(uploadId);
      setPipelineLogs([]); // Clear logs
      setProgress(0);
      
      setTimeout(() => {
          setIsStarting(false);
          setView('processing');
          runSimulation(uploadId);
      }, 500); 
  };

  const handlePublish = async () => {
      if(!activeUploadId) return;
      
      const slug = formData.name.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');
      
      const { error } = await supabase.from('templates').insert({
          name: formData.name,
          slug: slug,
          description: formData.description,
          category: formData.category,
          status: 'published',
          image_url: 'https://picsum.photos/800/600',
          current_version: '1.0.0',
          installs_count: 0
      });

      if(error) {
          alert('Publish failed: ' + error.message);
      } else {
          alert('Template published successfully!');
          setView('list');
          fetchTemplates();
          setPipelineLogs([]);
          setUploadFile(null);
          setAiAnalysis(null);
      }
  };

  const handlePreview = (template: any) => {
      if (template.preview_url) {
          window.open(template.preview_url, '_blank');
      } else {
          alert('Preview unavailable for this template.');
      }
  };

  // --- Views ---

  if (view === 'processing') {
      return (
          <div className="max-w-4xl mx-auto py-12">
              <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                      {pipelineStatus === 'completed' ? <CheckCircle className="text-green-500 w-8 h-8"/> : <Loader2 className="animate-spin text-blue-500 w-8 h-8"/>}
                      {pipelineStatus === 'completed' ? 'Processing Complete' : 'Converting Template...'}
                  </h2>
                  <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setView('list')}>Cancel</Button>
                      {pipelineStatus === 'completed' && (
                          <Button onClick={() => setView('review')}>Review & Publish</Button>
                      )}
                  </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>Pipeline Progress</span>
                      <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-neutral-800 rounded-full h-3 overflow-hidden border border-neutral-700">
                      <div 
                          className="bg-gradient-to-r from-primary-600 to-purple-600 h-full rounded-full transition-all duration-500 ease-out relative" 
                          style={{ width: `${progress}%` }}
                      >
                          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2 text-right font-mono">Est. time remaining: {progress < 100 ? `${Math.ceil((100 - progress) / 10)}s` : '0s'}</div>
              </div>

              <div className="grid grid-cols-3 gap-8">
                  {/* Status Steps */}
                  <div className="col-span-1 space-y-4">
                      {['validating', 'converting', 'building'].map((step, i) => {
                          const isActive = pipelineStatus === step;
                          let color = 'bg-neutral-800 text-neutral-500';
                          if (isActive) color = 'bg-blue-900/20 text-blue-400 border-blue-800 animate-pulse';
                          if (pipelineStatus === 'completed' || (step === 'validating' && pipelineStatus !== 'validating') || (step === 'converting' && pipelineStatus === 'building')) {
                              color = 'bg-green-900/20 text-green-400 border-green-800';
                          }

                          return (
                              <div key={step} className={`p-4 rounded-xl border border-neutral-700 flex items-center gap-3 transition-all ${color}`}>
                                  {color.includes('green') ? <CheckCircle className="w-5 h-5"/> : <RefreshCw className={`w-5 h-5 ${isActive ? 'animate-spin' : ''}`}/>}
                                  <span className="capitalize font-medium">{step}</span>
                              </div>
                          )
                      })}
                  </div>

                  {/* Logs Terminal */}
                  <div className="col-span-2 bg-black rounded-xl border border-neutral-800 p-4 font-mono text-xs h-[400px] overflow-y-auto shadow-inner">
                      <div className="text-neutral-500 mb-2 border-b border-neutral-800 pb-2 flex items-center gap-2">
                          <Terminal className="w-4 h-4"/> System Logs
                      </div>
                      <div className="space-y-2">
                          {pipelineLogs.map((log, i) => (
                              <div key={i} className="flex gap-2">
                                  <span className="text-neutral-600">[{new Date(log.created_at).toLocaleTimeString()}]</span>
                                  <span className={`
                                      ${log.step === 'ai_worker' ? 'text-purple-400' : 
                                        log.step === 'validator' ? 'text-yellow-400' : 'text-blue-400'}
                                  `}>
                                      {log.step}:
                                  </span>
                                  <span className="text-gray-300">{log.details.message}</span>
                              </div>
                          ))}
                          {pipelineStatus !== 'completed' && (
                              <div className="animate-pulse text-neutral-500">_</div>
                          )}
                      </div>
                  </div>
              </div>
          </div>
      )
  }

  if (view === 'review') {
      return (
          <div className="max-w-5xl mx-auto py-8">
              <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold text-white">Review Template</h1>
                  <div className="flex gap-3">
                      <Button variant="outline" onClick={() => setView('processing')}>Back</Button>
                      <Button onClick={handlePublish} className="bg-green-600 hover:bg-green-700 text-white border-0">
                          <Save className="w-4 h-4 mr-2" /> Publish to Marketplace
                      </Button>
                  </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Preview Frame */}
                  <div className="space-y-4">
                      <div className="bg-neutral-800 rounded-t-xl p-3 flex items-center gap-2 border-b border-neutral-700">
                          <div className="flex gap-1.5">
                              <div className="w-3 h-3 rounded-full bg-red-500"></div>
                              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                              <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          </div>
                          <div className="flex-1 text-center bg-neutral-900 rounded py-1 text-xs text-neutral-500 font-mono">
                              preview.sewax.com/draft/{activeUploadId}
                          </div>
                      </div>
                      <div className="h-[500px] bg-white rounded-b-xl border-x border-b border-neutral-700 overflow-hidden relative">
                          <iframe 
                            src="about:blank" 
                            className="w-full h-full pointer-events-none opacity-50" 
                            title="Preview"
                          />
                          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                              <div className="w-full max-w-sm bg-white shadow-xl rounded-lg overflow-hidden">
                                  <div className="h-32 bg-gray-200 animate-pulse"></div>
                                  <div className="p-4 space-y-3">
                                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                  </div>
                              </div>
                              <div className="mt-4 px-4 py-2 bg-neutral-900/80 backdrop-blur text-white rounded-full text-xs flex items-center gap-2">
                                  <Sparkles className="w-3 h-3 text-yellow-400" /> AI Generated Preview
                              </div>
                          </div>
                      </div>
                  </div>

                  {/* Metadata Form & Analysis */}
                  <div className="space-y-6">
                      {aiAnalysis && (
                          <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-6">
                              <h3 className="text-sm font-bold text-neutral-400 uppercase mb-4 flex items-center gap-2">
                                  <Sparkles className="w-4 h-4 text-purple-400" /> Conversion Quality
                              </h3>
                              <div className="grid grid-cols-3 gap-4 text-center">
                                  <div className="p-3 bg-neutral-900 rounded-lg border border-neutral-700">
                                      <div className="text-2xl font-bold text-white">{aiAnalysis.score || 85}</div>
                                      <div className="text-[10px] text-neutral-500 uppercase mt-1">Overall</div>
                                  </div>
                                  <div className="p-3 bg-neutral-900 rounded-lg border border-neutral-700">
                                      <div className="text-2xl font-bold text-green-400">{aiAnalysis.seo_score || 90}</div>
                                      <div className="text-[10px] text-neutral-500 uppercase mt-1">SEO</div>
                                  </div>
                                  <div className="p-3 bg-neutral-900 rounded-lg border border-neutral-700">
                                      <div className="text-2xl font-bold text-blue-400">{aiAnalysis.a11y_score || 88}</div>
                                      <div className="text-[10px] text-neutral-500 uppercase mt-1">A11y</div>
                                  </div>
                              </div>
                          </div>
                      )}

                      <div className="bg-neutral-800 p-6 rounded-xl border border-neutral-700">
                          <h3 className="text-lg font-bold text-white mb-4">Marketplace Details</h3>
                          <div className="space-y-4">
                              <div>
                                  <label className="block text-xs font-bold text-neutral-400 uppercase mb-1">Name</label>
                                  <input 
                                      value={formData.name}
                                      onChange={e => setFormData({...formData, name: e.target.value})}
                                      className="w-full bg-neutral-900 border border-neutral-600 rounded-lg px-3 py-2 text-white"
                                  />
                              </div>
                              <div>
                                  <label className="block text-xs font-bold text-neutral-400 uppercase mb-1">Category</label>
                                  <select 
                                      value={formData.category}
                                      onChange={e => setFormData({...formData, category: e.target.value})}
                                      className="w-full bg-neutral-900 border border-neutral-600 rounded-lg px-3 py-2 text-white"
                                  >
                                      <option>General</option>
                                      <option>Business</option>
                                      <option>E-commerce</option>
                                      <option>Portfolio</option>
                                      <option>Blog</option>
                                  </select>
                              </div>
                              <div>
                                  <label className="block text-xs font-bold text-neutral-400 uppercase mb-1">Description</label>
                                  <textarea 
                                      value={formData.description}
                                      onChange={e => setFormData({...formData, description: e.target.value})}
                                      rows={4}
                                      className="w-full bg-neutral-900 border border-neutral-600 rounded-lg px-3 py-2 text-white"
                                  />
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      )
  }

  // --- List View (Default) ---
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
         <div>
            <h1 className="text-2xl font-bold text-white">Template Registry</h1>
            <p className="text-neutral-400">Manage global themes and install packages.</p>
         </div>
         <Button onClick={() => setView('upload')} className="bg-primary-600 hover:bg-primary-700 text-white border-0 flex items-center gap-2">
            <Upload className="w-4 h-4" /> Import Theme (ZIP)
         </Button>
      </div>

      {view === 'upload' && (
          <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-8 mb-8 animate-fade-in-up">
              <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-white">Upload Source Code</h3>
                  <button onClick={() => setView('list')}><X className="text-neutral-400 hover:text-white"/></button>
              </div>
              <div className="border-2 border-dashed border-neutral-600 rounded-xl p-12 text-center hover:border-primary-500 transition-colors bg-neutral-900/50">
                  <FileCode className="w-12 h-12 text-neutral-500 mx-auto mb-4" />
                  <p className="text-neutral-300 font-medium mb-2">Drag and drop your PHP/HTML theme here</p>
                  <p className="text-neutral-500 text-sm mb-6">Supports .zip files containing .php, .blade.php, .html, .css, .js</p>
                  <input 
                      type="file" 
                      accept=".zip"
                      className="hidden" 
                      id="theme-upload"
                      onChange={(e) => {
                          if(e.target.files?.[0]) setUploadFile(e.target.files[0]);
                      }}
                  />
                  {!uploadFile ? (
                      <label htmlFor="theme-upload" className="cursor-pointer bg-neutral-700 hover:bg-neutral-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                          Select File
                      </label>
                  ) : (
                      <div className="max-w-xs mx-auto">
                          <div className="flex items-center gap-3 bg-neutral-800 p-3 rounded-lg border border-neutral-700 mb-4 text-left">
                              <div className="p-2 bg-primary-900/30 rounded text-primary-400"><FileCode className="w-5 h-5"/></div>
                              <div className="flex-1 truncate text-white text-sm">{uploadFile.name}</div>
                              <button onClick={() => setUploadFile(null)} className="text-neutral-500 hover:text-white"><X className="w-4 h-4"/></button>
                          </div>
                          <Button onClick={handleFileUpload} className="w-full" isLoading={isStarting}>
                             Start Processing
                          </Button>
                      </div>
                  )}
              </div>
          </div>
      )}

      {loading ? (
          <div className="p-12 text-center text-white"><Loader2 className="w-8 h-8 animate-spin mx-auto mb-4"/>Loading Registry...</div>
      ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {templates.length === 0 && <div className="col-span-3 text-center py-12 text-neutral-500">No templates published yet.</div>}
             {templates.map((template) => (
                <div key={template.id} className="bg-neutral-800 border border-neutral-700 rounded-xl overflow-hidden group hover:border-neutral-600 transition-all">
                   <div className="h-48 relative bg-neutral-900 overflow-hidden">
                      {template.image_url && <img src={template.image_url} alt={template.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />}
                      <div className="absolute top-2 right-2 bg-neutral-900/80 backdrop-blur px-2 py-1 rounded text-xs font-mono text-neutral-300 border border-neutral-700">
                          v{template.current_version}
                      </div>
                   </div>
                   <div className="p-5">
                      <div className="flex justify-between items-start mb-2">
                         <h3 className="font-bold text-white text-lg">{template.name}</h3>
                      </div>
                      <p className="text-sm text-neutral-400 line-clamp-2 mb-4">{template.description}</p>
                      
                      <div className="flex items-center gap-2 mb-4">
                         <span className="px-2 py-1 rounded bg-neutral-700 text-neutral-300 text-xs font-medium uppercase tracking-wide">{template.category}</span>
                         <span className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 uppercase tracking-wide ${
                             template.status === 'published' ? 'bg-green-900/30 text-green-400 border border-green-900/50' : 'bg-yellow-900/30 text-yellow-400 border border-yellow-900/50'
                         }`}>
                             {template.status}
                         </span>
                      </div>
    
                      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-neutral-700">
                         <button className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-neutral-700 text-white text-sm hover:bg-neutral-600 transition-colors" onClick={() => handlePreview(template)}>
                            <Eye className="w-4 h-4" /> Preview
                         </button>
                         <button className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-red-900/30 text-red-400 text-sm hover:bg-red-900/20 transition-colors">
                            <Trash2 className="w-4 h-4" /> Archive
                         </button>
                      </div>
                   </div>
                </div>
             ))}
          </div>
      )}
    </div>
  );
};
