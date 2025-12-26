import React from 'react';
import { ResumeSettings } from '../../types';
import { Input } from '../ui/Input';
import { 
  Type, 
  AlignJustify, 
  LayoutTemplate, 
  Palette,
  Maximize
} from 'lucide-react';

interface EditorControlsProps {
  settings: ResumeSettings;
  updateSettings: (key: keyof ResumeSettings, value: any) => void;
}

export const EditorControls: React.FC<EditorControlsProps> = ({ settings, updateSettings }) => {
  return (
    <div className="h-full overflow-y-auto bg-white border-r border-gray-200 p-4 w-full md:w-80 flex-shrink-0">
      <h2 className="text-lg font-semibold mb-6 text-gray-800">Customization</h2>
      
      <div className="space-y-8">
        {/* Typography Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Type className="w-4 h-4" />
            <h3>Typography</h3>
          </div>
          
          <div className="space-y-4 pl-2">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Font Family</label>
              <div className="grid grid-cols-3 gap-2">
                {['sans', 'serif', 'mono'].map((font) => (
                  <button
                    key={font}
                    onClick={() => updateSettings('fontFamily', font)}
                    className={`px-2 py-1.5 text-sm border rounded capitalize ${
                      settings.fontFamily === font 
                        ? 'bg-blue-50 border-blue-500 text-blue-700' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {font}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block">Font Size ({settings.fontSize}px)</label>
              <input
                type="range"
                min="10"
                max="24"
                step="1"
                value={settings.fontSize}
                onChange={(e) => updateSettings('fontSize', Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>
          </div>
        </section>

        {/* Spacing Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <AlignJustify className="w-4 h-4" />
            <h3>Spacing</h3>
          </div>

          <div className="space-y-4 pl-2">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Line Height ({settings.lineHeight})</label>
              <input
                type="range"
                min="1"
                max="2.5"
                step="0.1"
                value={settings.lineHeight}
                onChange={(e) => updateSettings('lineHeight', Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block">Paragraph Spacing ({settings.paragraphSpacing}px)</label>
              <input
                type="range"
                min="0"
                max="40"
                step="4"
                value={settings.paragraphSpacing}
                onChange={(e) => updateSettings('paragraphSpacing', Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>
          </div>
        </section>

        {/* Layout Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Maximize className="w-4 h-4" />
            <h3>Margins (px)</h3>
          </div>

          <div className="grid grid-cols-2 gap-4 pl-2">
            <Input
              type="number"
              label="Top"
              value={settings.marginTop}
              onChange={(e) => updateSettings('marginTop', Number(e.target.value))}
            />
            <Input
              type="number"
              label="Bottom"
              value={settings.marginBottom}
              onChange={(e) => updateSettings('marginBottom', Number(e.target.value))}
            />
            <Input
              type="number"
              label="Left"
              value={settings.marginLeft}
              onChange={(e) => updateSettings('marginLeft', Number(e.target.value))}
            />
            <Input
              type="number"
              label="Right"
              value={settings.marginRight}
              onChange={(e) => updateSettings('marginRight', Number(e.target.value))}
            />
          </div>
        </section>

        {/* Theme Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Palette className="w-4 h-4" />
            <h3>Theme</h3>
          </div>

          <div className="space-y-4 pl-2">
            <div className="grid grid-cols-3 gap-2">
              {['light', 'minimal', 'modern'].map((theme) => (
                <button
                  key={theme}
                  onClick={() => updateSettings('theme', theme)}
                  className={`px-2 py-1.5 text-sm border rounded capitalize ${
                    settings.theme === theme 
                      ? 'bg-blue-50 border-blue-500 text-blue-700' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {theme}
                </button>
              ))}
            </div>
            
            {settings.theme === 'modern' && (
               <div>
               <label className="text-xs text-gray-500 mb-1 block">Accent Color</label>
               <div className="flex gap-2 flex-wrap">
                 {['#2563eb', '#dc2626', '#16a34a', '#9333ea', '#ea580c'].map((color) => (
                   <button
                     key={color}
                     onClick={() => updateSettings('accentColor', color)}
                     className={`w-6 h-6 rounded-full border-2 ${
                       settings.accentColor === color ? 'border-gray-900' : 'border-transparent'
                     }`}
                     style={{ backgroundColor: color }}
                   />
                 ))}
               </div>
             </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
