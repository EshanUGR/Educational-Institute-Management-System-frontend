import { useEffect, useState } from "react";
import { getPastPapers } from "./apis";
import { useSelector } from "react-redux";
import {
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from "@mui/material";
import ExcelReportGenerator from "../../components/ExcelReportGenerator";

const MarkedPaperDetails = () => {
    const [papers, setPapers] = useState([]);
    const { user } = useSelector(state => state.user)

    const checkedPapers = papers.filter((paper) => paper.paper.checkedBy === `${user?.firstName} ${user?.lastName}`)

    const reportData = checkedPapers?.map((details) => {
        return {
            "Student Name": `${details.student.firstName} ${details.student.lastName}`,
            "Grade": details.paper.grade,
            "Subject": details.paper.subject,
            "Result": `${details.paper.result}%`,
            "Examined By": details.paper.checkedBy
        }
    })

    useEffect(() => {
        getPastPapers().then(res => setPapers(res))
    }, []);

    return (
        <div className="p-5">
            <Typography variant="h4" pb={4}>
                Marked paper details
            </Typography>

            <div className="w-full flex justify-end">
                <ExcelReportGenerator data={reportData} fileName="Student-Result-Sheet" />
            </div>

            {checkedPapers.length > 0 ? <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead sx={{ backgroundColor: "blue" }}>
                        <TableRow>
                            <TableCell sx={{ color: "white" }}>
                                Name
                            </TableCell>
                            <TableCell sx={{ color: "white" }}>
                                Grade
                            </TableCell>
                            <TableCell sx={{ color: "white" }}>
                                Subject
                            </TableCell>
                            <TableCell sx={{ color: "white" }}>
                                Result
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {checkedPapers.map((row) => (
                            <TableRow key={row.paper._id}>
                                <TableCell>
                                    {row?.student.firstName}{" "}{row?.student.lastName}
                                </TableCell>
                                <TableCell>{row?.paper.grade}</TableCell>
                                <TableCell>{row?.paper.subject}</TableCell>
                                <TableCell>{row?.paper.result}%</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> : <div>No Checked Past Papers found.</div>}
        </div>
    )
}

export default MarkedPaperDetails