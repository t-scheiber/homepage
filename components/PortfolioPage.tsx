import type { ReactNode } from "react";

export default function PortfolioPage({ title, eyebrow, description, children, panel = true }: {
  title: string;
  eyebrow: string;
  description: string;
  children: ReactNode;
  panel?: boolean;
}) {
  return (
    <main id="main-content" className="collection-page">
      <header className="collection-header">
        <p className="section-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-description">{description}</p>
      </header>
      {panel ? <div className="collection-panel">{children}</div> : children}
    </main>
  );
}
