import React from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

type props = {
  html?: React.MutableRefObject<HTMLDivElement | null>;
};


const GeneratePdf: React.FC<props> = ({ html }) => {
  const generatePdf = async () => {
    if (!html || !html.current) return; // check if html is defined before using it
    const canvas = await html2canvas(html.current, {  width: html.current.clientWidth, height: html.current.clientHeight  });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF('l', 'pt', 'a4', true);
    pdf.addImage(imgData, "PNG", 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight(), undefined, 'NONE');
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isSafari)
      window.open(pdf.output('bloburl'), '_blank');
    else
      pdf.save("crime.pdf");

  };


  return (
    <div className="button-container">
      <button onClick={generatePdf} className='btn-primary'>Get PDF</button>
    </div>
  );
};

export default GeneratePdf;
