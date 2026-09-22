import { memo } from "react";
import { SOCIAL_LINKS } from "@/lib/constants";

// JSON-LD Structured Data for SEO
function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Thomas Scheiber',
    description: 'Software development, internal tools, automation and IT administration.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://thomasscheiber.com',
    sameAs: [
      SOCIAL_LINKS.linkedin,
      SOCIAL_LINKS.github,
      SOCIAL_LINKS.instagram,
      SOCIAL_LINKS.facebook,
    ],
    email: SOCIAL_LINKS.email,
    ...(SOCIAL_LINKS.phone ? { telephone: SOCIAL_LINKS.phone } : {}),
    knowsAbout: [
      'Web Development',
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'WordPress',
      'Frontend Development',
      'Full Stack Development',
      'Workflow Automation',
      'IT Training',
      'API Integrations',
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Bachelor of Science in Engineering (BSc)',
        description: 'Smart Homes and Assistive Technologies',
        credentialCategory: 'Degree',
        educationalLevel: 'Bachelor',
        recognizedBy: { '@type': 'CollegeOrUniversity', name: 'FH Technikum Wien' },
      },
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
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
    />
  );
}

export default memo(StructuredData);
