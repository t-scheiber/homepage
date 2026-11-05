import Image from "next/image";
import ArrowIcon from "@/components/ArrowIcon";
import { websites } from "@/lib/projects";

export default function OtherProjectsList() {
  return (
    <ul className="website-list">
      {websites.map((site) => (
        <li key={site.href}>
          <a
            href={site.href}
            target="_blank"
            rel="noopener noreferrer"
            className="collection-row website-row"
            aria-label={`${site.name}: ${site.what} (opens in new tab)`}
          >
            <span className="website-logo">
              <Image alt="" src={site.logoSrc} width={40} height={40} />
            </span>
            <span className="website-copy">
              <span className="website-name">{site.name}</span>
              <span className="website-what">{site.what}</span>
              <span className="website-meta">
                {site.part ? `${site.part} · ` : ""}
                {site.platform}
              </span>
            </span>
            <span className="website-host" aria-hidden="true">
              {new URL(site.href).hostname.replace(/^www\./, "")}
              <ArrowIcon external />
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
