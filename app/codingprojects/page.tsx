import { Metadata } from "next";
import Footer from "@/components/Footer";
import CodingProjectsList from "@/components/CodingProjectsList";

export const metadata: Metadata = {
  title: "Coding Projects",
  description: "Explore my coding projects including React applications, Next.js websites, weather apps, calculators, and full-stack web development projects.",
  openGraph: {
    title: "Coding Projects | Thomas Scheiber",
    description: "Portfolio of coding projects built with React, Next.js, TypeScript, and modern web technologies.",
  },
};

export default function CodingProjectsPage() {
  return (
    <div className="mx-auto flex flex-col max-w-[832px] w-full justify-start px-4 sm:px-3 box-border">
      <div className="text-3xl font-bold tracking-wider rounded-t-lg bg-white/20 backdrop-blur-md w-full m-0 p-5 text-center relative sm:text-2xl sm:p-4 !text-white border border-white/30 drop-shadow-lg flex items-center justify-center">
        Coding Projects
      </div>
      <div className="max-h-[600px] overflow-y-auto md:max-h-[500px] sm:max-h-[450px] custom-scrollbar">
        <CodingProjectsList />
      </div>
      <Footer />
    </div>
  );
}
