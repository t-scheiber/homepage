"use client";

import { useEffect, useRef, useState } from "react";
import type { PDFDocumentProxy, RenderTask } from "pdfjs-dist";

type PDFEngine = typeof import("pdfjs-dist/legacy/build/pdf.mjs");
type LoadedPDF = { document: PDFDocumentProxy; engine: PDFEngine };

function PDFPage({
  document,
  engine,
  pageNumber,
  width,
}: LoadedPDF & { pageNumber: number; width: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [aspectRatio, setAspectRatio] = useState(1 / Math.SQRT2);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let render: RenderTask | undefined;
    let text: InstanceType<PDFEngine["TextLayer"]> | undefined;

    async function renderPage() {
      const page = await document.getPage(pageNumber);
      const canvas = canvasRef.current;
      const container = textRef.current;
      if (cancelled || !canvas || !container) return;

      const original = page.getViewport({ scale: 1 });
      const viewport = page.getViewport({ scale: width / original.width });
      // Bound raster memory on high-density screens and at large zoom levels.
      const pixelRatio = Math.min(
        window.devicePixelRatio || 1,
        2,
        Math.sqrt(4_000_000 / (viewport.width * viewport.height)),
      );
      setAspectRatio(viewport.width / viewport.height);
      canvas.width = Math.ceil(viewport.width * pixelRatio);
      canvas.height = Math.ceil(viewport.height * pixelRatio);
      render = page.render({
        canvas,
        viewport,
        transform: [pixelRatio, 0, 0, pixelRatio, 0, 0],
      });
      await render.promise;
      if (cancelled) return;

      container.replaceChildren();
      container.style.setProperty(
        "--total-scale-factor",
        String(viewport.scale),
      );
      text = new engine.TextLayer({
        container,
        viewport,
        textContentSource: page.streamTextContent(),
      });
      await text.render();
      if (!cancelled) setError(false);
    }
    void renderPage().catch(() => {
      if (!cancelled) setError(true);
    });
    return () => {
      cancelled = true;
      render?.cancel();
      text?.cancel();
    };
  }, [document, engine, pageNumber, width]);

  return (
    <section
      className="pdf-page"
      aria-label={`Page ${pageNumber}`}
      style={{ width, aspectRatio }}
    >
      <canvas ref={canvasRef} aria-hidden="true" />
      <div ref={textRef} className="pdf-text-layer" />
      {error && (
        <p className="pdf-page-error" role="alert">
          This page could not be displayed. Use Open PDF to read the document.
        </p>
      )}
    </section>
  );
}

export default function PDFPages({ pdfUrl }: { pdfUrl: string }) {
  const [pdf, setPDF] = useState<LoadedPDF | null>(null);
  const [error, setError] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [width, setWidth] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const measure = () => setWidth(container.clientWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    let task: ReturnType<PDFEngine["getDocument"]> | undefined;

    async function loadPDF() {
      // Load only when opened. The legacy build supports older mobile browsers.
      const engine = await import("pdfjs-dist/legacy/build/pdf.mjs");
      if (cancelled) return;
      engine.GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
        import.meta.url,
      ).toString();
      task = engine.getDocument({ url: pdfUrl });
      const document = await task.promise;
      if (!cancelled) setPDF({ document, engine });
    }
    void loadPDF().catch(() => {
      if (!cancelled) setError(true);
    });
    return () => {
      cancelled = true;
      void task?.destroy();
    };
  }, [pdfUrl]);

  return (
    <>
      <div className="pdf-viewer-toolbar">
        <p aria-live="polite">
          {pdf ? `${pdf.document.numPages} pages` : "PDF preview"}
        </p>
        <div className="pdf-viewer-zoom" role="group" aria-label="PDF zoom">
          <button
            type="button"
            aria-label="Zoom out"
            disabled={!pdf || zoom <= 1}
            onClick={() => setZoom((value) => Math.max(1, value - 0.25))}
          >
            −
          </button>
          <button
            type="button"
            aria-label="Fit PDF to screen width"
            disabled={!pdf}
            onClick={() => setZoom(1)}
          >
            {zoom === 1 ? "Fit width" : `${Math.round(zoom * 100)}%`}
          </button>
          <button
            type="button"
            aria-label="Zoom in"
            disabled={!pdf || zoom >= 3}
            onClick={() => setZoom((value) => Math.min(3, value + 0.25))}
          >
            +
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="pdf-viewer-content"
        tabIndex={0}
        role="region"
        aria-label="PDF document pages"
        aria-busy={!pdf && !error}
      >
        {error ? (
          <p className="pdf-viewer-message" role="alert">
            The preview could not be loaded. Use Open PDF or Download above to
            read the document.
          </p>
        ) : pdf && width > 0 ? (
          <div className="pdf-pages">
            {Array.from({ length: pdf.document.numPages }, (_, index) => (
              <PDFPage
                key={index}
                {...pdf}
                pageNumber={index + 1}
                width={Math.max(1, Math.min(width - 24, 1000)) * zoom}
              />
            ))}
          </div>
        ) : (
          <p className="pdf-viewer-message" role="status">
            Loading PDF…
          </p>
        )}
      </div>
    </>
  );
}
