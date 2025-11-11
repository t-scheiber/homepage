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
    "group relative flex w-full h-full cursor-pointer flex-col items-center justify-center gap-[0.5vh] rounded-2xl border-none bg-white/60 p-[1vh] text-center text-white shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-md transition-all duration-300 ease-in-out hover:bg-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:p-[clamp(0.75rem,1.5vh,1.25rem)] sm:gap-[clamp(0.25rem,0.75vh,0.5rem)]";

  return (
    <main className="mx-auto flex h-full w-full flex-col items-center justify-center px-[1.5vw] py-[4vh] sm:px-6 sm:py-[clamp(1.5rem,4vh,3rem)] relative">
      <div className="flex flex-col items-center w-full max-w-[min(95vw,1050px)] 4k:max-w-[min(95vw,1600px)]">
        <header className="flex flex-col items-center text-center text-white mb-[3vh] sm:mb-[clamp(1.5rem,3vh,2rem)] absolute top-[4vh] sm:top-[clamp(1.5rem,4vh,3rem)]">
          <h1 className="text-[2.5vw] font-normal tracking-normal leading-tight sm:text-[clamp(2.25rem,4.5vw,3.5rem)]">
            Thomas Scheiber
          </h1>
        </header>

        <section className="grid w-full grid-cols-1 gap-[clamp(0.875rem,1.75vw,1.5rem)] lg:grid-cols-4 lg:grid-rows-[repeat(2,minmax(0,1fr))_repeat(2,minmax(0,0.5fr))] lg:gap-[0.9vw] lg:max-h-[65vh]">
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
              className="h-[8vh] w-[8vh] rounded-full object-cover shadow-lg flex-shrink-0 aspect-square sm:h-[clamp(4rem,10vh,8rem)] sm:w-[clamp(4rem,10vh,8rem)]"
              src={portrait}
              alt="Thomas Scheiber portrait photo"
              width={145}
              height={145}
              priority
            />
            <p className="text-[1.5vw] font-light tracking-wide leading-normal sm:text-[clamp(1.375rem,2.75vw,1.875rem)]">
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
            imageClassName="w-[clamp(6rem,15vw,12rem)] max-w-full lg:w-[10vw]"
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
            imageClassName="h-[clamp(4rem,10vh,9rem)] w-[clamp(4rem,10vh,9rem)] lg:h-[8vh] lg:w-[8vh]"
          />

          <TileLink
            href="/otherprojects"
            label="Wordpress & other Projects"
            imageSrc={wordpress}
            imageAlt="WordPress logo"
            imageWidth={125}
            imageHeight={125}
            className="col-span-1 w-full lg:col-span-2"
            imageClassName="h-[clamp(4rem,10vh,9rem)] w-[clamp(4rem,10vh,9rem)] lg:h-[8vh] lg:w-[8vh]"
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
            imageClassName="h-[clamp(2.5rem,6vh,6rem)] w-[clamp(2.5rem,6vh,6rem)] lg:h-[5vh] lg:w-[5vh]"
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
            imageClassName="h-[clamp(2.5rem,6vh,6rem)] w-[clamp(2.5rem,6vh,6rem)] lg:h-[5vh] lg:w-[5vh]"
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
            imageClassName="h-[clamp(2rem,4vh,4rem)] w-[clamp(2rem,4vh,4rem)] lg:h-[3.5vh] lg:w-[3.5vh]"
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
            imageClassName="h-[clamp(2rem,4vh,4rem)] w-[clamp(2rem,4vh,4rem)] lg:h-[3.5vh] lg:w-[3.5vh]"
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
            imageClassName="h-[clamp(2rem,4vh,4rem)] w-[clamp(2rem,4vh,4rem)] lg:h-[3.5vh] lg:w-[3.5vh]"
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
            imageClassName="h-[clamp(2rem,4vh,4rem)] w-[clamp(2rem,4vh,4rem)] lg:h-[3.5vh] lg:w-[3.5vh]"
            external={true}
          />
        </section>
      </div>
    </main>
  );
}
