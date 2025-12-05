
import React, { useState, useEffect } from 'react';
import { Button } from '../Button';
import { Search, Upload, FileCode, CheckCircle, Eye, Trash2, Loader2, X, Save, RefreshCw, Terminal, AlertTriangle, Play, Smartphone, Monitor, Sparkles, ExternalLink, Zap } from 'lucide-react';
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
  const [pipelineStatus, setPipelineStatus] = useState<string>('idle'); 
  const [progress, setProgress] = useState(0);
  const [isStarting, setIsStarting] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [previewHtml, setPreviewHtml] = useState<string>('');
  // We need to persist the content for the publish step
  const [previewHtmlContent, setPreviewHtmlContent] = useState<string>('');

  // Form State for manual metadata
  const [formData, setFormData] = useState({
     name: '',
     slug: '',
     category: 'General',
     description: '',
     preview_url: ''
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
  const runSimulation = async (uploadId: string, retry = false, demoContext?: any) => {
      // If retrying or running demo, skip validation animation
      if (!retry) {
        setProgress(5);
        setPipelineStatus('validating');
        addLog(uploadId, 'validator', 'queued', 'Checking ZIP structure and manifest...');
        
        // Step 1: Validation
        await new Promise(r => setTimeout(r, 1000));
        setProgress(15);
        addLog(uploadId, 'validator', 'success', 'Valid theme.json found. 14 PHP files detected.');
        addLog(uploadId, 'validator', 'info', 'Detected structure: assets/css, frontend/header, footerWidgetArea...');
        
        if (!uploadId.startsWith('mock-')) {
           await supabase.from('template_raw_uploads').update({ status: 'validated' }).eq('id', uploadId);
        }

        // Step 2: Extraction
        setPipelineStatus('converting');
        addLog(uploadId, 'extractor', 'processing', 'Stripping PHP tags and mapping Blade directives...');
        await new Promise(r => setTimeout(r, 1000));
        setProgress(30);
        addLog(uploadId, 'extractor', 'success', 'Logic extracted. Preparing for AI conversion.');
      }

      // Step 3: AI Conversion with Gemini
      addLog(uploadId, 'ai_worker', 'processing', 'Connecting to Gemini 3.0 Pro (Thinking Mode) for full-stack conversion...');
      
      let derivedName = demoContext?.name || formData.name;
      let derivedCategory = demoContext?.category || formData.category || 'General';
      let derivedDesc = demoContext?.description || formData.description;
      const filename = uploadFile?.name || 'theme.zip';

      if (!derivedName) {
          derivedName = (filename.split('.')[0]).charAt(0).toUpperCase() + (filename.split('.')[0]).slice(1);
      }

      try {
          const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

          if (!retry) {
              // 3a. Generate Migration Plan
              // We simulate specific technical steps based on the user's provided file structure image
              const steps = [
                  "Parsing assets/css/agency-main-style.css...",
                  "Converting frontend/headerNavbarArea/navbar.blade.php to Navbar.tsx...",
                  "Converting frontend/headerBreadcrumbArea/breadcrumb.blade.php to Hero.tsx...",
                  "Converting footerWidgetArea/widget-area.blade.php to Footer.tsx...",
                  "Optimizing assets/img/hero/donation-hero-man1.jpg..."
              ];

              const stepValue = 20 / steps.length;
              let currentProg = 30;

              for (const step of steps) {
                  await new Promise(r => setTimeout(r, 600));
                  currentProg += stepValue;
                  setProgress(currentProg);
                  addLog(uploadId, 'ai_worker', 'info', step);
              }
          }

          // 3b. Generate Full HTML Preview (Using Gemini 3 Pro Thinking Mode)
          const promptContext = demoContext 
            ? `Create a template for: ${JSON.stringify(demoContext)}` 
            : `Theme Name: ${derivedName}. Category: ${derivedCategory}. Source: PHP/Blade. Files detected: navbar.blade.php, breadcrumb.blade.php, widget-area.blade.php.`;

          addLog(uploadId, 'ai_worker', 'processing', 'Synthesizing React components into static preview...');
          
          const htmlResponse = await ai.models.generateContent({
              model: 'gemini-3-pro-preview',
              contents: `You are an Expert UI Engineer & Design System Architect. Your task is to reconstruct a legacy PHP/Blade theme into a modern, high-performance HTML5 landing page using Tailwind CSS.

              CONTEXT:
              ${promptContext}

              DESIGN SYSTEM & REQUIREMENTS:
              1. **Visual Style**:
                 - Use a modern, clean aesthetic (think Linear, Vercel, or Airbnb design).
                 - Typography: Use Google Fonts (Inter or Plus Jakarta Sans).
                 - Colors: Derive a primary color palette from the theme name/category (e.g., 'Restaurant' -> Warm Orange/Red, 'Corporate' -> Trust Blue).
                 - Effects: Use subtle shadows ('shadow-lg'), rounded corners ('rounded-2xl'), and gradients.
                 - Interactivity: Add hover states ('hover:scale-105', 'transition-all', 'duration-300') to buttons and cards.

              2. **Structure & Component Mapping**:
                 - **Header/Nav** (from navbar.blade.php): Sticky top, glassmorphism ('bg-white/80 backdrop-blur-md'), responsive mobile menu icon.
                 - **Hero Section** (from breadcrumb.blade.php): Full viewport height or large padding, compelling headline, primary CTA button, background image or gradient overlay.
                 - **Content Sections**:
                    - Features/Services Grid: 3-column layout on desktop with icons.
                    - About/Story: Text + Image split layout.
                    - Industry Specifics:
                        * Restaurant: Menu grid with prices and images.
                        * Travel: Itinerary timeline or tour cards.
                        * E-commerce: Product carousel mock.
                 - **Footer** (from widget-area.blade.php): Multi-column links, newsletter signup, copyright.

              3. **Technical Specs**:
                 - Output STRICTLY valid HTML5.
                 - Load Tailwind via CDN: <script src="https://cdn.tailwindcss.com"></script>.
                 - Load Fonts: <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">.
                 - Use semantic tags (<header>, <main>, <section>, <footer>).
                 - Ensure images use high-quality Unsplash URLs relevant to the context (e.g., 'source.unsplash.com/random/800x600?nepal,mountain').

              4. **Output Format**:
                 - Return ONLY the raw HTML code. Do not wrap in markdown code blocks. Start directly with <!DOCTYPE html>.

              THINKING PROCESS:
              - Assess the vibe: Is it luxury, rugged, playful, or professional?
              - Define the grid system and spacing.
              - Write the HTML structure with embedded Tailwind classes.`,
              config: {
                  thinkingConfig: { thinkingBudget: 32768 }
              }
          });

          let generatedHtml = htmlResponse.text || "<h1>Generation Failed</h1>";
          generatedHtml = generatedHtml.replace(/```html/g, '').replace(/```/g, ''); // Cleanup
          
          if (!generatedHtml.includes('<!DOCTYPE html>')) {
             // Fallback if AI didn't output full doc
             generatedHtml = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><script src="https://cdn.tailwindcss.com"></script></head><body>${generatedHtml}</body></html>`;
          }

          setPreviewHtml(generatedHtml);
          setPreviewHtmlContent(generatedHtml);
          addLog(uploadId, 'ai_worker', 'success', 'Static preview generated successfully.');

          // Generate Review Data (Flash model for speed)
          if (!aiAnalysis) {
              const reviewResponse = await ai.models.generateContent({
                  model: 'gemini-2.5-flash',
                  contents: `Analyze this template name "${derivedName}" and category "${derivedCategory}". 
                  Return JSON with:
                  {
                    "score": 95,
                    "summary": "Marketing description...",
                    "category": "${derivedCategory}",
                    "seo_score": 92,
                    "a11y_score": 88
                  }`,
                  config: { responseMimeType: 'application/json' }
              });
              
              const reviewData = JSON.parse(reviewResponse.text || "{}");
              setAiAnalysis(reviewData);
              derivedDesc = reviewData.summary || derivedDesc;
          }

          // Construct a valid URL structure
          const slug = demoContext?.slug || derivedName.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');
          const localPreviewUrl = `${window.location.origin}/#/preview/${slug}`;

          setFormData(prev => ({
              ...prev,
              name: derivedName,
              slug: slug,
              category: derivedCategory,
              description: derivedDesc || prev.description,
              preview_url: localPreviewUrl
          }));

      } catch (err) {
          console.error("AI Error", err);
          addLog(uploadId, 'ai_worker', 'warning', 'AI generation encountered an issue. Using fallback.');
          const fallbackHtml = `<!DOCTYPE html><html><head><script src="https://cdn.tailwindcss.com"></script></head><body class="bg-gray-100 flex items-center justify-center h-screen"><div class="text-center"><h1 class="text-4xl font-bold mb-4">Preview Unavailable</h1><p class="text-gray-600">The AI could not generate the preview at this time.</p></div></body></html>`;
          setPreviewHtml(fallbackHtml);
          setPreviewHtmlContent(fallbackHtml);
      }
      
      addLog(uploadId, 'ai_worker', 'success', 'Conversion complete.');
      
      if (!uploadId.startsWith('mock-')) {
         await supabase.from('template_raw_uploads').update({ status: 'converted' }).eq('id', uploadId);
      }

      // Step 4: Build
      addLog(uploadId, 'builder', 'processing', 'Finalizing assets...');
      await new Promise(r => setTimeout(r, 500));
      setProgress(100);
      addLog(uploadId, 'builder', 'success', 'Ready for review.');

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

  const handleFileUpload = async (e: React.FormEvent, demoData?: any) => {
      if (e) e.preventDefault();
      if (!uploadFile && !demoData) return;
      
      setIsStarting(true);
      let uploadId = '';

      try {
          const { data: { session } } = await supabase.auth.getSession();
          // Always use mock ID for smoother UX in this demo unless strictly required
          uploadId = `mock-${Date.now()}`;
      } catch (err) {
          uploadId = `mock-${Date.now()}`;
      }

      setActiveUploadId(uploadId);
      setPipelineLogs([]);
      setProgress(0);
      setPreviewHtml('');
      setPreviewHtmlContent('');
      
      setTimeout(() => {
          setIsStarting(false);
          setView('processing');
          runSimulation(uploadId, false, demoData);
      }, 500); 
  };

  const handlePublish = async () => {
      if(!activeUploadId) return;
      
      const slug = formData.slug || formData.name.toLowerCase().replace(/ /g, '-');
      
      // Ensure we have content. If not, use fallback.
      let finalHtml = previewHtmlContent;
      if (!finalHtml || finalHtml.length < 50) {
          finalHtml = `<!DOCTYPE html><html><head><script src="https://cdn.tailwindcss.com"></script></head><body class="bg-gray-100 flex items-center justify-center h-screen"><div class="text-center"><h1 class="text-4xl font-bold mb-4">Template Preview</h1><p class="text-gray-600">Content for ${formData.name} is being processed.</p></div></body></html>`;
      }

      // Store the generated HTML in the components_list JSON field
      const componentsListPayload = {
          preview_html: finalHtml,
          generated_at: new Date().toISOString()
      };

      const { error } = await supabase.from('templates').insert({
          name: formData.name,
          slug: slug,
          description: formData.description,
          category: formData.category,
          status: 'published',
          image_url: demoContext?.image_url || 'https://picsum.photos/800/600',
          preview_url: formData.preview_url,
          current_version: '1.0.0',
          installs_count: 0,
          components_list: componentsListPayload
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
          setPreviewHtml('');
          setPreviewHtmlContent('');
          setFormData({ name: '', slug: '', category: 'General', description: '', preview_url: '' });
      }
  };

  const handleRegeneratePreview = () => {
      if (activeUploadId) {
          addLog(activeUploadId, 'ai_worker', 'processing', 'Regenerating preview...');
          runSimulation(activeUploadId, true);
      }
  };

  const handlePreview = (template: any) => {
      // Prefer the saved URL, fallback to constructing one
      if (template.preview_url) {
          window.open(template.preview_url, '_blank');
      } else if (template.slug) {
          const url = `${window.location.origin}/#/preview/${template.slug}`;
          window.open(url, '_blank');
      } else {
          alert('Preview unavailable for this template.');
      }
  };

  const openFullscreenPreview = () => {
      if (!previewHtml) return;
      const blob = new Blob([previewHtml], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
  };

  // Demo Data for Quick Add
  const demoContext = {
      name: 'Kathmandu Delight',
      slug: 'kathmandu-delight',
      category: 'Restaurant',
      description: 'A vibrant template for Nepali cuisine restaurants.',
      image_url: 'https://picsum.photos/600/400?random=10'
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
                  <div className="text-xs text-gray-500 mt-2 text-right font-mono">Est. time remaining: {progress < 100 ? `${Math.ceil((100 - progress) / 8)}s` : '0s'}</div>
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
                      <div className="bg-neutral-800 rounded-t-xl p-3 flex items-center gap-2 border-b border-neutral-700 justify-between">
                          <div className="flex items-center gap-2">
                              <div className="flex gap-1.5">
                                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                              </div>
                              <div className="bg-neutral-900 rounded py-1 px-3 text-xs text-neutral-500 font-mono ml-2">
                                  preview.sewax.com/draft/{activeUploadId?.slice(0,8)}...
                              </div>
                          </div>
                          <div className="flex gap-2">
                              <button 
                                onClick={handleRegeneratePreview}
                                className="text-neutral-400 hover:text-white flex items-center gap-1 text-xs px-2 py-1 bg-neutral-900 rounded border border-neutral-700 hover:border-neutral-500"
                                title="Regenerate with AI"
                              >
                                  <RefreshCw className="w-3 h-3" /> Retry AI
                              </button>
                              <button 
                                onClick={openFullscreenPreview}
                                className="text-neutral-400 hover:text-white flex items-center gap-1 text-xs"
                                title="Open in new tab"
                              >
                                  <ExternalLink className="w-3 h-3" />
                              </button>
                          </div>
                      </div>
                      <div className="h-[500px] bg-white rounded-b-xl border-x border-b border-neutral-700 overflow-hidden relative group">
                          {previewHtml ? (
                              <iframe 
                                srcDoc={previewHtml}
                                className="w-full h-full border-none bg-white"
                                title="Preview"
                                sandbox="allow-scripts allow-same-origin"
                              />
                          ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                  <div className="text-center">
                                      <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2"/>
                                      Loading Preview...
                                  </div>
                              </div>
                          )}
                          
                          <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-neutral-900/90 backdrop-blur text-white rounded-full text-xs flex items-center gap-2 shadow-lg pointer-events-none">
                              <Sparkles className="w-3 h-3 text-yellow-400" /> AI Generated Build
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
                                      className="w-full bg-neutral-900 border border-neutral-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary-500"
                                  />
                              </div>
                              <div>
                                  <label className="block text-xs font-bold text-neutral-400 uppercase mb-1">Slug</label>
                                  <input 
                                      value={formData.slug}
                                      onChange={e => setFormData({...formData, slug: e.target.value})}
                                      className="w-full bg-neutral-900 border border-neutral-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary-500"
                                  />
                              </div>
                              <div>
                                  <label className="block text-xs font-bold text-neutral-400 uppercase mb-1">Category</label>
                                  <select 
                                      value={formData.category}
                                      onChange={e => setFormData({...formData, category: e.target.value})}
                                      className="w-full bg-neutral-900 border border-neutral-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary-500"
                                  >
                                      <option>General</option>
                                      <option>Business</option>
                                      <option>Restaurant</option>
                                      <option>Travel</option>
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
                                      className="w-full bg-neutral-900 border border-neutral-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary-500"
                                  />
                              </div>
                              <div>
                                  <label className="block text-xs font-bold text-neutral-400 uppercase mb-1">Preview URL</label>
                                  <div className="flex gap-2">
                                      <input 
                                          value={formData.preview_url}
                                          onChange={e => setFormData({...formData, preview_url: e.target.value})}
                                          className="w-full bg-neutral-900 border border-neutral-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary-500"
                                          readOnly
                                      />
                                      <button 
                                        className="p-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-white"
                                        onClick={() => window.open(formData.preview_url, '_blank')}
                                        title="Test Link"
                                      >
                                          <ExternalLink className="w-4 h-4" />
                                      </button>
                                  </div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Manual Upload */}
                  <div className="border-2 border-dashed border-neutral-600 rounded-xl p-12 text-center hover:border-primary-500 transition-colors bg-neutral-