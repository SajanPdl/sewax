import React, { useState } from 'react';
import { Save, Eye, RotateCcw, RotateCw, Trash2, FileText, Image as ImageIcon } from 'lucide-react';

export const SiteEditor: React.FC = () => {
  const [hasChanges, setHasChanges] = useState(false);
  const [zoom, setZoom] = useState(100);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Undo">
            <RotateCcw className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Redo">
            <RotateCw className="w-5 h-5 text-gray-600" />
          </button>
          <div className="h-8 w-px bg-gray-200"></div>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Preview">
            <Eye className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoom(Math.max(50, zoom - 10))}
              className="px-2 py-1 text-sm hover:bg-gray-100 rounded"
            >
              −
            </button>
            <span className="text-sm font-semibold text-gray-900 w-12 text-center">{zoom}%</span>
            <button
              onClick={() => setZoom(Math.min(200, zoom + 10))}
              className="px-2 py-1 text-sm hover:bg-gray-100 rounded"
            >
              +
            </button>
          </div>

          <div className="h-8 w-px bg-gray-200"></div>

          <button
            onClick={() => setHasChanges(false)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
              hasChanges
                ? 'bg-primary-600 hover:bg-primary-700 text-white'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!hasChanges}
          >
            <Save className="w-4 h-4" />
            Save Draft
          </button>

          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors">
            Publish
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Blocks/Layers */}
        <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto p-4">
          <h3 className="font-bold text-gray-900 mb-4">Blocks</h3>
          <div className="space-y-2">
            {['Heading', 'Paragraph', 'Image', 'Button', 'Card', 'List'].map((block) => (
              <div
                key={block}
                draggable
                className="p-3 bg-gray-50 border border-gray-200 rounded-lg cursor-move hover:border-primary-500 hover:bg-primary-50 transition-colors text-sm font-medium text-gray-700"
              >
                {block}
              </div>
            ))}
          </div>
        </div>

        {/* Center - Canvas */}
        <div className="flex-1 bg-gray-200 p-8 overflow-auto flex items-start justify-center">
          <div
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
            className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8 space-y-6 min-h-full"
          >
            {/* Sample Page Content */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900">Welcome to My Site</h1>
              <p className="text-lg text-gray-600">
                This is a placeholder editor. Drag blocks from the left to build your site.
                Click on any element to edit it.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-primary-50 border-2 border-primary-200 rounded-lg">
                <ImageIcon className="w-12 h-12 text-gray-400 mb-3" />
                <p className="text-gray-700 font-semibold">Image Block</p>
              </div>
              <div className="p-6 bg-gray-50 border-2 border-gray-200 rounded-lg">
                <FileText className="w-12 h-12 text-gray-400 mb-3" />
                <p className="text-gray-700 font-semibold">Text Block</p>
              </div>
            </div>

            <button
              onClick={() => setHasChanges(true)}
              className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold"
            >
              Example Button
            </button>
          </div>
        </div>

        {/* Right Panel - Properties */}
        <div className="w-64 bg-white border-l border-gray-200 overflow-y-auto p-4">
          <h3 className="font-bold text-gray-900 mb-4">Properties</h3>
          <div className="space-y-4 text-sm">
            <div>
              <label className="block text-gray-600 font-semibold mb-2">Background Color</label>
              <input type="color" defaultValue="#ffffff" className="w-full h-8 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block text-gray-600 font-semibold mb-2">Font Size</label>
              <input
                type="number"
                defaultValue={16}
                className="w-full px-2 py-1 border border-gray-300 rounded"
              />
            </div>
            <button className="w-full mt-4 flex items-center justify-center gap-2 p-2 text-red-600 hover:bg-red-50 rounded-lg border border-red-200">
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteEditor;
