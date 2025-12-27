import React from 'react';
import { ResumeSettings, FontFamily, PaperSize } from '../../types';
import { Input } from '../ui/Input';
import { 
  Type, 
  AlignJustify, 
  LayoutTemplate,
  Palette
} from 'lucide-react';
import { clsx } from 'clsx';

interface EditorControlsProps {
  settings: ResumeSettings;
  updateSettings: (key: keyof ResumeSettings, value: any) => void;
}

const FONT_OPTIONS: { label: string; value: FontFamily; type: string }[] = [
  { label: 'Inter', value: 'Inter', type: 'Sans' },
  { label: 'Roboto', value: 'Roboto', type: 'Sans' },
  { label: 'Open Sans', value: 'Open Sans', type: 'Sans' },
  { label: 'Lato', value: 'Lato', type: 'Sans' },
  { label: 'Montserrat', value: 'Montserrat', type: 'Sans' },
  { label: 'Merriweather', value: 'Merriweather', type: 'Serif' },
  { label: 'Playfair Display', value: 'Playfair Display', type: 'Serif' },
  { label: 'Lora', value: 'Lora', type: 'Serif' },
  { label: 'PT Serif', value: 'PT Serif', type: 'Serif' },
  { label: 'Roboto Mono', value: 'Roboto Mono', type: 'Mono' },
  { label: 'Source Code Pro', value: 'Source Code Pro', type: 'Mono' },
  { label: 'Fira Code', value: 'Fira Code', type: 'Mono' },
];

const PAPER_SIZES: { label: string; value: PaperSize }[] = [
  { label: 'A4 (210 x 297 mm)', value: 'a4' },
  { label: 'A6 (105 x 148 mm)', value: 'a6' },
  { label: 'Letter (8.5 x 11 in)', value: 'letter' },
];

const THEME_COLORS = [
  '#1f2937', // Default Gray
  '#2563eb', // Blue
  '#dc2626', // Red
  '#16a34a', // Green
  '#9333ea', // Purple
  '#d97706', // Amber
  '#0891b2', // Cyan
  '#db2777', // Pink
];

export const EditorControls: React.FC<EditorControlsProps> = ({ settings, updateSettings }) => {
  return (
    <div className="h-full overflow-y-auto bg-white p-5 w-full pb-20 md:pb-5">
      <h2 className="text-xl font-bold mb-6 text-gray-900">Design Settings</h2>
      
      <div className="space-y-8">
        {/* Layout Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-800 border-b pb-2">
            <LayoutTemplate className="w-4 h-4" />
            <h3>Layout</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1.5 block">Paper Size</label>
              <select
                value={settings.paperSize}
                onChange={(e) => updateSettings('paperSize', e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {PAPER_SIZES.map((size) => (
                  <option key={size.value} value={size.value}>
                    {size.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 mb-2 block">Margins (px)</label>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="number"
                  label="Top"
                  value={settings.marginTop}
                  onChange={(e) => updateSettings('marginTop', Number(e.target.value))}
                  className="h-8 text-xs"
                />
                <Input
                  type="number"
                  label="Bottom"
                  value={settings.marginBottom}
                  onChange={(e) => updateSettings('marginBottom', Number(e.target.value))}
                  className="h-8 text-xs"
                />
                <Input
                  type="number"
                  label="Left"
                  value={settings.marginLeft}
                  onChange={(e) => updateSettings('marginLeft', Number(e.target.value))}
                  className="h-8 text-xs"
                />
                <Input
                  type="number"
                  label="Right"
                  value={settings.marginRight}
                  onChange={(e) => updateSettings('marginRight', Number(e.target.value))}
                  className="h-8 text-xs"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-800 border-b pb-2">
            <Type className="w-4 h-4" />
            <h3>Typography</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1.5 block">Font Family</label>
              <select
                value={settings.fontFamily}
                onChange={(e) => updateSettings('fontFamily', e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <optgroup label="Sans Serif">
                  {FONT_OPTIONS.filter(f => f.type === 'Sans').map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                </optgroup>
                <optgroup label="Serif">
                  {FONT_OPTIONS.filter(f => f.type === 'Serif').map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                </optgroup>
                <optgroup label="Monospace">
                  {FONT_OPTIONS.filter(f => f.type === 'Mono').map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                </optgroup>
              </select>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="text-xs font-medium text-gray-500">Font Size</label>
                <span className="text-xs text-gray-400">{settings.fontSize}px</span>
              </div>
              <input
                type="range"
                min="10"
                max="24"
                step="1"
                value={settings.fontSize}
                onChange={(e) => updateSettings('fontSize', Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>
        </section>

        {/* Theme Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-800 border-b pb-2">
            <Palette className="w-4 h-4" />
            <h3>Theme Color</h3>
          </div>
          
          <div>
            <label className="text-xs font-medium text-gray-500 mb-2 block">Headings Color</label>
            <div className="flex flex-wrap gap-2">
              {THEME_COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => updateSettings('accentColor', color)}
                  className={clsx(
                    "w-8 h-8 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform hover:scale-110",
                    settings.accentColor === color && "ring-2 ring-offset-2 ring-blue-500 scale-110"
                  )}
                  style={{ backgroundColor: color }}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Spacing Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-800 border-b pb-2">
            <AlignJustify className="w-4 h-4" />
            <h3>Spacing</h3>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-xs font-medium text-gray-500">Line Height</label>
                <span className="text-xs text-gray-400">{settings.lineHeight}</span>
              </div>
              <input
                type="range"
                min="1"
                max="2.5"
                step="0.1"
                value={settings.lineHeight}
                onChange={(e) => updateSettings('lineHeight', Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="text-xs font-medium text-gray-500">Paragraph Spacing</label>
                <span className="text-xs text-gray-400">{settings.paragraphSpacing}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                step="4"
                value={settings.paragraphSpacing}
                onChange={(e) => updateSettings('paragraphSpacing', Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
