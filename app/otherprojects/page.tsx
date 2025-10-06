import { Metadata } from "next";
import Footer from "@/components/Footer";
import OtherProjectsList from "@/components/OtherProjectsList";

export const metadata: Metadata = {
  title: "WordPress & Client Projects",
  description: "WordPress websites and client projects including architecture firms, vacation rentals, business websites, and community projects.",
  openGraph: {
    title: "WordPress & Client Projects | Thomas Scheiber",
    description: "Professional WordPress development and client website projects.",
  },
};

export default function OtherProjectsPage() {
  return (
    <div className="mx-auto flex flex-col max-w-[832px] w-full justify-start px-4 sm:px-3 box-border">
      <div className="text-3xl font-bold tracking-wider rounded-t-lg bg-white/20 backdrop-blur-md w-full m-0 p-5 text-center relative sm:text-2xl sm:p-4 !text-white border border-white/30 drop-shadow-lg flex items-center justify-center">
        WordPress & Other Projects
      </div>
      <div className="max-h-[600px] overflow-y-auto md:max-h-[500px] sm:max-h-[450px] custom-scrollbar">
        <OtherProjectsList />
      </div>
      <Footer />
    </div>
  );
}
