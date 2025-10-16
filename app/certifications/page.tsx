import { Metadata } from "next";
import Footer from "@/components/Footer";
import CertificatesList from "@/components/CertificatesList";

export const metadata: Metadata = {
  title: "Professional Certifications",
  description:
    "View my professional certifications including Meta Front-End Developer, AWS Cloud Solutions Architect, Google IT certifications, and language proficiency certificates.",
  openGraph: {
    title: "Professional Certifications | Thomas Scheiber",
    description: "Professional certifications in web development, cloud computing, and IT support.",
  },
};

export default function CertificationsPage() {
  return (
    <div className="mx-auto flex flex-col max-w-[832px] w-full justify-start px-4 sm:px-3 box-border">
      <div className="text-3xl font-bold tracking-wider rounded-t-lg bg-white/20 backdrop-blur-md w-full m-0 p-5 text-center relative sm:text-2xl sm:p-4 !text-white border border-white/30 drop-shadow-lg flex items-center justify-center">
        Certificates
      </div>
      <div className="max-h-[600px] overflow-y-auto md:max-h-[500px] sm:max-h-[450px] custom-scrollbar">
        <CertificatesList />
      </div>
      <Footer />
    </div>
  );
}
