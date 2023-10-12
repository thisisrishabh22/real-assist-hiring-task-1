'use client'

import React, { useEffect, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { ApiResponse } from "@/types/CrimeTypes";
import Loader from "@/components/Loader";
import dynamic from "next/dynamic";
const Report = dynamic(() => import('@/components/Report'), { ssr: true });


const PDFPage: React.FC = () => {
  // Ref to the EL that contains the report
  const ref = useRef<HTMLDivElement>(null);
  // State for the crime data from API
  const [crimeData, setCrimeData] = useState<ApiResponse | null>(null);
  // State for the download status
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    // Fetch the crime data from the API
    const fetchData = async () => {
      const res = await fetch('/api/crime', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      if (data)
        setCrimeData(data);
    }

    fetchData();

    // Cleanup
    return () => {
      setDownloaded(false);
      setCrimeData(null);
    }
  }, []);

  useEffect(() => {

    // Ensure that the crime data is present
    if (!crimeData) return;

    const generatePdf = async () => {
      if (downloaded || !ref.current || !crimeData) return;
      setDownloaded(true);

      const imageWidth = ref.current.clientWidth;
      const imageHeight = ref.current.clientHeight;

      let dimensions = [297, 210];
      const pdfOrientation = imageWidth >= imageHeight ? 'landscape' : 'portrait';

      let pageWidth, pageHeight;

      if (pdfOrientation === 'landscape') {
        pageWidth = dimensions[0];
        pageHeight = dimensions[1]
      } else {
        pageWidth = dimensions[1];
        // A4 paper is 1.414 times longer than wide
        pageHeight = dimensions[0] / 1.414;
        dimensions = [pageWidth, pageHeight];
      }

      const canvas = await html2canvas(ref.current, { width: imageWidth, height: imageHeight });
      const imgData = canvas.toDataURL("image/png", 1.0);
      const pdf = new jsPDF('landscape', 'mm', dimensions);
      pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight, undefined, 'NONE');

      // Check if the browser is Safari using user agent
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

      // If it is Safari, open a new window to display PDF because Safari doesn't support downloading PDF files
      if (isSafari) {
        window.open(pdf.output('bloburl'), '_blank');
      } else {
        pdf.save("crime.pdf");
      }

      // Redirect only if the download was successful
      window.location.href = '/' + '?downloaded=true';
    };

    // Wait for the page to render before generating the PDF
    setTimeout(() => {
      generatePdf();
    }, 200);

  }, [crimeData, downloaded]);

  return (
    <>
      <Loader />
      {/* Opacity is none since displaying the rendered PDF is not ideal */}
      <div className="main opacity-0">
        <div className="content" ref={ref}>
          <Report crimeData={crimeData} />
        </div>
      </div>
    </>
  );
}

export default PDFPage;

