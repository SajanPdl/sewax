
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase/client';
import { Loader2, AlertCircle, ArrowLeft } from 'lucide-react';

export const PreviewPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [html, setHtml] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTemplate = async () => {
      if (!slug) return;
      
      const { data, error } = await supabase
        .from('templates')
        .select('components_list, name')
        .eq('slug', slug)
        .single();

      if (error) {
        setError('Template not found or could not be loaded.');
      } else if (data) {
        // Retrieve the generated HTML from the JSON column
        const content = (data.components_list as any)?.preview_html;
        if (content && typeof content === 'string' && content.trim().length > 0) {
          setHtml(content);
        } else {
          setError('This template does not have a generated preview available.');
        }
      }
      setLoading(false);
    };

    fetchTemplate();
  }, [slug]);

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 text-primary-600 animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Loading Template Preview...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md text-center border border-gray-100">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Preview Unavailable</h2>
          <p className="text-gray-500 mb-6">{error}</p>
          <a href="/" className="inline-flex items-center text-primary-600 font-medium hover:underline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-white relative">
      {/* Floating Home Button for easy exit from preview */}
      <a 
        href="/"
        className="fixed top-4 left-4 z-50 bg-black/80 text-white p-2 rounded-full shadow-lg hover:bg-black transition-colors"
        title="Back to Home"
      >
        <ArrowLeft className="w-5 h-5" />
      </a>
      
      <iframe 
        srcDoc={html} 
        title="Template Preview" 
        className="w-full h-full border-0"
        sandbox="allow-scripts allow-same-origin" 
      />
    </div>
  );
};
