import { Metadata } from "next";
import Footer from "@/components/Footer";
import CodingProjectsList from "@/components/CodingProjectsList";

export const metadata: Metadata = {
  title: "Coding Projects",
  description:
    "Explore my coding projects including AI video generation, finance apps, React applications, Next.js websites, weather apps, calculators, and full-stack web development projects.",
  openGraph: {
    title: "Coding Projects | Thomas Scheiber",
    description:
      "Portfolio of coding projects including AI video generation, finance apps, React, Next.js, TypeScript, and modern web technologies.",
  },
};

export default function CodingProjectsPage() {
  return (
    <main className="mx-auto flex h-full w-full max-w-[min(95vw,1050px)] 4k:max-w-[min(95vw,1600px)] flex-col items-center justify-center px-[1.5vw] py-[4vh] sm:px-[1.5vw] sm:py-[4vh]">
      <div className="flex flex-col w-full max-w-[832px] max-h-[65vh]">
        <div className="text-3xl font-semibold tracking-wider rounded-t-lg bg-white/20 backdrop-blur-md w-full m-0 p-5 text-center relative sm:text-2xl sm:p-4 text-white! border border-white/30 drop-shadow-lg flex items-center justify-center">
          Coding Projects
        </div>
        <div className="overflow-y-auto custom-scrollbar">
          <CodingProjectsList />
        </div>
        <Footer />
      </div>
    </main>
  );
}
