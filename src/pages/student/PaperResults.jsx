/* eslint-disable no-unused-vars */
import {
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button
} from "@mui/material"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { getPastPapers } from "./api";
import { ASSETS_URL } from "../../utiles";

const PaperResults = () => {
    const [pastPapers, setPastPapers] = useState([]);
    const { user } = useSelector(state => state.user)

    const myPapers = pastPapers.filter((paper) => `${paper.student.firstName} ${paper.student.lastName}` === `${user?.firstName} ${user?.lastName}`)

    useEffect(() => {
        getPastPapers().then(res => setPastPapers(res))
    }, []);


    return (
        <div className="p-5">
            <Typography component="h1" variant="h5">
                Check my results
            </Typography>

            {myPapers.length > 0 ? <TableContainer sx={{ pt: 2 }} component={Paper}>
                <Table aria-label="simple table">
                    <TableHead sx={{ backgroundColor: "blue" }}>
                        <TableRow>
                            <TableCell sx={{ color: "white" }}>
                                Name
                            </TableCell>
                            <TableCell sx={{ color: "white" }}>
                                Subject
                            </TableCell>
                            <TableCell sx={{ color: "white" }}>
                                Result
                            </TableCell>
                            <TableCell sx={{ color: "white" }}>
                                Marked By
                            </TableCell>
                            <TableCell sx={{ color: "white" }}>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {myPapers.map((row) => (
                            <TableRow key={row.paper._id}>
                                <TableCell>
                                    {row?.student.firstName}{" "}{row?.student.lastName}
                                </TableCell>
                                <TableCell>{row?.paper.subject}</TableCell>
                                <TableCell>{row?.paper.result ? row?.paper.result + "%" : "Not checked"}</TableCell>
                                <TableCell>{row?.paper.checkedBy ? row?.paper.checkedBy : "Not checked"}</TableCell>
                                <TableCell>
                                    <Button size="small" href={`${ASSETS_URL}/uploads/papers/${row?.paper.paper}`} variant="outlined">View paper</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> : <div>No papers to check.</div>}
        </div>
    )
}

export default PaperResults