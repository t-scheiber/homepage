"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import PDFViewer from "@/components/PDFViewer";
import ArrowIcon from "@/components/ArrowIcon";
import { SOCIAL_LINKS } from "@/lib/constants";

const projectLinks = [
  {
    href: "/codingprojects",
    title: "Coding projects",
    description:
      "Personal applications, useful tools and experiments. Explore the code behind them.",
  },
  {
    href: "/otherprojects",
    title: "WordPress & websites",
    description: "Websites for businesses, communities and organisations.",
  },
];

const socialLinks = [
  { title: "LinkedIn", href: SOCIAL_LINKS.linkedin },
  { title: "GitHub", href: SOCIAL_LINKS.github },
  { title: "Instagram", href: SOCIAL_LINKS.instagram },
  { title: "Facebook", href: SOCIAL_LINKS.facebook },
];

export default function Home() {
  const [isPDFViewerOpen, setIsPDFViewerOpen] = useState(false);
  const handleOpenPDF = useCallback(() => setIsPDFViewerOpen(true), []);
  const handleClosePDF = useCallback(() => setIsPDFViewerOpen(false), []);

  return (
    <main id="main-content" className="home-page">
      <header className="home-intro">
        <div className="home-intro-copy">
          <h1>Thomas Scheiber</h1>
          <p className="home-role">Software &amp; automation engineering</p>
          <p className="page-description">
            I build web applications, internal tools and automation, from
            employee workflows to cloud deployments.
          </p>
          <div className="home-actions">
            <Link className="home-primary-action" href="/workprojects">
              Explore my work <ArrowIcon />
            </Link>
            <button
              type="button"
              onClick={handleOpenPDF}
              className="home-cv-action"
              aria-label="View CV"
              aria-haspopup="dialog"
              aria-describedby="cv-description"
            >
              View CV
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M14 3H5v18h14V8l-5-5Z" />
                <path d="M14 3v5h5M8 12h8M8 16h6" />
              </svg>
            </button>
          </div>
          <p id="cv-description" className="home-cv-description">
            My experience, education and technical background.
          </p>
        </div>
        <div className="home-portrait">
          <Image
            src="/files/portrait.jpg"
            alt="A double-exposure portrait of Thomas Scheiber with mountain scenery."
            width={4184}
            height={4184}
            sizes="(max-width: 600px) 112px, (max-width: 900px) 220px, 300px"
            preload
          />
        </div>
      </header>

      <PDFViewer
        pdfUrl="/files/pdf/ScheiberThomasCV.pdf"
        fileName="ScheiberThomasCV.pdf"
        title="Curriculum vitae"
        isOpen={isPDFViewerOpen}
        onClose={handleClosePDF}
      />

      <section className="home-work" aria-labelledby="home-work-title">
        <div className="home-section-heading">
          <h2 id="home-work-title">Explore the projects</h2>
          <span>Professional work &amp; personal projects</span>
        </div>
        <div className="home-projects">
          <Link href="/workprojects" className="home-featured-project">
            <div className="home-featured-copy">
              <div>
                <h3>Work projects</h3>
                <p>
                  Internal tools, training and integrations. A closer look at my
                  professional work.
                </p>
              </div>
              <ArrowIcon />
            </div>
            <figure className="home-project-preview">
              <Image
                src="/files/work-projects/equipment.png"
                loading="eager"
                alt="Recreated equipment request workflow with fictional employees, devices and shipping statuses."
                width={1280}
                height={900}
                sizes="(max-width: 600px) calc(100vw - 80px), (max-width: 900px) 50vw, 620px"
              />
              <figcaption>
                Equipment workflow · Recreated demo with fictional data
              </figcaption>
            </figure>
          </Link>
          <div className="home-project-links">
            {projectLinks.map(({ href, title, description }) => (
              <Link href={href} key={href} className="home-project-link">
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
                <ArrowIcon />
              </Link>
            ))}
            <Link
              href="/certifications"
              className="home-project-link home-credentials"
            >
              <div>
                <h3>Degrees &amp; certifications</h3>
                <p>Engineering, IT and language qualifications.</p>
              </div>
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      <section className="home-contact" aria-labelledby="home-contact-title">
        <div>
          <h2 id="home-contact-title">Get in touch</h2>
          <a className="home-email" href={`mailto:${SOCIAL_LINKS.email}`}>
            <span>{SOCIAL_LINKS.email}</span> <ArrowIcon external />
          </a>
          {SOCIAL_LINKS.phone && (
            <a className="home-phone" href={`tel:${SOCIAL_LINKS.phone}`}>
              Call {SOCIAL_LINKS.phone}
            </a>
          )}
        </div>
        <nav className="home-social-links" aria-label="Find me online">
          {socialLinks.map(({ title, href }) => (
            <a
              key={title}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${title} (opens in new tab)`}
            >
              {title} <ArrowIcon external />
            </a>
          ))}
        </nav>
      </section>
    </main>
  );
}
