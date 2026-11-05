import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ArrowIcon from "@/components/ArrowIcon";
import CvButton from "@/components/CvButton";
import HomeTrace from "@/components/HomeTrace";
import { SOCIAL_LINKS } from "@/lib/constants";

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
    description:
      "Seven sites for an architecture practice, holiday rentals, a massage practice and community groups.",
  },
  {
    href: "/certifications",
    title: "Degrees & certifications",
    description:
      "B.Sc. from FH Technikum Wien with merit, an MSc in progress at TU Wien, and Coursera professional certificates from Meta, AWS and Google.",
  },
];

// Sources: the published CV, lib/work-projects.ts and the public repositories.
const aiWork = [
  {
    title: "AI pull-request reviewer",
    meta: "Refurbed · Git pilot · Python, OpenAI Responses API, SQLite",
    text: "An advisory reviewer that checks its structured findings against the reviewed diff. SQLite jobs survive restarts and prevent duplicate comments.",
    check: "Tested with broken and corrected code, cross-file defects, embedded prompt injection, restart recovery and replay.",
    href: "/workprojects#platform",
  },
  {
    title: "AI support drafts",
    meta: "Refurbed · osTicket extension · PHP, LLM integration",
    text: "Drafts replies from maintained knowledge and resolved tickets. A fix whose ticket reopens stops informing new drafts.",
    check: "Source validation on every learned fix; staff review and send every reply.",
    href: "/workprojects#support",
  },
  {
    title: "AI video generation tool",
    meta: "Personal tool · 2025 · Next.js, video model APIs",
    text: "Generates hero-section videos through three provider APIs and ten models, and shows a cost estimate before each run.",
    check: "Each model only offers the durations, ratios and resolutions it supports. Code on GitHub.",
    href: "/codingprojects#ai-video-title",
  },
  {
    title: "Gesture recognition in the browser",
    meta: "Bachelor project · FH Technikum Wien · TensorFlow.js",
    text: "Rock, paper, scissors played with webcam hand gestures, recognised in the browser. Mouse and keyboard work as fallbacks.",
    check: "A live app in English and German, with the code on GitHub.",
    href: "/codingprojects#rock-paper-scissors",
  },
];

const socialGroups = [
  {
    label: "Work",
    links: [
      { title: "LinkedIn", href: SOCIAL_LINKS.linkedin },
      { title: "GitHub", href: SOCIAL_LINKS.github },
    ],
  },
  {
    label: "Photography",
    links: [
      { title: "Instagram", href: SOCIAL_LINKS.instagram },
      { title: "Facebook", href: SOCIAL_LINKS.facebook },
    ],
  },
];

export default function Home() {
  return (
    <main id="main-content" className="home-page">
      <header className="home-intro">
        <div className="home-intro-copy">
          <h1>Thomas Scheiber</h1>
          <p className="home-role">
            Automation &amp; AI tooling for internal operations · Vienna
          </p>
          <p className="page-description home-lede">
            I build Refurbed&apos;s internal automation, from employee
            onboarding to an AI pull-request reviewer, and deploy it through
            GitLab CI/CD to Cloud Run.
          </p>
          <ul className="home-status" aria-label="Current status">
            <li className="home-status-open">
              <span>Open to</span>
              <span>AI and automation engineering roles in Vienna or remote</span>
            </li>
            <li>
              <span>Now</span>
              <span>
                IT Administrator at Refurbed, a marketplace for refurbished
                products, in a two-person IT team. Most of my week goes into
                building internal tools.
              </span>
            </li>
            <li>
              <span>Studying</span>
              <span>MSc Software Engineering at TU Wien</span>
            </li>
            <li>
              <span>Freelance</span>
              <span>
                Websites and web apps since 2018, self-employed since 2023
              </span>
            </li>
            <li>
              <span>Off-screen</span>
              <span>
                Grew up in Saalfelden am Steinernen Meer. Photography, ski
                touring and mountain biking.
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
          <h2 id="home-work-title">Start here</h2>
          <span>Work demos first, then projects, websites and credentials</span>
        </div>
        <div className="home-projects">
          <article
            className="home-featured-project"
            aria-labelledby="home-featured-title"
          >
            <div className="home-featured-copy">
              <div>
                <h3 id="home-featured-title">
                  <Link href="/workprojects">Work projects at Refurbed</Link>
                </h3>
                <p>
                  Eight internal tools rebuilt as demos you can break: blocked
                  shipments, partial directory failures and AI drafts that wait
                  for a person.
                </p>
              </div>
              <ArrowIcon />
            </div>
            <HomeTrace />
          </article>
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

      <section className="home-ai" aria-labelledby="home-ai-title">
        <div className="home-section-heading">
          <h2 id="home-ai-title">AI in my work</h2>
          <span>What each one does, and the evidence</span>
        </div>
        <ul className="home-ai-list">
          {aiWork.map((item) => (
            <li key={item.title}>
              <p className="home-ai-meta">{item.meta}</p>
              <h3>
                <Link href={item.href}>
                  {item.title} <ArrowIcon />
                </Link>
              </h3>
              <p>{item.text}</p>
              <p className="home-ai-check">
                <span>evidence</span>
                {item.check}
              </p>
            </li>
          ))}
        </ul>
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
          {socialGroups.map(({ label, links }) => (
            <div key={label} className="home-social-group">
              <p>{label}</p>
              {links.map(({ title, href }) => (
                <a
                  key={title}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${title}, ${label.toLowerCase()} (opens in new tab)`}
                >
                  {title} <ArrowIcon external />
                </a>
              ))}
            </div>
          ))}
        </nav>
      </section>
    </main>
  );
}
