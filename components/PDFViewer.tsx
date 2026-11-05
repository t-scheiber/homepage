"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import PDFPages from "@/components/PDFPages";

interface PDFViewerProps {
  pdfUrl: string;
  fileName?: string;
  title?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function PDFViewer({
  pdfUrl,
  fileName = "document.pdf",
  title = fileName,
  isOpen,
  onClose,
}: PDFViewerProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen || !dialog) return;

    const previousFocus = document.activeElement;
    const { scrollX, scrollY } = window;
    const body = document.body;
    const previousStyle = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      width: body.style.width,
    };
    // A fixed body also prevents background scrolling in mobile Safari.
    Object.assign(body.style, {
      overflow: "hidden",
      position: "fixed",
      top: `-${scrollY}px`,
      left: `-${scrollX}px`,
      width: "100%",
    });
    const background = Array.from(body.children)
      .filter(
        (element): element is HTMLElement =>
          element !== dialog && element instanceof HTMLElement,
      )
      .map((element) => {
        const inert = element.inert;
        element.inert = true;
        return { element, inert };
      });
    closeRef.current?.focus();

    const keepFocusInDialog = (event: FocusEvent) => {
      if (!dialog.contains(event.target as Node)) closeRef.current?.focus();
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;
      const controls = dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not(:disabled), [tabindex="0"]',
      );
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("focusin", keepFocusInDialog);
    window.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("focusin", keepFocusInDialog);
      window.removeEventListener("keydown", handleKey);
      background.forEach(({ element, inert }) => {
        element.inert = inert;
      });
      Object.assign(body.style, previousStyle);
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
      window.scrollTo({ left: scrollX, top: scrollY, behavior: "instant" });
    };
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={dialogRef}
      className="pdf-viewer-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdf-viewer-title"
    >
      <div className="pdf-viewer">
        <header className="pdf-viewer-header">
          <h2 id="pdf-viewer-title" title={title}>
            {title}
          </h2>
          <div className="pdf-viewer-actions">
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
              Open PDF <span className="sr-only">(opens in a new tab)</span>
            </a>
            <a
              href={pdfUrl}
              download={fileName}
              className="pdf-viewer-download"
              aria-label="Download PDF"
            >
              Download
            </a>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="pdf-viewer-close"
              aria-label="Close PDF viewer"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
          </div>
        </header>
        <PDFPages key={pdfUrl} pdfUrl={pdfUrl} />
      </div>
    </div>,
    document.body,
  );
}
