import Image from "next/image";
import ArrowIcon from "@/components/ArrowIcon";
import {
  archivedSites,
  courseProjects,
  personalProjects,
  selectedProjects,
  type CodingProject,
} from "@/lib/projects";

function ProjectLinks({ project }: { project: CodingProject }) {
  return (
    <ul className="project-links" aria-label={`${project.name} links`}>
      {project.links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${link.label}: ${project.name} (opens in new tab)`}
          >
            {link.label} <ArrowIcon external />
          </a>
        </li>
      ))}
    </ul>
  );
}

function ProjectIcon({ project }: { project: CodingProject }) {
  return (
    <span className="project-icon" aria-hidden="true">
      {project.favicon ? (
        <Image
          src={`/files/favicons/projects/${project.favicon}`}
          alt=""
          width={28}
          height={28}
        />
      ) : (
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="m8 5-7 7 7 7m8-14 7 7-7 7M14 3l-4 18" />
        </svg>
      )}
    </span>
  );
}

function ProjectCard({ project }: { project: CodingProject }) {
  return (
    <article className="project-card" aria-labelledby={`${project.id}-title`}>
      {project.image && (
        <Image
          className="project-shot"
          src={project.image}
          alt={`Screenshot of the ${project.name} home page`}
          width={720}
          height={360}
          sizes="(max-width: 900px) calc(100vw - 80px), 560px"
        />
      )}
      <header>
        <ProjectIcon project={project} />
        <div>
          <h3 id={`${project.id}-title`}>{project.name}</h3>
          <p className="project-meta">
            {project.year} · {project.context}
          </p>
        </div>
      </header>
      <p className="project-what">{project.what}</p>
      {project.detail && <p className="project-detail">{project.detail}</p>}
      {project.decision && (
        <p className="project-decision">
          <span>Decision</span>
          {project.decision}
        </p>
      )}
      <p className="project-stack">{project.stack.join(" · ")}</p>
      <ProjectLinks project={project} />
    </article>
  );
}

export default function CodingProjectsList() {
  return (
    <>
      <section aria-labelledby="selected-title" className="project-section">
        <h2 id="selected-title" className="project-section-title">
          Selected
        </h2>
        <div className="project-grid">
          {selectedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
      <section aria-labelledby="personal-title" className="project-section">
        <h2 id="personal-title" className="project-section-title">
          Smaller personal tools
        </h2>
        <ul className="project-rows">
          {personalProjects.map((project) => (
            <li key={project.id} id={project.id} className="project-row">
              <ProjectIcon project={project} />
              <div>
                <h3>{project.name}</h3>
                <p className="project-what">{project.what}</p>
                <p className="project-meta">
                  {project.year} · {project.stack.join(" · ")}
                </p>
              </div>
              <ProjectLinks project={project} />
            </li>
          ))}
        </ul>
      </section>
      <details className="project-archive">
        <summary>
          <span>
            Course work and early experiments
            <small>
              {courseProjects.reduce((n, g) => n + g.items.length, 0) +
                archivedSites.length}{" "}
              course projects, practice apps and my first paid site
            </small>
          </span>
          <span className="project-archive-toggle" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M5 12h14" />
              <path className="project-archive-plus" d="M12 5v14" />
            </svg>
          </span>
        </summary>
        {[...courseProjects, { group: "Earlier paid work", items: archivedSites }].map(
          ({ group, items }) => (
            <div key={group} className="project-archive-group">
              <h3>{group}</h3>
              <ul>
                {items.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${item.name}, ${item.note} (opens in new tab)`}
                    >
                      <span>{item.name}</span>
                      <small>{item.note}</small>
                      <ArrowIcon external />
                    </a>
                    {item.live && (
                      <a
                        className="project-archive-live"
                        href={item.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Live version of ${item.name} (opens in new tab)`}
                      >
                        Live
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ),
        )}
      </details>
    </>
  );
}
