'use client'

import React, { useRef } from "react";
import dynamic from "next/dynamic";
import Report from "@/components/Report";
const GeneratePDF = dynamic(() => import("../../components/GeneratePdf"), { ssr: false });

const PDFPage: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null) as React.MutableRefObject<HTMLDivElement | null>;

  return (
    <div className="main">
      <div className="content" ref={ref}>
        <Report />
      </div>
      <GeneratePDF html={ref} />
    </div>
  );
}

export default PDFPage;
