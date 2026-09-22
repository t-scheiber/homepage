import { Metadata } from "next";
import PortfolioPage from "@/components/PortfolioPage";
import CodingProjectsList from "@/components/CodingProjectsList";

export const metadata: Metadata = {
  alternates: { canonical: "/codingprojects" },
  title: "Coding Projects",
  description:
    "Explore my coding projects including AI video generation, finance apps, React applications, Next.js websites, weather apps, calculators, and full-stack web development projects.",
  openGraph: {
    url: "/codingprojects",
    title: "Coding Projects | Thomas Scheiber",
    description:
      "Portfolio of coding projects including AI video generation, finance apps, React, Next.js, TypeScript, and modern web technologies.",
  },
};

export default function CodingProjectsPage() {
  return (
    <PortfolioPage title="Coding projects" eyebrow="Personal projects & experiments" description="Web applications, practical tools and early experiments. Project names open available websites; the GitHub icons link to the source code.">
      <CodingProjectsList />
    </PortfolioPage>
  );
}
