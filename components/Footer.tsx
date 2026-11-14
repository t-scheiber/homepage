import Link from "next/link";
import { SOCIAL_LINKS } from "@/lib/constants";
import ArrowIcon from "@/components/ArrowIcon";

// Static pages are rebuilt on every deploy, so the build date is the update date.
const updated = new Date().toLocaleDateString("en-GB", {
  month: "long",
  year: "numeric",
});

export default function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <Link href="/">Thomas Scheiber</Link>
        <p>Automation &amp; AI tooling · Vienna</p>
      </div>
      <nav aria-label="Social and contact links">
        <a href={`mailto:${SOCIAL_LINKS.email}`}>
          Email <ArrowIcon external />
        </a>
        <a
          href={SOCIAL_LINKS.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn (opens in new tab)"
        >
          LinkedIn <ArrowIcon external />
        </a>
        <a
          href={SOCIAL_LINKS.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub (opens in new tab)"
        >
          GitHub <ArrowIcon external />
        </a>
      </nav>
      <small>
        © {new Date().getFullYear()} Thomas Scheiber · updated {updated}
      </small>
    </footer>
  );
}
