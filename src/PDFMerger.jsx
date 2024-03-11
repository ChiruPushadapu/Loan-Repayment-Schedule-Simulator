// PDFMerger.js
import jsPDF from 'jspdf';

function mergePDFs(pdf1, pdf2) {
  const mergedPDF = new jsPDF();
  
  // Append pages from PDF 1
  const totalPages1 = pdf1.internal.getNumberOfPages();
  for (let page = 1; page <= totalPages1; page++) {
    const pdfData = pdf1.internal.getPageData(page);
    mergedPDF.addPage(pdfData);
  }
  
  // Append pages from PDF 2
  const totalPages2 = pdf2.internal.getNumberOfPages();
  for (let page = 1; page <= totalPages2; page++) {
    const pdfData = pdf2.internal.getPageData(page);
    mergedPDF.addPage(pdfData);
  }
  
  return mergedPDF;
}

export default mergePDFs;
