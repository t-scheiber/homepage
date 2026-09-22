"use client";

import { useState, useCallback, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import PDFViewer from "@/components/PDFViewer";
import certification from "@/public/files/certificates.png";
import wordpress from "@/public/files/Wordpress-Logo.svg";
import linkedin from "@/public/files/linkedin.svg";
import github from "@/public/files/github.svg";
import facebook from "@/public/files/facebook.svg";
import instagram from "@/public/files/instagram.svg";
import envelope from "@/public/files/envelope-solid.svg";
import { SOCIAL_LINKS } from "@/lib/constants";

function Tile({ href, title, description, icon, className = "", external = false }: {
  href: string; title: string; description?: string; icon: ReactNode; className?: string; external?: boolean;
}) {
  return (
    <Link href={href} className={`home-tile ${className}`} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} aria-label={external ? `${title} (opens in new tab)` : undefined}>
      <span className="tile-icon" aria-hidden="true">{icon}</span>
      <span className="tile-arrow" aria-hidden="true">↗</span>
      <div><h2>{title}</h2>{description && <p>{description}</p>}</div>
    </Link>
  );
}

export default function Home() {
  const [isPDFViewerOpen, setIsPDFViewerOpen] = useState(false);
  const handleOpenPDF = useCallback(() => setIsPDFViewerOpen(true), []);
  const handleClosePDF = useCallback(() => setIsPDFViewerOpen(false), []);

  return (
    <main id="main-content" className="home-page">
      <header className="home-intro">
        <p className="section-eyebrow">Software &amp; automation engineering</p>
        <h1>Thomas Scheiber</h1>
        <p className="page-description">I build web applications, internal tools and automation, from employee workflows to cloud deployments.</p>
      </header>
      <PDFViewer pdfUrl="/files/pdf/ScheiberThomasCV.pdf" fileName="ScheiberThomasCV.pdf" isOpen={isPDFViewerOpen} onClose={handleClosePDF} />
      <div className="home-grid">
        <button type="button" onClick={handleOpenPDF} className="home-tile tile-half" aria-label="View CV">
          <span className="tile-icon" aria-hidden="true"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#263b48" strokeWidth="1.5"><path d="M14 3H5v18h14V8l-5-5Z" strokeLinejoin="round"/><path d="M14 3v5h5M8 12h8M8 16h6"/></svg></span>
          <span className="tile-arrow" aria-hidden="true">↗</span>
          <span><span className="tile-title">CV</span><span className="tile-description">My experience, education and technical background.</span></span>
        </button>
        <Tile href="/workprojects" title="Work projects" description="Internal tools, training and integrations. A closer look at my professional work." className="tile-half" icon={<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#263b48" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><path d="M10 6h5a3 3 0 0 1 3 3v5M6 10v5a3 3 0 0 0 3 3h5"/></svg>} />
        <Tile href="/codingprojects" title="Coding projects" description="Personal applications, useful tools and experiments. Explore the code behind them." className="tile-half" icon={<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#263b48" strokeWidth="1.5"><path d="m8 5-7 7 7 7m8-14 7 7-7 7M14 3l-4 18"/></svg>} />
        <Tile href="/otherprojects" title="WordPress & websites" description="Websites for businesses, communities and organisations." className="tile-half" icon={<Image src={wordpress} alt="" width={32} height={32}/>} />
        <Tile href="/certifications" title="Degrees & certifications" description="Engineering, IT and language qualifications." className="tile-half compact" icon={<Image src={certification} alt="" width={32} height={32}/>} />
        <Tile href={SOCIAL_LINKS.linkedin} title="LinkedIn" className="compact" external icon={<Image src={linkedin} alt="" width={32} height={32}/>} />
        <Tile href={SOCIAL_LINKS.github} title="GitHub" className="compact" external icon={<Image src={github} alt="" width={32} height={32}/>} />
        <Tile href={`mailto:${SOCIAL_LINKS.email}`} title="Email" description={SOCIAL_LINKS.email} className="tile-half home-contact" icon={<Image src={envelope} alt="" width={32} height={32}/>} />
        <div className="social-pair tile-half">
          <Tile href={SOCIAL_LINKS.instagram} title="Instagram" external icon={<Image src={instagram} alt="" width={28} height={28}/>} />
          <Tile href={SOCIAL_LINKS.facebook} title="Facebook" external icon={<Image src={facebook} alt="" width={28} height={28}/>} />
        </div>
      </div>
      {SOCIAL_LINKS.phone && <a className="home-phone" href={`tel:${SOCIAL_LINKS.phone}`}>Call {SOCIAL_LINKS.phone}</a>}
    </main>
  );
}
