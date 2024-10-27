"use client";

import { pdfjs, Document, Page } from "react-pdf";
import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import Image from "next/image";
import Logo from "../../../images/logo.png";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfModalProps {
  pdfFile: string;
  onClose: () => void;
}

const PdfModal: React.FC<PdfModalProps> = ({ pdfFile, onClose }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageWidth, setPageWidth] = useState<number>(1000);

  useEffect(() => {
    const updatePageWidth = () => {
      const modalWidth = Math.min(window.innerWidth * 0.9, 1000);
      setPageWidth(modalWidth);
    };
    updatePageWidth();
    window.addEventListener("resize", updatePageWidth);
    return () => window.removeEventListener("resize", updatePageWidth);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const LoadingComponent = (
    <div className="bigger-container relative flex flex-col h-[500px] justify-center items-center aligns-center">
      <div className="relative duration-500 flex justify-center items-center">
        <div className="w-[100px] h-[100px] rounded-full border-t-4 border-b-4 border-logoGray animate-spin-slow"></div>
        <div className="absolute">
          <Image src={Logo} alt="omg-logo" className="w-[70px] h-auto" />
        </div>
      </div>
      <div className="flex mt-6 text-logoGray">
        <p>Loading...</p>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 mt-20 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm">
      <div className="relative w-full h-full max-w-screen-xl max-h-[90vh] bg-white rounded-lg overflow-hidden shadow-lg">
        <button
          className="absolute top-4 z-50 right-4 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          <FaTimes color="red" size={24} />
        </button>
        <div className="w-full h-full overflow-y-auto p-6 m-6 flex justify-center">
          <Document
            file={pdfFile}
            onLoadSuccess={onDocumentLoadSuccess}
            error="Failed to load PDF."
            loading={LoadingComponent}
            className="w-full flex flex-col items-center"
          >
            {Array.from(new Array(numPages), (_, index) => (
              <div key={`page_${index + 1}`} className="mb-10">
                <Page
                  pageNumber={index + 1}
                  width={pageWidth} 
                  renderTextLayer={false}
                  renderAnnotationLayer={false} 
                  className="shadow-md"
                />
              </div>
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
};

export default PdfModal;
