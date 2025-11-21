import { Metadata } from "next";
import Footer from "@/components/Footer";
import OtherProjectsList from "@/components/OtherProjectsList";

export const metadata: Metadata = {
  title: "WordPress & Client Projects",
  description:
    "WordPress websites and client projects including architecture firms, vacation rentals, business websites, and community projects.",
  openGraph: {
    title: "WordPress & Client Projects | Thomas Scheiber",
    description:
      "Professional WordPress development and client website projects.",
  },
};

export default function OtherProjectsPage() {
  return (
    <main className="mx-auto flex h-full w-full max-w-[min(95vw,1050px)] 4k:max-w-[min(95vw,1600px)] flex-col items-center justify-center px-[1.5vw] py-[4vh] sm:px-[1.5vw] sm:py-[4vh]">
      <div className="flex flex-col w-full max-w-[832px] max-h-[65vh]">
        <div className="text-3xl font-semibold tracking-wider rounded-t-lg bg-white/20 backdrop-blur-md w-full m-0 p-5 text-center relative sm:text-2xl sm:p-4 text-white! border border-white/30 drop-shadow-lg flex items-center justify-center">
          WordPress & Other Projects
        </div>
        <div className="overflow-y-auto custom-scrollbar">
          <OtherProjectsList />
        </div>
        <Footer />
      </div>
    </main>
  );
}
