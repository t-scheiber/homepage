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
  src: StaticImageData;
  alt: string;
  title: string;
  organization: string;
}

function CertificatesList() {
  const certificates: Certificate[] = [
    {
      href: "/files/pdf/Meta_Certificate.pdf",
      src: metaLogo,
      alt: "Meta certification logo",
      title: "Meta Front-End Developer",
      organization: "Meta",
    },
    {
      href: "/files/pdf/AWS_Certificate.pdf",
      src: awsLogo,
      alt: "AWS certification logo",
      title: "AWS Cloud Solutions Architect",
      organization: "Amazon Web Services",
    },
    {
      href: "/files/pdf/IT-Automation-Python_Certificate.pdf",
      src: googleLogo,
      alt: "Google certification logo",
      title: "Google IT Automation with Python",
      organization: "Google",
    },
    {
      href: "/files/pdf/IT-Support_Certificate.pdf",
      src: googleLogo,
      alt: "Google certification logo",
      title: "Google IT Support",
      organization: "Google",
    },
    {
      href: "/files/pdf/EF_Certificate.pdf",
      src: efLogo,
      alt: "EF Education First logo",
      title: "EF Language School C1",
      organization: "EF Education First",
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

  return (
    <ul className="list-none w-full m-0 p-0 justify-center relative">
      {certificates.map(({ href, src, alt, title, organization }, index) => (
        <li
          key={href}
          className="list-none"
        >
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${title} certificate from ${organization}`}
            className={`bg-white/20 backdrop-blur-md m-0 py-4 px-6 justify-center items-center relative flex transition-all duration-200 sm:py-3 sm:px-4 sm:text-base hover:bg-white/30 hover:backdrop-blur-none text-white! text-lg! font-normal drop-shadow-lg ${index !== certificates.length - 1 ? "border-b border-white" : ""}`}
          >
            <span className="flex mr-4 sm:mr-3 bg-white/90 rounded-lg p-2 shrink-0">
              <Image alt={alt} src={src} width={40} height={40} className="w-10 h-10 sm:w-9 sm:h-9" />
            </span>
            <span>{title}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default memo(CertificatesList);
