"use client";

import { useEffect, useCallback } from "react";

interface PDFViewerProps {
  pdfUrl: string;
  fileName?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function PDFViewer({ pdfUrl, fileName = 'document.pdf', isOpen, onClose }: PDFViewerProps) {
  const isClient = typeof window !== "undefined";

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    },
    [isOpen, onClose]
  );

  useEffect(() => {
    // Prevent body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [handleEscape]);

  if (!isOpen || !isClient) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/85 flex items-center justify-center z-[9999] p-4 animate-fadeIn md:p-0" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdf-viewer-title"
    >
      <div 
        className="bg-white rounded-2xl w-full max-w-[1200px] h-[90vh] flex flex-col shadow-[0_20px_60px_rgba(0,0,0,0.5)] animate-slideUp overflow-hidden md:max-w-full md:h-screen md:rounded-none" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gray-50 md:p-4 md:flex-wrap">
          <h2 id="pdf-viewer-title" className="text-xl font-semibold text-gray-900 m-0 flex-1 md:text-base md:w-full md:mb-2">
            {fileName}
          </h2>
          <div className="flex gap-3 items-center md:w-full md:justify-end">
            <a
              href={pdfUrl}
              download={fileName}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-500 !text-white border-none rounded-lg cursor-pointer text-[0.95rem] font-medium no-underline transition-all duration-200 hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(59,130,246,0.4)] active:translate-y-0 md:text-sm md:px-4 md:py-2"
              aria-label="Download PDF"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download
            </a>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-10 h-10 bg-gray-100 text-gray-500 border-none rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-200 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 md:w-9 md:h-9"
              aria-label="Close PDF viewer"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex-1 relative overflow-hidden bg-gray-100">
          <iframe
            src={`${pdfUrl}#view=FitH`}
            className="w-full h-full border-none bg-white"
            title={fileName}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
