import type { Metadata } from "next";
import Link from "next/link";
import WorkShowcase from "@/components/WorkShowcase";
import ArrowIcon from "@/components/ArrowIcon";
import { furtherProjects } from "@/lib/work-projects";
import { SOCIAL_LINKS } from "@/lib/constants";
import "@/styles/work-projects.css";

const description =
  "Eight internal tools Thomas Scheiber worked on at Refurbed, rebuilt as interactive demos with fictional data: blocked shipments, partial failures and approval gates.";
export const metadata: Metadata = {
  title: "Work projects",
  description,
  alternates: { canonical: "/workprojects" },
  openGraph: {
    title: "Work projects | Thomas Scheiber",
    description,
    url: "/workprojects",
  },
  twitter: {
    card: "summary_large_image",
    title: "Work projects | Thomas Scheiber",
    description,
  },
};
export default function WorkProjectsPage() {
  return (
    <main id="main-content" className="work-page">
      <header className="work-intro">
        <h1>Workflows you can try.</h1>
        <div>
          <p>
            Since July 2024 I have built internal tools at Refurbed, in a
            two-person IT team. These eight demos rebuild tools I worked on with
            fictional data, so you can trigger the failures they were designed
            to handle.
          </p>
          <a href="#more-work">
            Browse more projects <ArrowIcon />
          </a>
        </div>
      </header>
      <WorkShowcase />
      <section
        id="more-work"
        className="work-further"
        aria-labelledby="more-work-title"
      >
        <header>
          <h2 id="more-work-title">More behind the scenes.</h2>
          <p>
            Other applications and integrations I worked on at Refurbed between
            2024 and 2026. Open a project to see my contribution.
          </p>
        </header>
        <div className="work-project-index">
          {furtherProjects.map((project) => (
            <details id={project.id} key={project.id}>
              <summary>
                <span className="work-index-category">{project.category}</span>
                <span className="work-index-title">{project.title}</span>
                <span className="work-index-toggle" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M5 12h14" />
                    <path className="work-index-plus" d="M12 5v14" />
                  </svg>
                </span>
              </summary>
              <div className="work-index-detail">
                <p>{project.description}</p>
                <div>
                  <h3>My contribution</h3>
                  <p>{project.contribution}</p>
                </div>
                <p className="work-index-skills">{project.skills}</p>
              </div>
            </details>
          ))}
        </div>
      </section>
      <footer className="work-page-footer">
        <p>
          These are simplified reconstructions with fictional data. The demos
          explain the workflows without exposing employer systems, code or
          information.
        </p>
        <div className="work-page-next">
          <a href={`mailto:${SOCIAL_LINKS.email}`}>
            Ask me about this work <ArrowIcon external />
          </a>
          <Link href="/codingprojects">
            Personal projects <ArrowIcon />
          </Link>
        </div>
      </footer>
    </main>
  );
}
