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
      <Link href="/" className="site-brand">
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
          <span className="header-contact-label">Get in touch</span>
          <ArrowIcon external />
          <svg
            className="header-contact-mail"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m4 7 8 6 8-6" />
          </svg>
        </a>
      </div>
    </header>
  );
}
