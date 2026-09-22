import { Metadata } from "next";
import PortfolioPage from "@/components/PortfolioPage";
import OtherProjectsList from "@/components/OtherProjectsList";

export const metadata: Metadata = {
  alternates: { canonical: "/otherprojects" },
  title: "WordPress & Client Projects",
  description:
    "WordPress websites and client projects including architecture firms, vacation rentals, business websites, and community projects.",
  openGraph: {
    url: "/otherprojects",
    title: "WordPress & Client Projects | Thomas Scheiber",
    description:
      "Professional WordPress development and client website projects.",
  },
};

export default function OtherProjectsPage() {
  return (
    <PortfolioPage title="Websites & other projects" eyebrow="Client & community work" description="Websites for businesses, organisations and communities, from architecture and hospitality to local initiatives.">
      <OtherProjectsList />
    </PortfolioPage>
  );
}
