'use client';

import { useState } from 'react';
import TileLink from "@/components/TileLink";
import PDFViewer from "@/components/PDFViewer";
import Image from "next/image";
import portrait from "@/public/files/portrait.jpg";
import coding from "@/public/files/coding.png";
import certification from "@/public/files/certificates.png";
import wordpress from "@/public/files/Wordpress-Logo.svg";
import linkedin from "@/public/files/linkedin.svg";
import github from "@/public/files/github.svg";
import facebook from "@/public/files/facebook.svg";
import instagram from "@/public/files/instagram.svg";
import envelope from "@/public/files/envelope-solid.svg";
import phone from "@/public/files/phone-solid.svg";

export default function Home() {
  const [isPDFViewerOpen, setIsPDFViewerOpen] = useState(false);

  return (
    <main className="w-full flex flex-col">
      <header className="flex justify-between items-center max-w-[1000px] w-full mx-auto px-12 pt-2 pb-8 md:flex-col md:gap-2 md:text-center md:px-8">
        <h1 className="text-4xl md:text-3xl sm:text-2xl">Thomas Scheiber</h1>
        <h1 className="text-4xl md:text-3xl sm:text-2xl">Web Developer</h1>
      </header>
      
      <div className="mx-auto flex flex-wrap gap-4 max-w-[850px] justify-center px-4 pb-8 md:gap-4 sm:gap-4">
        {/* CV Viewer */}
        <button
          onClick={() => setIsPDFViewerOpen(true)}
          className="w-[400px] h-[270px] rounded-2xl bg-white/65 flex flex-col justify-center text-center transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-1 hover:shadow-xl border-none md:w-80 md:h-[210px] sm:w-80 sm:h-[210px] sm:p-4"
          aria-label="View CV"
        >
          <Image
            className="rounded-full mx-auto"
            src={portrait}
            alt="Thomas Scheiber portrait photo"
            width={145}
            height={145}
          />
          <p className="m-0 mt-2 text-[22pt] sm:text-[16pt]">CV</p>
        </button>

        <PDFViewer
          pdfUrl="/files/pdf/ScheiberThomasCV.pdf"
          fileName="ScheiberThomasCV.pdf"
          isOpen={isPDFViewerOpen}
          onClose={() => setIsPDFViewerOpen(false)}
        />

        {/* Coding Projects */}
        <TileLink
          href="/codingprojects"
          label="Coding Projects"
          imageSrc={coding}
          imageAlt="Programming code illustration"
          imageWidth={260}
          imageHeight={173}
          priority={true}
          className="w-[400px] h-[270px] rounded-2xl bg-white/65 flex flex-col justify-center text-center transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-1 hover:shadow-xl md:w-80 md:h-[210px] sm:w-80 sm:h-[210px] sm:p-4"
        />

        {/* Certifications */}
        <TileLink
          href="/certifications"
          label="All Certifications"
          imageSrc={certification}
          imageAlt="Professional certificates icon"
          imageWidth={125}
          imageHeight={125}
          className="w-[400px] h-[270px] rounded-2xl bg-white/65 flex flex-col justify-center text-center transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-1 hover:shadow-xl md:w-80 md:h-[210px] sm:w-80 sm:h-[210px] sm:p-4"
        />

        {/* WordPress & Other Projects */}
        <TileLink
          href="/otherprojects"
          label="Wordpress & other Projects"
          imageSrc={wordpress}
          imageAlt="WordPress logo"
          imageWidth={125}
          imageHeight={125}
          className="w-[400px] h-[270px] rounded-2xl bg-white/65 flex flex-col justify-center text-center transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-1 hover:shadow-xl md:w-80 md:h-[210px] sm:w-80 sm:h-[210px] sm:p-4"
        />

        {/* Social Media - LinkedIn & GitHub */}
        <TileLink
          href={process.env.NEXT_PUBLIC_LINKEDIN_URL || '#'}
          label="LinkedIn"
          imageSrc={linkedin}
          imageAlt="LinkedIn logo"
          imageWidth={95}
          imageHeight={95}
          className="w-[190px] h-[270px] flex flex-col justify-center text-center bg-white/65 rounded-2xl transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-1 hover:shadow-xl md:w-[150px] md:h-[210px] sm:w-[calc(50%-0.5rem)] sm:min-w-[140px] sm:h-[210px]"
          external={true}
        />

        <TileLink
          href={process.env.NEXT_PUBLIC_GITHUB_URL || '#'}
          label="Github"
          imageSrc={github}
          imageAlt="GitHub logo"
          imageWidth={95}
          imageHeight={95}
          className="w-[190px] h-[270px] flex flex-col justify-center text-center bg-white/65 rounded-2xl transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-1 hover:shadow-xl md:w-[150px] md:h-[210px] sm:w-[calc(50%-0.5rem)] sm:min-w-[140px] sm:h-[210px]"
          external={true}
        />

        {/* Contact & Social - 2x2 Grid */}
        <div className="flex flex-wrap gap-4 w-[400px] md:w-80 sm:w-80">
          <TileLink
            href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
            label="E-Mail"
            imageSrc={envelope}
            imageAlt="Email icon"
            imageWidth={65}
            imageHeight={65}
            className="w-[190px] h-[128px] bg-white/65 rounded-2xl flex flex-col justify-center text-center transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-1 hover:shadow-xl md:w-[150px] md:h-[99px] sm:w-[calc(50%-0.5rem)] sm:min-w-[140px] sm:h-[99px]"
            external={true}
          />

          <TileLink
            href={`tel:${process.env.NEXT_PUBLIC_PHONE}`}
            label="Phone"
            imageSrc={phone}
            imageAlt="Phone icon"
            imageWidth={65}
            imageHeight={65}
            className="w-[190px] h-[128px] bg-white/65 rounded-2xl flex flex-col justify-center text-center transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-1 hover:shadow-xl md:w-[150px] md:h-[99px] sm:w-[calc(50%-0.5rem)] sm:min-w-[140px] sm:h-[99px]"
            external={true}
          />

          <TileLink
            href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || '#'}
            label="Instagram"
            imageSrc={instagram}
            imageAlt="Instagram logo"
            imageWidth={65}
            imageHeight={65}
            className="w-[190px] h-[128px] bg-white/65 rounded-2xl flex flex-col justify-center text-center transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-1 hover:shadow-xl md:w-[150px] md:h-[99px] sm:w-[calc(50%-0.5rem)] sm:min-w-[140px] sm:h-[99px]"
            external={true}
          />

          <TileLink
            href={process.env.NEXT_PUBLIC_FACEBOOK_URL || '#'}
            label="Facebook"
            imageSrc={facebook}
            imageAlt="Facebook logo"
            imageWidth={65}
            imageHeight={65}
            className="w-[190px] h-[128px] bg-white/65 rounded-2xl flex flex-col justify-center text-center transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-1 hover:shadow-xl md:w-[150px] md:h-[99px] sm:w-[calc(50%-0.5rem)] sm:min-w-[140px] sm:h-[99px]"
            external={true}
          />
        </div>
      </div>
    </main>
  );
}
