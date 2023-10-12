'use client'

import React, { useEffect, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { ApiResponse } from "@/types/CrimeTypes";
import Loader from "@/components/Loader";
import dynamic from "next/dynamic";
const Report = dynamic(() => import('@/components/Report'), { ssr: true });


const PDFPage: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
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

    if (!crimeData) return;

    const generatePdf = async () => {
      if (!ref.current || !crimeData) return;

      const canvas = await html2canvas(ref.current, { width: ref.current.clientWidth, height: ref.current.clientHeight });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF('l', 'pt', 'a4', true);
      pdf.addImage(imgData, "PNG", 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight(), undefined, 'FAST');
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

      if (isSafari) {
        window.open(pdf.output('bloburl'), '_blank');
      } else {
        pdf.save("crime.pdf");
      }

      // Redirect only if the download was successful
      window.location.href = '/';
    };

    setTimeout(() => {
    generatePdf();
    }, 200);

  }, [crimeData]);

  return (
    <>
      <Loader />
      <div className="main opacity-0">
        <div className="content" ref={ref}>
          <Report crimeData={crimeData} />
        </div>
      </div>
    </>
  );
}

export default PDFPage;

