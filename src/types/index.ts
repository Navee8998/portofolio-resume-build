export interface User {
  email: string;
  name?: string;
}

export type FontFamily = 
  | 'Inter' 
  | 'Roboto' 
  | 'Open Sans' 
  | 'Lato' 
  | 'Montserrat' 
  | 'Merriweather' 
  | 'Playfair Display' 
  | 'Lora' 
  | 'PT Serif' 
  | 'Roboto Mono' 
  | 'Source Code Pro' 
  | 'Fira Code';

export type PaperSize = 'a4' | 'a6' | 'letter';

export interface ResumeSettings {
  fontSize: number;
  lineHeight: number;
  paragraphSpacing: number;
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
  fontFamily: FontFamily;
  paperSize: PaperSize;
  theme: 'light' | 'minimal' | 'modern';
  accentColor: string;
}

export const DEFAULT_MARKDOWN = `# John Doe
**Software Engineer**

email@example.com | (555) 123-4567 | github.com/johndoe

## Summary
Experienced software engineer with a passion for building scalable web applications. Proficient in React, TypeScript, and Node.js.

## Experience

### Senior Frontend Developer | Tech Corp
*2020 - Present*
- Led the migration of a legacy codebase to React and TypeScript.
- Improved site performance by 40% through code splitting and optimization.
- Mentored junior developers and established coding standards.

### Web Developer | Creative Agency
*2018 - 2020*
- Developed responsive websites for diverse clients using HTML, CSS, and JavaScript.
- Collaborated with designers to implement pixel-perfect UIs.

## Skills
- **Languages:** JavaScript, TypeScript, Python, HTML, CSS
- **Frameworks:** React, Next.js, Tailwind CSS, Node.js
- **Tools:** Git, Docker, AWS

## Education
**B.S. Computer Science**
University of Technology | 2014 - 2018
`;

export const DEFAULT_SETTINGS: ResumeSettings = {
  fontSize: 14,
  lineHeight: 1.5,
  paragraphSpacing: 12,
  marginTop: 30,
  marginBottom: 30,
  marginLeft: 30,
  marginRight: 30,
  fontFamily: 'Inter',
  paperSize: 'a4',
  theme: 'modern',
  accentColor: '#2563eb',
};
