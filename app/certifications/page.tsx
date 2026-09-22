import { Metadata } from "next";
import Footer from "@/components/Footer";
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
    <main className="mx-auto flex h-full w-full max-w-[min(95vw,1050px)] 4k:max-w-[min(95vw,1600px)] flex-col items-center justify-center px-[1.5vw] py-[4vh] sm:px-[1.5vw] sm:py-[4vh]">
      <div className="flex flex-col w-full max-w-[832px] md:max-h-[65vh]">
        <h1 className="text-3xl font-semibold tracking-wider rounded-t-lg bg-white/20 backdrop-blur-md w-full m-0 p-5 text-center relative sm:text-2xl sm:p-4 !text-white border border-white/30 drop-shadow-lg flex items-center justify-center">
          Degrees & certifications
        </h1>
        <div className="md:overflow-y-auto custom-scrollbar">
          <CertificatesList />
        </div>
        <Footer />
      </div>
    </main>
  );
}
