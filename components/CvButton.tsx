"use client";

import { useCallback, useState } from "react";
import PDFViewer from "@/components/PDFViewer";

export default function CvButton() {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  return (
    <>
      <button
        type="button"
        onClick={open}
        className="home-cv-action"
        aria-label="View CV"
        aria-haspopup="dialog"
        aria-describedby="cv-description"
      >
        View CV
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M14 3H5v18h14V8l-5-5Z" />
          <path d="M14 3v5h5M8 12h8M8 16h6" />
        </svg>
      </button>
      <PDFViewer
        pdfUrl="/files/pdf/ScheiberThomasCV.pdf"
        fileName="ScheiberThomasCV.pdf"
        title="Curriculum vitae"
        isOpen={isOpen}
        onClose={close}
      />
    </>
  );
}
