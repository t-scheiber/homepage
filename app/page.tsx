import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ArrowIcon from "@/components/ArrowIcon";
import CvButton from "@/components/CvButton";
import { SOCIAL_LINKS } from "@/lib/constants";
import { websites } from "@/lib/projects";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const projectLinks = [
  {
    href: "/codingprojects",
    title: "Coding projects",
    description:
      "The EuropeTalks member platform, a guest documents app, an AI video tool and a roofing company demo site.",
  },
  {
    href: "/otherprojects",
    title: "Websites",
    description: `${websites.length} sites for an architecture practice, holiday rentals, a massage practice and community groups.`,
  },
  {
    href: "/certifications",
    title: "Degrees & certifications",
    description:
      "B.Sc. from FH Technikum Wien with merit, an MSc in progress at TU Wien, and Meta, AWS and Google certificates.",
  },
];

const socialLinks = [
  { title: "LinkedIn", href: SOCIAL_LINKS.linkedin },
  { title: "GitHub", href: SOCIAL_LINKS.github },
  { title: "Instagram", href: SOCIAL_LINKS.instagram },
  { title: "Facebook", href: SOCIAL_LINKS.facebook },
];

const trace = [
  {
    input: 'Postal code "10"',
    outcome: "Shipment blocked. No label was requested.",
    tone: "warning",
  },
  {
    input: "Address corrected",
    outcome: "Sample label prepared. Further labels locked.",
    tone: "success",
  },
  {
    input: "Carrier response unknown",
    outcome: "Reconcile first. No second label was created.",
    tone: "warning",
  },
] as const;

export default function Home() {
  return (
    <main id="main-content" className="home-page">
      <header className="home-intro">
        <div className="home-intro-copy">
          <h1>Thomas Scheiber</h1>
          <p className="home-role">Software development &amp; automation · Vienna</p>
          <p className="page-description home-lede">
            At Refurbed I build the internal tools behind employee equipment,
            identity and onboarding workflows, and ship them through GitLab CI/CD
            to Google Cloud Run.
          </p>
          <ul className="home-status" aria-label="Current status">
            <li>
              <span>Now</span>
              <span>IT Administrator at Refurbed, in a two-person IT team</span>
            </li>
            <li>
              <span>Studying</span>
              <span>MSc Software Engineering at TU Wien</span>
            </li>
            <li>
              <span>Freelance</span>
              <span>Websites and web apps since 2023</span>
            </li>
            <li>
              <span>Off-screen</span>
              <span>
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Photography (Instagram, opens in new tab)"
                >
                  Photography
                </a>
                , ski touring and mountain biking
              </span>
            </li>
          </ul>
          <div className="home-actions">
            <Link className="home-primary-action" href="/workprojects">
              Try the work demos <ArrowIcon />
            </Link>
            <CvButton />
          </div>
          <p id="cv-description" className="home-cv-description">
            Two pages: experience, selected projects, education and
            certificates.
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

      <section className="home-work" aria-labelledby="home-work-title">
        <div className="home-section-heading">
          <h2 id="home-work-title">Work you can try</h2>
          <span>Professional work, personal projects and credentials</span>
        </div>
        <div className="home-projects">
          <Link href="/workprojects" className="home-featured-project">
            <div className="home-featured-copy">
              <div>
                <h3>Work projects at Refurbed</h3>
                <p>
                  Eight internal tools rebuilt as demos you can break: blocked shipments, partial directory failures and AI
                  drafts that wait for a person.
                </p>
              </div>
              <ArrowIcon />
            </div>
            <figure className="home-trace">
              <p className="home-trace-title">
                <span className="home-trace-dot" aria-hidden="true" />
                Equipment handover demo
              </p>
              <ol>
                {trace.map((step, index) => (
                  <li key={step.input} className={`home-trace-${step.tone}`}>
                    <span className="home-trace-step" aria-hidden="true">
                      {index + 1}
                    </span>
                    <span className="home-trace-input">{step.input}</span>
                    <span className="home-trace-outcome">{step.outcome}</span>
                  </li>
                ))}
              </ol>
              <figcaption>
                Three states from the demo. Fictional data, runs in your
                browser.
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
