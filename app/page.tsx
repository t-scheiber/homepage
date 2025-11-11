"use client";

import { useState } from "react";
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

  const tileButtonClass =
    "group relative flex w-full h-full cursor-pointer flex-col items-center justify-center gap-[0.5vh] rounded-2xl border-none bg-white/60 p-[1vh] text-center text-white shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-md transition-all duration-300 ease-in-out hover:bg-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:p-[1vh] sm:gap-[0.5vh]";

  return (
    <main className="mx-auto flex h-full w-full flex-col items-center justify-center px-[1.5vw] py-[4vh] sm:px-[1.5vw] sm:py-[4vh] relative">
      <div className="flex flex-col items-center w-full max-w-[min(95vw,1050px)] 4k:max-w-[min(95vw,1600px)]">
        <header className="flex flex-col items-center text-center text-white mb-[3vh] sm:mb-[3vh] absolute top-[4vh] sm:top-[4vh]">
          <h1 className="text-[2.5vw] font-normal tracking-normal leading-tight sm:text-[4.5vw]">
            Thomas Scheiber
          </h1>
        </header>

        <section className="grid w-full grid-cols-1 gap-[1.75vw] lg:grid-cols-4 lg:grid-rows-[repeat(2,minmax(0,1fr))_repeat(2,minmax(0,0.5fr))] lg:gap-[0.9vw] lg:max-h-[65vh]">
          <PDFViewer
            pdfUrl="/files/pdf/ScheiberThomasCV.pdf"
            fileName="ScheiberThomasCV.pdf"
            isOpen={isPDFViewerOpen}
            onClose={() => setIsPDFViewerOpen(false)}
          />

          {/* Row 1: CV (left, spans 2 cols) | Coding Projects (right, spans 2 cols) */}
          <button
            type="button"
            onClick={() => setIsPDFViewerOpen(true)}
            className={`${tileButtonClass} col-span-1 w-full lg:col-span-2`}
            aria-label="View CV"
          >
            <Image
              className="h-[8vh] w-[8vh] rounded-full object-cover shadow-lg shrink-0 aspect-square sm:h-[10vh] sm:w-[10vh]"
              src={portrait}
              alt="Thomas Scheiber portrait photo"
              width={145}
              height={145}
              priority
            />
            <p className="text-[1.5vw] font-light tracking-wide leading-normal sm:text-[2.75vw]">
              CV
            </p>
          </button>

          <TileLink
            href="/codingprojects"
            label="Coding Projects"
            imageSrc={coding}
            imageAlt="Programming code illustration"
            imageWidth={240}
            imageHeight={160}
            priority
            className="col-span-1 w-full lg:col-span-2"
            imageClassName="w-[15vw] max-w-full lg:w-[10vw]"
          />

          {/* Row 2: Certifications (left, spans 2 cols) | WordPress (right, spans 2 cols) */}
          <TileLink
            href="/certifications"
            label="All Certifications"
            imageSrc={certification}
            imageAlt="Professional certificates icon"
            imageWidth={125}
            imageHeight={125}
            className="col-span-1 w-full lg:col-span-2"
            imageClassName="h-[10vh] w-[10vh] lg:h-[8vh] lg:w-[8vh]"
          />

          <TileLink
            href="/otherprojects"
            label="Wordpress & other Projects"
            imageSrc={wordpress}
            imageAlt="WordPress logo"
            imageWidth={125}
            imageHeight={125}
            className="col-span-1 w-full lg:col-span-2"
            imageClassName="h-[10vh] w-[10vh] lg:h-[8vh] lg:w-[8vh]"
          />

          {/* Row 3-4: LinkedIn (col 1, spans 2 rows) | GitHub (col 2, spans 2 rows) | E-Mail (col 3, row 3) | Phone (col 4, row 3) */}
          <TileLink
            href={process.env.NEXT_PUBLIC_LINKEDIN_URL || "#"}
            label="LinkedIn"
            imageSrc={linkedin}
            imageAlt="LinkedIn logo"
            imageWidth={95}
            imageHeight={95}
            className="col-span-1 w-full lg:row-span-2"
            imageClassName="h-[6vh] w-[6vh] lg:h-[5vh] lg:w-[5vh]"
            external={true}
          />

          <TileLink
            href={process.env.NEXT_PUBLIC_GITHUB_URL || "#"}
            label="Github"
            imageSrc={github}
            imageAlt="GitHub logo"
            imageWidth={95}
            imageHeight={95}
            className="col-span-1 w-full lg:row-span-2"
            imageClassName="h-[6vh] w-[6vh] lg:h-[5vh] lg:w-[5vh]"
            external={true}
          />

          <TileLink
            href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
            label="E-Mail"
            imageSrc={envelope}
            imageAlt="Email icon"
            imageWidth={65}
            imageHeight={65}
            className="col-span-1 w-full"
            imageClassName="h-[4vh] w-[4vh] lg:h-[3.5vh] lg:w-[3.5vh]"
            external={true}
          />

          <TileLink
            href={`tel:${process.env.NEXT_PUBLIC_PHONE}`}
            label="Phone"
            imageSrc={phone}
            imageAlt="Phone icon"
            imageWidth={65}
            imageHeight={65}
            className="col-span-1 w-full"
            imageClassName="h-[4vh] w-[4vh] lg:h-[3.5vh] lg:w-[3.5vh]"
            external={true}
          />

          {/* Row 4: Instagram (col 3) | Facebook (col 4) - half height */}
          <TileLink
            href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#"}
            label="Instagram"
            imageSrc={instagram}
            imageAlt="Instagram logo"
            imageWidth={65}
            imageHeight={65}
            className="col-span-1 w-full"
            imageClassName="h-[4vh] w-[4vh] lg:h-[3.5vh] lg:w-[3.5vh]"
            external={true}
          />

          <TileLink
            href={process.env.NEXT_PUBLIC_FACEBOOK_URL || "#"}
            label="Facebook"
            imageSrc={facebook}
            imageAlt="Facebook logo"
            imageWidth={65}
            imageHeight={65}
            className="col-span-1 w-full"
            imageClassName="h-[4vh] w-[4vh] lg:h-[3.5vh] lg:w-[3.5vh]"
            external={true}
          />
        </section>
      </div>
    </main>
  );
}
