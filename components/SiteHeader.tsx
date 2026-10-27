"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SOCIAL_LINKS } from "@/lib/constants";
import ArrowIcon from "@/components/ArrowIcon";
import ThemeSelect from "@/components/ThemeSelect";

const pages = [
  { href: "/workprojects", label: "Work" },
  { href: "/codingprojects", label: "Coding" },
  { href: "/otherprojects", label: "Websites" },
  { href: "/certifications", label: "Credentials" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="site-header">
      <Link href="/" className="site-brand" aria-label="Thomas Scheiber, home">
        <span className="site-monogram" aria-hidden="true">
          ts.
        </span>
        <span>Thomas Scheiber</span>
      </Link>
      <nav className="site-navigation" aria-label="Main navigation">
        {pages.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            aria-current={pathname === href ? "page" : undefined}
          >
            {label}
          </Link>
        ))}
      </nav>
      <div className="header-actions">
        <ThemeSelect />
        <a className="header-contact" href={`mailto:${SOCIAL_LINKS.email}`}>
          Get in touch <ArrowIcon external />
        </a>
      </div>
    </header>
  );
}
