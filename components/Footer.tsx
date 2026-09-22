import Link from "next/link";
import { SOCIAL_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div><Link href="/">Thomas Scheiber</Link><p>Software, automation &amp; IT.</p></div>
      <nav aria-label="Social and contact links">
        <a href={`mailto:${SOCIAL_LINKS.email}`}>Email</a>
        <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in new tab)">LinkedIn <span aria-hidden="true">↗</span></a>
        <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in new tab)">GitHub <span aria-hidden="true">↗</span></a>
      </nav>
      <small>© {new Date().getFullYear()} Thomas Scheiber</small>
    </footer>
  );
}
