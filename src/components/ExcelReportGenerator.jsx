/* eslint-disable react/prop-types */
import { Button } from "@mui/material";
import * as XLSX from "xlsx"

const ExcelReportGenerator = ({ data, fileName }) => {
    const exportToExcel = () => {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const dataExcel = new Blob([excelBuffer], { type: fileType });
        const url = window.URL.createObjectURL(dataExcel);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName + fileExtension;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <Button sx={{ fontWeight: 700 }} onClick={exportToExcel}>Export to Excel</Button>
    );
};

export default ExcelReportGenerator;