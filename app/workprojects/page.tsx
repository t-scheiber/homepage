import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { workProjects } from "@/lib/work-projects";
import styles from "./work-projects.module.css";

const description =
  "Selected professional work by Thomas Scheiber: internal applications, workflow automation and integrations, illustrated with recreated demos and fictional data.";

export const metadata: Metadata = {
  title: "Work projects",
  description,
  alternates: { canonical: "/workprojects" },
  openGraph: {
    title: "Work projects | Thomas Scheiber",
    description,
    url: "/workprojects",
  },
  twitter: { title: "Work projects | Thomas Scheiber", description },
};

export default function WorkProjectsPage() {
  return (
    <main id="main-content" className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>
          <span aria-hidden="true" /> Selected professional work
        </p>
        <h1>
          Internal tools.
          <br />
          <em>Practical automation.</em>
        </h1>
        <p className={styles.intro}>
          I build internal applications and automate IT workflows. These examples
          cover employee training, application deployment, equipment requests and
          access management, with my contribution to each project.
        </p>
        <div className={styles.disclosure}>
          <span className={styles.disclosureIcon} aria-hidden="true">
            ◈
          </span>
          <p>
            <strong>Real projects. Recreated demos.</strong> The screenshots are
            illustrative recreations with fictional data and simplified layouts.
            Company branding, internal URLs and implementation details are
            omitted.
          </p>
        </div>
      </header>

      <nav className={styles.index} aria-label="Jump to a project">
        {workProjects.map((project) => (
          <a key={project.id} href={`#${project.id}`}>
            <span>{project.number}</span>
            {project.category}
            <span aria-hidden="true">↓</span>
          </a>
        ))}
      </nav>

      <div className={styles.projects}>
        {workProjects.map((project) => (
          <article id={project.id} key={project.id} className={styles.project}>
            <div className={styles.projectCopy}>
              <p className={styles.eyebrow}>
                <span className={styles.number}>{project.number}</span>
                {project.category}
              </p>
              <h2>{project.title}</h2>
              <p className={styles.summary}>{project.summary}</p>
              <div className={styles.contribution}>
                <h3>My contribution</h3>
                <p>{project.contribution}</p>
              </div>
              <ul className={styles.tags} aria-label="Technologies and skills">
                {project.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
            <figure className={`${styles.figure} ${styles[project.accent]}`}>
              <a
                className={styles.imageLink}
                href={project.image}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open larger demo image: ${project.category} (new tab)`}
              >
                <Image
                  src={project.image}
                  alt={project.alt}
                  width={1280}
                  height={900}
                  sizes="(max-width: 800px) 92vw, 58vw"
                  preload={project.number === "01"}
                />
                <span className={styles.enlarge}>
                  View larger <span aria-hidden="true">↗</span>
                </span>
              </a>
              <figcaption>
                <span>Recreated demo</span>
                {project.caption}
              </figcaption>
            </figure>
          </article>
        ))}
      </div>

      <footer className={styles.footer}>
        <div>
          <p className={styles.eyebrow}>More of my work</p>
          <h2>Curious what else I build?</h2>
          <p>Explore my personal projects and technical experiments.</p>
        </div>
        <Link href="/codingprojects">
          Explore coding projects <span aria-hidden="true">↗</span>
        </Link>
      </footer>
    </main>
  );
}
