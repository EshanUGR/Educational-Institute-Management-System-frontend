import React from "react";
import { Button } from "@mui/material"; // Importing Button component from Material-UI
import jsPDF from "jspdf"; // Importing jsPDF library for PDF generation
import "jspdf-autotable"; // Importing jspdf-autotable plugin for table creation in PDF

// PdfFeedback component that generates a PDF report
const PdfFeedback = ({ data, fileName }) => {
  // Function to generate the PDF report
  const generatePDF = () => {
    const doc = new jsPDF(); // Create a new instance of jsPDF

    // Set document header
    doc.setFontSize(18);
    doc.setTextColor("#1976d2"); // Custom text color
    doc.text(`Exam Feedback Report`, 14, 20); // Title of the document

    // Set table properties
    const tableProps = {
      startY: 30, // Starting Y position of the table
      margin: { horizontal: 14 }, // Margin for the table
    };

    // Generate table data from the provided data array
    const tableData = data.map((item) => [item.Feedback, item.Rate]);

    // Add table to the document with custom styles
    doc.autoTable({
      head: [["Feedback", "Rate"]], // Table header with column names
      body: tableData, // Table data
      ...tableProps,
      theme: "striped", // Use striped theme for the table
      styles: { textColor: "#1976d2", fontStyle: "bold" }, // Custom table styles
    });

    // Add footer with page number to each page
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i); // Set the current page
      doc.setFontSize(10); // Set font size for footer
      doc.setTextColor("#1976d2"); // Custom text color
      doc.text(
        `Page ${i} of ${pageCount}`, // Footer text with page number
        doc.internal.pageSize.width - 20, // X position
        doc.internal.pageSize.height - 10 // Y position
      );
    }

    // Save the PDF file with the specified fileName
    doc.save(`${fileName}.pdf`);
  };

  // Render the component with a button to trigger PDF generation
  return (
    <Button
      variant="contained" // Button variant
      color="primary" // Button color
      onClick={generatePDF} // onClick event to trigger PDF generation
      sx={{
        fontWeight: 700, // Font weight
        backgroundColor: "#1976d2", // Background color
        "&:hover": { backgroundColor: "#1565c0" }, // Hover effect color
      }} // Custom button styles using Material-UI sx prop
    >
      Export to PDF
    </Button>
  );
};

export default PdfFeedback; // Export the PdfFeedback component
