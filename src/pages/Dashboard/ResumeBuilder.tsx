import React, { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { EditorControls } from '../../components/Editor/EditorControls';
import { ResumePreview } from '../../components/Resume/ResumePreview';
import { ResumeSettings, DEFAULT_SETTINGS, DEFAULT_MARKDOWN } from '../../types';
import { Button } from '../../components/ui/Button';
import { useReactToPrint } from 'react-to-print';
import { LogOut, Download, Upload, FileDown, Menu, X } from 'lucide-react';
import { clsx } from 'clsx';

export default function ResumeBuilder() {
  const { logout } = useAuth();
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);
  const [settings, setSettings] = useState<ResumeSettings>(DEFAULT_SETTINGS);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview' | 'settings'>('editor');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: 'Resume',
  });

  const updateSettings = (key: keyof ResumeSettings, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
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

  const handleImportMarkdown = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm sm:px-6 lg:px-8 z-20">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-gray-900">Resume Builder</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImportMarkdown}
              accept=".md"
              className="hidden"
            />
            <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportMarkdown}>
              <FileDown className="mr-2 h-4 w-4" />
              MD
            </Button>
            <Button size="sm" onClick={() => handlePrint()}>
              <Download className="mr-2 h-4 w-4" />
              PDF
            </Button>
            <div className="mx-2 h-6 w-px bg-gray-300" />
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 p-4 space-y-2 absolute top-16 left-0 right-0 z-50 shadow-lg">
          <Button variant="outline" className="w-full justify-start" onClick={() => fileInputRef.current?.click()}>
            <Upload className="mr-2 h-4 w-4" /> Import MD
          </Button>
          <Button variant="outline" className="w-full justify-start" onClick={handleExportMarkdown}>
            <FileDown className="mr-2 h-4 w-4" /> Export MD
          </Button>
          <Button className="w-full justify-start" onClick={() => handlePrint()}>
            <Download className="mr-2 h-4 w-4" /> Download PDF
          </Button>
          <Button variant="ghost" className="w-full justify-start text-red-600" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Mobile Tabs */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around p-2 z-30">
          <button 
            onClick={() => setActiveTab('settings')}
            className={clsx("p-2 text-sm font-medium rounded-md", activeTab === 'settings' ? "bg-blue-50 text-blue-600" : "text-gray-600")}
          >
            Settings
          </button>
          <button 
            onClick={() => setActiveTab('editor')}
            className={clsx("p-2 text-sm font-medium rounded-md", activeTab === 'editor' ? "bg-blue-50 text-blue-600" : "text-gray-600")}
          >
            Editor
          </button>
          <button 
            onClick={() => setActiveTab('preview')}
            className={clsx("p-2 text-sm font-medium rounded-md", activeTab === 'preview' ? "bg-blue-50 text-blue-600" : "text-gray-600")}
          >
            Preview
          </button>
        </div>

        {/* Left Sidebar - Settings */}
        <div className={clsx(
          "w-full md:w-80 bg-white border-r border-gray-200 md:block",
          activeTab === 'settings' ? "block" : "hidden"
        )}>
          <EditorControls settings={settings} updateSettings={updateSettings} />
        </div>

        {/* Center - Editor */}
        <div className={clsx(
          "flex-1 bg-white md:block",
          activeTab === 'editor' ? "block" : "hidden"
        )}>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="h-full w-full resize-none p-4 font-mono text-sm focus:outline-none md:p-8"
            placeholder="Type your resume markdown here..."
          />
        </div>

        {/* Right - Preview */}
        <div className={clsx(
          "flex-1 bg-gray-100/50 md:block overflow-auto",
          activeTab === 'preview' ? "block" : "hidden"
        )}>
          <ResumePreview 
            ref={componentRef} 
            markdown={markdown} 
            settings={settings} 
          />
        </div>
      </div>
    </div>
  );
}
