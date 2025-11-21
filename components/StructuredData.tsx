import { memo } from "react";

// JSON-LD Structured Data for SEO
function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Thomas Scheiber',
    jobTitle: 'Web Developer',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://thomasscheiber.com',
    sameAs: [
      process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://www.linkedin.com/in/thomas-scheiber-857006151/',
      process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/t-scheiber',
      process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/thomasscheiberphotography',
      process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://www.facebook.com/thomasscheiberphotography',
    ],
    email: process.env.NEXT_PUBLIC_EMAIL || 'contact@example.com',
    telephone: process.env.NEXT_PUBLIC_PHONE || '+1234567890',
    knowsAbout: [
      'Web Development',
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'WordPress',
      'Frontend Development',
      'Full Stack Development',
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Meta Front-End Developer',
        credentialCategory: 'Certificate',
        educationalLevel: 'Professional',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Meta',
        },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'AWS Cloud Solutions Architect',
        credentialCategory: 'Certificate',
        educationalLevel: 'Professional',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Amazon Web Services',
        },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Google IT Automation with Python',
        credentialCategory: 'Certificate',
        educationalLevel: 'Professional',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Google',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export default memo(StructuredData);
