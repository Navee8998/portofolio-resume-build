import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useAuth } from '../../context/AuthContext';
import { ResumePreview } from '../../components/Resume/ResumePreview';
import { EditorControls } from '../../components/Editor/EditorControls';
import { Button } from '../../components/ui/Button';
import { DEFAULT_MARKDOWN, DEFAULT_SETTINGS, ResumeSettings } from '../../types';
import { 
  Download, 
  LogOut, 
  Upload, 
  FileJson,
  Menu,
  X
} from 'lucide-react';

export default function ResumeBuilder() {
  const { logout, user } = useAuth();
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);
  const [settings, setSettings] = useState<ResumeSettings>(DEFAULT_SETTINGS);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: 'Resume',
  });

  const updateSettings = (key: keyof ResumeSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setMarkdown(content);
      };
      reader.readAsText(file);
    }
  };

  const handleExportMarkdown = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sm:px-6 z-10">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-1.5 rounded text-white">
            <FileJson size={20} />
          </div>
          <h1 className="text-xl font-bold text-gray-900 hidden sm:block">Resume Builder</h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <label className="cursor-pointer">
              <input type="file" accept=".md,.txt" onChange={handleFileUpload} className="hidden" />
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Import MD
              </Button>
            </label>
            <Button variant="outline" size="sm" onClick={handleExportMarkdown}>
              <Download className="w-4 h-4 mr-2" />
              Export MD
            </Button>
            <Button variant="primary" size="sm" onClick={() => handlePrint()}>
              <Download className="w-4 h-4 mr-2" />
              PDF
            </Button>
          </div>
          
          <div className="h-6 w-px bg-gray-300 mx-2 hidden md:block"></div>
          
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 hidden sm:inline">{user?.email}</span>
            <Button variant="ghost" size="sm" onClick={logout} title="Logout">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>

          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className="absolute top-16 left-0 w-full bg-white border-b border-gray-200 p-4 flex flex-col gap-3 md:hidden z-20 shadow-lg">
           <label className="cursor-pointer w-full">
              <input type="file" accept=".md,.txt" onChange={handleFileUpload} className="hidden" />
              <Button variant="outline" className="w-full justify-start">
                <Upload className="w-4 h-4 mr-2" />
                Import Markdown
              </Button>
            </label>
            <Button variant="outline" className="w-full justify-start" onClick={handleExportMarkdown}>
              <Download className="w-4 h-4 mr-2" />
              Export Markdown
            </Button>
            <Button variant="primary" className="w-full justify-start" onClick={() => handlePrint()}>
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Controls - Hidden on mobile unless needed, but we'll put them in a tab for mobile */}
        <div className="hidden md:block h-full">
          <EditorControls settings={settings} updateSettings={updateSettings} />
        </div>

        {/* Mobile Tabs */}
        <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex z-30">
          <button 
            className={`flex-1 py-3 text-sm font-medium ${activeTab === 'editor' ? 'text-blue-600 border-t-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('editor')}
          >
            Editor
          </button>
          <button 
            className={`flex-1 py-3 text-sm font-medium ${activeTab === 'preview' ? 'text-blue-600 border-t-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('preview')}
          >
            Preview
          </button>
        </div>

        {/* Editor Area */}
        <div className={`flex-1 flex flex-col md:flex-row overflow-hidden ${activeTab === 'editor' ? 'block' : 'hidden md:flex'}`}>
          {/* Markdown Input */}
          <div className="flex-1 h-full border-r border-gray-200 bg-white flex flex-col">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Markdown Input
            </div>
            <textarea
              className="flex-1 w-full p-4 resize-none focus:outline-none font-mono text-sm leading-relaxed"
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="# Your Name..."
            />
          </div>
        </div>

        {/* Preview Area */}
        <div className={`flex-1 bg-gray-100 relative overflow-hidden ${activeTab === 'preview' ? 'block' : 'hidden md:block'}`}>
           {/* Mobile Controls Overlay when in preview mode */}
           <div className="md:hidden absolute top-0 right-0 z-10 p-2">
             <details className="relative">
                <summary className="list-none bg-white p-2 rounded-full shadow cursor-pointer text-gray-700">
                  <Menu size={20} />
                </summary>
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 max-h-[60vh] overflow-y-auto">
                  <EditorControls settings={settings} updateSettings={updateSettings} />
                </div>
             </details>
           </div>

           <ResumePreview ref={componentRef} markdown={markdown} settings={settings} />
        </div>
      </div>
    </div>
  );
}
