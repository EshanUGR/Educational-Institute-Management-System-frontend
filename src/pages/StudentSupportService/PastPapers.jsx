import { useEffect, useState } from "react";
import { getPastPapers } from "./apis";
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
} from "@mui/material";
import { Link } from "react-router-dom";
import SelectOption from "../../components/SelectOption";
import { subjects } from "../../utiles";

const PastPapers = () => {
    const [pastPapers, setPastPapers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const uncheckedPastpapers = pastPapers.filter((paper) => paper.paper.result === "")

    const filteredData = () => {
        if (!searchQuery.trim()) {
            return uncheckedPastpapers
        } else {
            return uncheckedPastpapers.filter(({ paper }) => paper.subject === searchQuery)
        }
    }

    useEffect(() => {
        getPastPapers().then(res => setPastPapers(res))
    }, []);

    return (
        <div className="p-5">
            <Typography variant="h4" pb={4}>
                Papers
            </Typography>



            <div className="flex w-full flex-col justify-end">
                <div className="w-[200px]">
                    <SelectOption
                        label="Filter by subject"
                        items={subjects}
                        details={searchQuery}
                        setDetails={setSearchQuery}
                        name="subject"
                        value={searchQuery}
                        singleValueUpdate={true}
                    />
                </div>

                <div className="">
                    <Button onClick={() => setSearchQuery("")}>Clear</Button>
                </div>
            </div>


            <div className="pt-5">
                {uncheckedPastpapers.length > 0 ?
                    filteredData().length > 0 ?
                        <TableContainer component={Paper}>
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
                                            Actions
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredData().map((row) => (
                                        <TableRow key={row.paper._id}>
                                            <TableCell>
                                                {row?.student.firstName}{" "}{row?.student.lastName}
                                            </TableCell>
                                            <TableCell>{row?.paper.grade}</TableCell>
                                            <TableCell>{row?.paper.subject}</TableCell>
                                            <TableCell>
                                                <Link to="/student-support/view-paper" state={row}>
                                                    <Button variant="outlined">View paper</Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer> :
                        <div className="text-center">No papers with <b>{searchQuery}</b></div> :
                    <div className="text-center">No papers found</div>
                }
            </div>

        </div>
    )
}

export default PastPapers