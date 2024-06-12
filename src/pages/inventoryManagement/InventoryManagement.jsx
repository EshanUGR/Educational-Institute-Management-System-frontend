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
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fixIssue, getAllInventoryIssues } from "./apis";
import { simpleNotification } from "../../utiles";

const InventoryManagement = () => {
    const navigate = useNavigate()
    const [issues, setIssues] = useState([]);
    const { user } = useSelector(state => state.user)
    const { inventories } = useSelector(state => state.inventory)

    useEffect(() => {
        getAllInventoryIssues().then(res => {
            const issesWithInventory = res.map(issue => {
                const item = inventories.find(inventory => inventory._id === issue.itemId)

                return {
                    issue, item
                }
            })

            setIssues(issesWithInventory)
        })
    }, [inventories]);

    // check role and redirect
    useEffect(() => {
        if (user?.role !== "Inventory Manager") {
            simpleNotification("error", "You not allowed to this page!")
            navigate("/inventory/dashboard")
        }
    }, [user?.role, navigate]);

    const handleFixIssue = (id) => {
        fixIssue(id).then(res => {
            simpleNotification("success", res.message)
            setIssues(issues.filter(i => i.issue._id !== id))
        })
    }

    return (
        <div className="p-5">
            <Typography variant="h4" pb={4}>
                Inventory Management Portal
            </Typography>

            <div className="max-w-xl mx-auto">
                {issues.length > 0 ?
                    <TableContainer sx={{ pt: 2 }} component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead sx={{ backgroundColor: "blue" }}>
                                <TableRow>
                                    <TableCell sx={{ color: "white" }}>
                                        Item Name
                                    </TableCell>
                                    <TableCell sx={{ color: "white" }}>
                                        Issue
                                    </TableCell>
                                    <TableCell sx={{ color: "white" }}>
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {issues.map((row) => (
                                    <TableRow key={row?.issue?._id}>
                                        <TableCell>
                                            {row?.item?.name}
                                        </TableCell>
                                        <TableCell>
                                            {row?.issue?.problem}
                                        </TableCell>
                                        <TableCell>
                                            <Button onClick={() => handleFixIssue(row?.issue._id)} variant="outlined" size="small">Fix this issue</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer> : <div>No issues found</div>}

            </div>

        </div>
    )
}

export default InventoryManagement