import { memo } from "react";
import Image, { StaticImageData } from "next/image";
// Import images
import metaLogo from "@/public/files/logos/meta.png";
import awsLogo from "@/public/files/logos/aws.png";
import googleLogo from "@/public/files/logos/google.png";
import efLogo from "@/public/files/logos/EF.png";
import cambridgeLogo from "@/public/files/logos/cambridge.png";
import ecdlLogo from "@/public/files/logos/ecdl.png";
import ecpatLogo from "@/public/files/logos/ecpat.png";
import scuolaLdVLogo from "@/public/files/logos/scuolaLdV.png";

interface Certificate {
  href: string;
  src?: StaticImageData;
  alt: string;
  title: string;
  organization: string;
  details?: string;
}

function CertificatesList() {
  const certificates: Certificate[] = [
    {
      href: "/files/pdf/BSc_Diploma.pdf",
      alt: "Academic degree",
      title: "Bachelor of Science in Engineering (BSc)",
      organization: "FH Technikum Wien",
      details:
        "FH Technikum Wien · Smart Homes and Assistive Technologies · with merit · 2022",
    },
    {
      href: "/files/pdf/Meta_Certificate.pdf",
      src: metaLogo,
      alt: "Meta certification logo",
      title: "Meta Front-End Developer",
      organization: "Meta",
      details: "Professional certificate · Coursera · 2024",
    },
    {
      href: "/files/pdf/AWS_Certificate.pdf",
      src: awsLogo,
      alt: "AWS certification logo",
      title:
        "AWS Cloud Solutions Architect (Coursera professional certificate)",
      organization: "Amazon Web Services",
      details: "Coursera professional certificate · 2024",
    },
    {
      href: "/files/pdf/IT-Automation-Python_Certificate.pdf",
      src: googleLogo,
      alt: "Google certification logo",
      title: "Google IT Automation with Python",
      organization: "Google",
      details: "Professional certificate · Coursera · 2023",
    },
    {
      href: "/files/pdf/IT-Support_Certificate.pdf",
      src: googleLogo,
      alt: "Google certification logo",
      title: "Google IT Support",
      organization: "Google",
      details: "Professional certificate · Coursera · 2022",
    },
    {
      href: "/files/pdf/EF_Certificate.pdf",
      src: efLogo,
      alt: "EF Education First logo",
      title: "EF English C1",
      organization: "EF Education First",
      details: "English language certificate · London · 2017",
    },
    {
      href: "/files/pdf/FCE_Certificate.pdf",
      src: cambridgeLogo,
      alt: "Cambridge English logo",
      title: "Cambridge English: First",
      organization: "Cambridge Assessment",
    },
    {
      href: "/files/pdf/ECDL.pdf",
      src: ecdlLogo,
      alt: "ECDL certification logo",
      title: "ECDL",
      organization: "ECDL Foundation",
    },
    {
      href: "/files/pdf/makeITsafe_Certificate.pdf",
      src: ecpatLogo,
      alt: "ECPAT certification logo",
      title: "make IT safe 2.0",
      organization: "ECPAT",
    },
    {
      href: "/files/pdf/Italian_Language_Certificate.pdf",
      src: scuolaLdVLogo,
      alt: "Scuola Leonardo da Vinci logo",
      title: "Italian Language B1",
      organization: "Scuola Leonardo da Vinci",
    },
  ];

  const groups = [
    { title: "Degrees", items: certificates.slice(0, 1), inProgress: true },
    { title: "Professional certificates", items: certificates.slice(1, 5) },
    {
      title: "Languages and earlier certificates",
      items: certificates.slice(5),
    },
  ];

  return (
    <>
      {groups.map((group) => (
        <section
          key={group.title}
          className="credential-group"
          aria-label={group.title}
        >
          <h2 className="credential-group-title">{group.title}</h2>
          <ul className="list-none w-full m-0 p-0 justify-center relative">
            {group.inProgress && (
              <li className="list-none">
                <div className="collection-row credential-in-progress">
                  <span className="flex mr-4 sm:mr-3 bg-white/90 rounded-lg p-2 shrink-0">
                    <svg
                      className="w-10 h-10 sm:w-9 sm:h-9 text-slate-700"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden="true"
                    >
                      <path
                        d="m2 9 10-5 10 5-10 5L2 9Z"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6 11v6c4 3 8 3 12 0v-6M22 9v7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span>
                    <span className="block">
                      Master&apos;s in Software Engineering
                    </span>
                    <span className="credential-details">
                      TU Wien · in progress
                    </span>
                  </span>
                </div>
              </li>
            )}
            {group.items.map(
              ({ href, src, alt, title, organization, details }) => (
                <li key={href} className="list-none">
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${title} certificate from ${organization}`}
                    className="collection-row"
                  >
                    <span className="flex mr-4 sm:mr-3 bg-white/90 rounded-lg p-2 shrink-0">
                      {src ? (
                        <Image
                          alt={alt}
                          src={src}
                          width={40}
                          height={40}
                          className="w-10 h-10 sm:w-9 sm:h-9"
                        />
                      ) : (
                        <svg
                          className="w-10 h-10 sm:w-9 sm:h-9 text-slate-700"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          aria-hidden="true"
                        >
                          <path
                            d="m2 9 10-5 10 5-10 5L2 9Z"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M6 11v6c4 3 8 3 12 0v-6M22 9v7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                    <span>
                      <span className="block">{title}</span>
                      <span className="credential-details">
                        {details || organization}
                      </span>
                    </span>
                  </a>
                </li>
              ),
            )}
          </ul>
        </section>
      ))}
    </>
  );
}

export default memo(CertificatesList);
