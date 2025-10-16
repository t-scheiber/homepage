// Site-wide constants and configuration
export const SITE_CONFIG = {
  name: 'Thomas Scheiber',
  title: 'Thomas Scheiber - Web Developer Portfolio',
  description: 'Professional web developer portfolio showcasing coding projects, certifications, and WordPress development work.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://thomasscheiber.com',
  author: {
    name: 'Thomas Scheiber',
    email: process.env.NEXT_PUBLIC_EMAIL || 'tom.scheiber@gmx.at',
    phone: process.env.NEXT_PUBLIC_PHONE || '+436502772241',
  },
  links: {
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://www.linkedin.com/in/thomas-scheiber-857006151/',
    github: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://www.github.com/t-scheiber/',
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/thomasscheiberphotography',
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://www.facebook.com/thomasscheiberphotography',
  },
} as const;

export const SKILLS = [
  'React',
  'Next.js',
  'TypeScript',
  'JavaScript',
  'WordPress',
  'HTML/CSS',
  'Tailwind CSS',
  'Node.js',
  'Git',
  'Responsive Design',
] as const;

export const CERTIFICATIONS = [
  'Meta Front-End Developer',
  'AWS Cloud Solutions Architect',
  'Google IT Automation with Python',
  'Google IT Support',
  'Cambridge English: First',
  'EF Language School C1',
  'ECDL',
  'Italian Language B1',
] as const;
