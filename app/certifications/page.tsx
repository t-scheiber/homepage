import { Metadata } from "next";
import PortfolioPage from "@/components/PortfolioPage";
import CertificatesList from "@/components/CertificatesList";

export const metadata: Metadata = {
  alternates: { canonical: "/certifications" },
  title: "Degrees & Certifications",
  description:
    "View my BSc in Engineering in Smart Homes and Assistive Technologies from FH Technikum Wien, alongside professional IT and language certifications.",
  openGraph: {
    url: "/certifications",
    title: "Degrees & Certifications | Thomas Scheiber",
    description:
      "BSc in Engineering from FH Technikum Wien and professional certifications in web development, cloud computing, and IT support.",
  },
};

export default function CertificationsPage() {
  return (
    <PortfolioPage title="Degrees & certifications" eyebrow="Education & continued learning" description="My engineering degree, professional IT certificates and language qualifications. Open any entry to view the document.">
      <CertificatesList />
    </PortfolioPage>
  );
}
