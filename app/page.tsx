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
    <main className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center justify-start px-4 py-10 sm:px-6 sm:py-12 lg:px-10">
      <div className="flex w-full flex-col items-center gap-6 lg:gap-8">
        <header className="w-full text-center text-white">
          <h1 className="text-[clamp(2.25rem,6vw,3.5rem)] font-thin tracking-normal leading-tight">
            Thomas Scheiber
          </h1>
        </header>

        <section className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(170px,1fr)]">
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
              className="h-24 w-24 shrink-0 rounded-full object-cover shadow-lg sm:h-28 sm:w-28"
              src={portrait}
              alt="Thomas Scheiber portrait photo"
              width={145}
              height={145}
              priority
            />
            <p className="mt-4 text-lg font-medium tracking-wide text-slate-900 sm:text-xl">
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
            imageClassName="h-28 w-auto max-w-[11rem] sm:h-32"
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
            imageClassName="h-20 w-20 sm:h-24 sm:w-24"
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
            imageClassName="h-20 w-20 sm:h-24 sm:w-24"
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
            imageClassName="h-14 w-14 sm:h-16 sm:w-16"
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
            imageClassName="h-14 w-14 sm:h-16 sm:w-16"
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
            imageClassName="h-12 w-12 sm:h-14 sm:w-14"
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
            imageClassName="h-12 w-12 sm:h-14 sm:w-14"
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
            imageClassName="h-12 w-12 sm:h-14 sm:w-14"
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
            imageClassName="h-12 w-12 sm:h-14 sm:w-14"
            textMargin={TEXT_MARGIN.reduced}
            external={true}
          />
        </section>
      </div>
    </main>
  );
}
