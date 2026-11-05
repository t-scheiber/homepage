import Image from "next/image";
import ArrowIcon from "@/components/ArrowIcon";
import { websites } from "@/lib/projects";

export default function OtherProjectsList() {
  return (
    <ul className="website-grid">
      {websites.map((site) => (
        <li key={site.href}>
          <a
            href={site.href}
            target="_blank"
            rel="noopener noreferrer"
            className="website-card"
            aria-label={`${site.name}: ${site.what} (opens in new tab)`}
          >
            <span className="website-shot">
              {site.image ? (
                <Image
                  src={site.image}
                  alt=""
                  width={720}
                  height={360}
                  sizes="(max-width: 700px) calc(100vw - 40px), 380px"
                />
              ) : (
                <span className="website-shot-logo">
                  <Image alt="" src={site.logoSrc} width={64} height={64} />
                </span>
              )}
            </span>
            <span className="website-copy">
              <h2 className="website-name">{site.name}</h2>
              <span className="website-what">{site.what}</span>
              <span className="website-meta">
                {site.part ? `${site.part} · ` : ""}
                {site.platform}
              </span>
              <span className="website-host">
                {new URL(site.href).hostname.replace(/^www\./, "")}
                <ArrowIcon external />
              </span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
