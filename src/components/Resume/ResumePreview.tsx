import React, { forwardRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { ResumeSettings } from '../../types';
import { clsx } from 'clsx';

interface ResumePreviewProps {
  markdown: string;
  settings: ResumeSettings;
}

export const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ markdown, settings }, ref) => {
    
    // Calculate dimensions based on paper size
    const getPaperDimensions = () => {
      switch (settings.paperSize) {
        case 'a4': return { width: '210mm', minHeight: '297mm' };
        case 'a6': return { width: '105mm', minHeight: '148mm' };
        case 'letter': return { width: '215.9mm', minHeight: '279.4mm' };
        default: return { width: '210mm', minHeight: '297mm' };
      }
    };

    const dimensions = getPaperDimensions();

    // Dynamic styles based on settings
    const containerStyle = {
      '--base-font-size': `${settings.fontSize}px`,
      '--line-height': settings.lineHeight,
      '--paragraph-spacing': `${settings.paragraphSpacing}px`,
      '--margin-top': `${settings.marginTop}px`,
      '--margin-bottom': `${settings.marginBottom}px`,
      '--margin-left': `${settings.marginLeft}px`,
      '--margin-right': `${settings.marginRight}px`,
      '--font-family': `"${settings.fontFamily}", sans-serif`,
      '--heading-color': settings.accentColor || '#1f2937', // Default to dark gray if not set
      width: dimensions.width,
      minHeight: dimensions.minHeight,
    } as React.CSSProperties;

    // Base typography classes
    const typographyClasses = clsx(
      'prose max-w-none print:prose-sm',
      'prose-p:mb-[var(--paragraph-spacing)] prose-li:my-0',
      'prose-headings:mt-4 prose-headings:mb-2',
      // Apply theme color ONLY to headings as requested
      '[&>h1]:text-[var(--heading-color)]',
      '[&>h2]:text-[var(--heading-color)]',
      '[&>h3]:text-[var(--heading-color)]',
      '[&>h4]:text-[var(--heading-color)]',
      // Custom overrides for resume look
      '[&>h1]:text-3xl [&>h1]:border-b [&>h1]:pb-2 [&>h1]:mb-6',
      '[&>h2]:text-xl [&>h2]:uppercase [&>h2]:tracking-wider [&>h2]:border-b [&>h2]:pb-1 [&>h2]:mt-6',
      '[&>h3]:text-lg [&>h3]:font-semibold [&>h3]:mt-4',
      'text-[length:var(--base-font-size)] leading-[var(--line-height)]'
    );

    return (
      <div className="h-full w-full overflow-auto bg-gray-100/50 p-4 md:p-8 print:p-0 print:bg-white flex justify-center">
        <div
          ref={ref}
          className="bg-white shadow-xl print:shadow-none transition-all duration-300 ease-in-out resume-container"
          style={{
            padding: `var(--margin-top) var(--margin-right) var(--margin-bottom) var(--margin-left)`,
            fontFamily: 'var(--font-family)',
            ...containerStyle
          }}
        >
          <div className={typographyClasses}>
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>
        </div>
      </div>
    );
  }
);

ResumePreview.displayName = 'ResumePreview';
