import type { Metadata } from "next";
import Link from "next/link";
import ArrowIcon from "@/components/ArrowIcon";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main id="main-content" className="collection-page not-found-page">
      <header className="collection-header">
        <p className="section-eyebrow">404</p>
        <h1>This page doesn&apos;t exist.</h1>
        <p className="page-description">
          The link may be old, or the address has a typo. These pages do exist:
        </p>
      </header>
      <ul className="not-found-links">
        <li>
          <Link href="/workprojects">
            Work demos <ArrowIcon />
          </Link>
        </li>
        <li>
          <Link href="/codingprojects">
            Coding projects <ArrowIcon />
          </Link>
        </li>
        <li>
          <Link href="/">
            Home <ArrowIcon />
          </Link>
        </li>
      </ul>
    </main>
  );
}
