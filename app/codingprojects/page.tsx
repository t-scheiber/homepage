import { Metadata } from "next";
import PortfolioPage from "@/components/PortfolioPage";
import CodingProjectsList from "@/components/CodingProjectsList";

export const metadata: Metadata = {
  alternates: { canonical: "/codingprojects" },
  title: "Coding projects",
  description:
    "Thomas Scheiber's freelance and personal builds: the EuropeTalks member platform, a holiday-rental guest documents app, an AI video tool and smaller apps, with code and live links.",
  openGraph: {
    url: "/codingprojects",
    title: "Coding projects | Thomas Scheiber",
    description:
      "The EuropeTalks member platform, a guest documents app, an AI video tool and smaller apps, with code and live links.",
  },
};

export default function CodingProjectsPage() {
  return (
    <PortfolioPage panel={false} title="Coding projects" eyebrow="Freelance & personal builds" description="Client platforms and sites, tools I built for myself, and the course work underneath. Each project links to its code, and to a live version where one exists.">
      <CodingProjectsList />
    </PortfolioPage>
  );
}
