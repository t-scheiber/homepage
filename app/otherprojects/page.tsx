import { Metadata } from "next";
import PortfolioPage from "@/components/PortfolioPage";
import OtherProjectsList from "@/components/OtherProjectsList";

export const metadata: Metadata = {
  alternates: { canonical: "/otherprojects" },
  title: "Websites",
  description:
    "Websites Thomas Scheiber built for an architecture practice, a construction management office, holiday rentals and a massage practice, plus the EuropeTalks member cloud.",
  openGraph: {
    url: "/otherprojects",
    title: "Websites | Thomas Scheiber",
    description:
      "WordPress sites for small businesses and holiday rentals, plus the EuropeTalks member cloud.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Websites | Thomas Scheiber",
    description:
      "WordPress sites for small businesses and holiday rentals, plus the EuropeTalks member cloud.",
  },
};

export default function OtherProjectsPage() {
  return (
    <PortfolioPage panel={false} title="Websites" eyebrow="Client & community work" description="Five WordPress sites I built for small businesses and holiday rentals, the EuropeTalks member cloud, and a community site. Every entry opens the live site.">
      <OtherProjectsList />
    </PortfolioPage>
  );
}
