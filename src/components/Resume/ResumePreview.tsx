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
    // Dynamic styles based on settings
    const containerStyle = {
      '--base-font-size': `${settings.fontSize}px`,
      '--line-height': settings.lineHeight,
      '--paragraph-spacing': `${settings.paragraphSpacing}px`,
      '--margin-top': `${settings.marginTop}px`,
      '--margin-bottom': `${settings.marginBottom}px`,
      '--margin-left': `${settings.marginLeft}px`,
      '--margin-right': `${settings.marginRight}px`,
      '--accent-color': settings.accentColor,
    } as React.CSSProperties;

    const fontClass = {
      sans: 'font-sans',
      serif: 'font-serif',
      mono: 'font-mono',
    }[settings.fontFamily];

    const themeClasses = {
      light: 'prose-headings:text-gray-900 prose-a:text-blue-600',
      minimal: 'prose-headings:font-normal prose-hr:border-gray-200',
      modern: 'prose-headings:text-[var(--accent-color)] prose-headings:font-bold',
    }[settings.theme];

    return (
      <div className="h-full w-full overflow-auto bg-gray-100 p-4 md:p-8 print:p-0 print:bg-white">
        <div
          ref={ref}
          className="mx-auto bg-white shadow-lg print:shadow-none"
          style={{
            width: '210mm',
            minHeight: '297mm', // A4 height
            padding: `var(--margin-top) var(--margin-right) var(--margin-bottom) var(--margin-left)`,
            ...containerStyle
          }}
        >
          <div
            className={clsx(
              'prose max-w-none print:prose-sm',
              fontClass,
              themeClasses,
              'prose-p:mb-[var(--paragraph-spacing)] prose-li:my-0',
              'prose-headings:mt-4 prose-headings:mb-2',
              // Custom overrides for resume look
              '[&>h1]:text-3xl [&>h1]:border-b [&>h1]:pb-2 [&>h1]:mb-4',
              '[&>h2]:text-xl [&>h2]:uppercase [&>h2]:tracking-wider [&>h2]:border-b [&>h2]:pb-1 [&>h2]:mt-6',
              '[&>h3]:text-lg [&>h3]:font-semibold [&>h3]:mt-4',
              'text-[length:var(--base-font-size)] leading-[var(--line-height)]'
            )}
          >
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>
        </div>
      </div>
    );
  }
);

ResumePreview.displayName = 'ResumePreview';
