import React, {useState} from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

function PDFDownloadButton({contentRefs, repaymentSchedule}) {

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = contentRefs.length;

    const downloadAmortization= async () => {
        const pdf = new jsPDF();
        const width = pdf.internal.pageSize.getWidth();
        const height = pdf.internal.pageSize.getHeight();
        
        for(let i = 0; i < totalPages; i++)
        {
            await html2canvas(contentRefs[i].current).then(canvas => {
                const imgData = canvas.toDataURL('image/png');            
                pdf.addImage(imgData, 'PNG', 0, 0, width, height);
                pdf.rect(0, 0, width, height, 'S');
                if(i < totalPages - 1)
                {
                    pdf.addPage();
                }            
            });
        }
        pdf.save(`amortization_chart.pdf`);
        //return pdf;
    };
    const downloadRepaymentPDF = () => {
        const doc = new jsPDF();
        const tableRows = [];
        const headerRow = ['Payment Number', 'Payment Date', 'Principal Amount', 'Interest Amount', 'Total Amount', 'Total Payment', 'Remaining Balance'];
    
        // Push header row
        tableRows.push(headerRow);
    
        // Push data rows
        repaymentSchedule.forEach(payment => {
          const rowData = [
            payment.number,
            payment.paymentDate.toDateString(),
            payment.principal.toFixed(2),
            payment.interest.toFixed(2),
            (payment.principal + payment.interest).toFixed(2),
            payment.totalPayment.toFixed(2),
            payment.remainingBalance.toFixed(2)
          ];
          tableRows.push(rowData);
        });
    
        // Set table styling
        const tableProps = {
          startY: 20,
          styles: { halign: 'center' },
        };
    
        // Add table to PDF
        doc.autoTable({ head: tableRows.slice(0, 1), body: tableRows.slice(1), ...tableProps });
    
        // Save PDF
        doc.save('repayment_schedule.pdf');
        //return doc;
      };
    
    const downloadExcel = () => {
       const ws = XLSX.utils.json_to_sheet(repaymentSchedule);
       const wb = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Repayment Schedule');
       XLSX.writeFile(wb, 'repayment_schedule.xlsx');
    };

    // function mergePDFs(pdf1, pdf2) {
    //     const mergedPDF = new jsPDF();
    //     mergedPDF.addDocument(pdf1);
    //     mergedPDF.addDocument(pdf2);

    //     // const addPagesToMergedPDF = async (pdf) => {
    //     //     const totalPages = pdf.internal.pages.length;
    //     //     for (let i = 1; i <= totalPages; i++) {
    //     //       const pageData = pdf.internal.pages[i];
    //     //       const canvas = await html2canvas(pdf.internal.pages[i], { scale: 1 });
    //     //       const imgData = canvas.toDataURL('image/png');
    //     //       mergedPDF.addImage(imgData, 'PNG', 0, 0, pageData.width, pageData.height);
    //     //       if (i < totalPages) {
    //     //         mergedPDF.addPage();
    //     //       }
    //     //     }
    //     //   };
    //     //   addPagesToMergedPDF(pdf1);
    //     //   addPagesToMergedPDF(pdf2);

    //     return mergedPDF;
    //   }
      
    // const handleMergeAndDownloadPDF = async () => {
    //     // Generate amortization chart PDF
    //     const amortizationPDF = await downloadAmortization();
    
    //     // Generate repayment schedule PDF
    //     const repaymentPDF = await downloadRepaymentPDF();    

    //     const mergedPDF = mergePDFs(amortizationPDF, repaymentPDF);
    //     mergedPDF.save('merged.pdf');
    //   };

    

    return (
        <>
        <button className = "download-button" onClick={downloadAmortization}>Download Amortization chart</button><br></br>
        <button className = "download-button" onClick={downloadExcel}>Download Repayment Schedule Excel</button><br></br>
        <button className = "download-button" onClick={downloadRepaymentPDF}>Download Repayment Schedule PDF</button>
        {/* <button onClick={handleMergeAndDownloadPDF}>Download Merged Pdf</button>   */}
        </>
    );
}

export default PDFDownloadButton
