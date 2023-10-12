'use client'

import React, { useEffect, useRef, useState } from "react";
import Report from "@/components/Report";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { ApiResponse } from "@/types/CrimeTypes";

const PDFPage: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null) as React.MutableRefObject<HTMLDivElement | null>;
  const [crimeData, setCrimeData] = useState<ApiResponse | null>(null);

  useEffect(() => {
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

  }, []);

  useEffect(() => {

    const generatePdf = async () => {
      if (!ref || !ref.current) return; // check if html is defined before using it
      const canvas = await html2canvas(ref.current, { width: ref.current.clientWidth, height: ref.current.clientHeight });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF('l', 'pt', 'a4', true);
      pdf.addImage(imgData, "PNG", 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight(), undefined, 'NONE');
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      if (isSafari)
        window.open(pdf.output('bloburl'), '_blank');
      else
        pdf.save("crime.pdf");

      window.open('/', '_self')
  
    };

    if (crimeData)
      setTimeout(() => {
        generatePdf();
      }, 100);

  }, [crimeData]);

  return (
    <div className="main">
      <div className="content" ref={ref}>
        <Report crimeData={crimeData} />
      </div>
    </div>
  );
}

export default PDFPage;
