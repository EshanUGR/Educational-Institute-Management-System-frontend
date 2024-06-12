import { Button } from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";

const PdfReport = ({ data, fileName }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Set document header
    doc.setFontSize(18);
    doc.text(`Exam Notices Report`, 14, 20);

    // Set table properties
    const tableProps = {
      startY: 30,
      margin: { horizontal: 14 },
    };

    // Generate table data
    const tableData = data.map((item) => [
      item.Description,
      item.Date,
      item.Time,
    ]);

    // Add table to the document
    doc.autoTable({
      head: [["Description", "Date", "Time"]],
      body: tableData,
      ...tableProps,
    });

    // Add footer with page number
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(
        `Page ${i} of ${pageCount}`,
        doc.internal.pageSize.width - 20,
        doc.internal.pageSize.height - 10
      );
    }

    // Save the PDF file
    doc.save(`${fileName}.pdf`);
  };

  return (
    <Button variant="contained" onClick={generatePDF}>
      Export to PDF
    </Button>
  );
};

export default PdfReport;
