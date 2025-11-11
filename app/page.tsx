"use client";

import { useState, useCallback, useMemo } from "react";
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
import { SOCIAL_LINKS, TILE_BUTTON_CLASS, TEXT_MARGIN } from "@/lib/constants";

const CV_PDF_URL = "/files/pdf/ScheiberThomasCV.pdf";
const CV_FILE_NAME = "ScheiberThomasCV.pdf";

export default function Home() {
  const [isPDFViewerOpen, setIsPDFViewerOpen] = useState(false);

  const handleOpenPDF = useCallback(() => {
    setIsPDFViewerOpen(true);
  }, []);

  const handleClosePDF = useCallback(() => {
    setIsPDFViewerOpen(false);
  }, []);

  const emailHref = useMemo(
    () => (SOCIAL_LINKS.email ? `mailto:${SOCIAL_LINKS.email}` : "#"),
    []
  );

  const phoneHref = useMemo(
    () => (SOCIAL_LINKS.phone ? `tel:${SOCIAL_LINKS.phone}` : "#"),
    []
  );

  return (
    <main className="mx-auto flex h-full w-full flex-col items-center justify-center px-[1.5vw] py-[4vh] sm:px-[1.5vw] sm:py-[4vh] relative">
      <div className="flex flex-col items-center w-full max-w-[min(95vw,1050px)] 4k:max-w-[min(95vw,1600px)]">
        <header className="flex flex-col items-center text-center text-white mb-[3vh] sm:mb-[3vh] absolute top-[4vh] sm:top-[4vh]">
          <h1 className="text-[2.6vw] font-thin tracking-normal leading-tight sm:text-[3.25vw]">
            Thomas Scheiber
          </h1>
        </header>

        <section className="grid w-full grid-cols-1 gap-[1.75vw] lg:grid-cols-4 lg:grid-rows-[repeat(2,minmax(0,1fr))_repeat(2,minmax(0,0.5fr))] lg:gap-[0.9vw] lg:max-h-[65vh]">
          <PDFViewer
            pdfUrl={CV_PDF_URL}
            fileName={CV_FILE_NAME}
            isOpen={isPDFViewerOpen}
            onClose={handleClosePDF}
          />

          {/* Row 1: CV (left, spans 2 cols) | Coding Projects (right, spans 2 cols) */}
          <button
            type="button"
            onClick={handleOpenPDF}
            className={`${TILE_BUTTON_CLASS} col-span-1 w-full lg:col-span-2`}
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
            <p className="text-[0.9vw] font-light tracking-wide leading-normal sm:text-[1.6vw]">
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
            imageClassName="w-[14vw] max-w-full lg:w-[9.5vw]"
            textMargin={TEXT_MARGIN.reduced}
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
            textMargin={TEXT_MARGIN.reduced}
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
            href={SOCIAL_LINKS.linkedin}
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
            href={SOCIAL_LINKS.github}
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
            href={emailHref}
            label="E-Mail"
            imageSrc={envelope}
            imageAlt="Email icon"
            imageWidth={65}
            imageHeight={65}
            className="col-span-1 w-full"
            imageClassName="h-[4vh] w-[4vh] lg:h-[3.5vh] lg:w-[3.5vh]"
            textMargin={TEXT_MARGIN.reduced}
            external={true}
          />

          <TileLink
            href={phoneHref}
            label="Phone"
            imageSrc={phone}
            imageAlt="Phone icon"
            imageWidth={65}
            imageHeight={65}
            className="col-span-1 w-full"
            imageClassName="h-[4vh] w-[4vh] lg:h-[3.5vh] lg:w-[3.5vh]"
            textMargin={TEXT_MARGIN.reduced}
            external={true}
          />

          {/* Row 4: Instagram (col 3) | Facebook (col 4) - half height */}
          <TileLink
            href={SOCIAL_LINKS.instagram}
            label="Instagram"
            imageSrc={instagram}
            imageAlt="Instagram logo"
            imageWidth={65}
            imageHeight={65}
            className="col-span-1 w-full"
            imageClassName="h-[4vh] w-[4vh] lg:h-[3.5vh] lg:w-[3.5vh]"
            textMargin={TEXT_MARGIN.reduced}
            external={true}
          />

          <TileLink
            href={SOCIAL_LINKS.facebook}
            label="Facebook"
            imageSrc={facebook}
            imageAlt="Facebook logo"
            imageWidth={65}
            imageHeight={65}
            className="col-span-1 w-full"
            imageClassName="h-[4vh] w-[4vh] lg:h-[3.5vh] lg:w-[3.5vh]"
            textMargin={TEXT_MARGIN.reduced}
            external={true}
          />
        </section>
      </div>
    </main>
  );
}
