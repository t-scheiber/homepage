import { Metadata } from "next";
import PortfolioPage from "@/components/PortfolioPage";
import CertificatesList from "@/components/CertificatesList";

export const metadata: Metadata = {
  alternates: { canonical: "/certifications" },
  title: "Degrees & certifications",
  description:
    "Thomas Scheiber's B.Sc. in Smart Homes and Assistive Technologies from FH Technikum Wien, his master's in progress at TU Wien, and professional IT and language certificates.",
  openGraph: {
    url: "/certifications",
    title: "Degrees & certifications | Thomas Scheiber",
    description:
      "B.Sc. from FH Technikum Wien, master's in progress at TU Wien, and Meta, AWS and Google professional certificates.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Degrees & certifications | Thomas Scheiber",
    description:
      "B.Sc. from FH Technikum Wien, master's in progress at TU Wien, and Meta, AWS and Google professional certificates.",
  },
};

export default function CertificationsPage() {
  return (
    <PortfolioPage title="Degrees & certifications" eyebrow="Education & continued learning" description="A B.Sc. from FH Technikum Wien, a master's in progress at TU Wien, professional IT certificates and language qualifications. Every finished entry opens the original document.">
      <CertificatesList />
    </PortfolioPage>
  );
}
