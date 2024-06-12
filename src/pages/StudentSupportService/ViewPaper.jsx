import { Button, TextField, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ASSETS_URL, simpleNotification } from "../../utiles";
import { useState } from "react";
import { ArrowBack } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { checkPaper } from "./apis";

// eslint-disable-next-line react/prop-types
const ViewPaper = () => {
    let { state } = useLocation();
    const navigate = useNavigate()
    const { user } = useSelector(state => state.user)
    const [viewMore, setViewMore] = useState(false)
    const [formData, setFormData] = useState({
        checkedBy: "",
        marks: "",
        paperId: ""
    })

    const handlePaperMarking = (e) => {
        e.preventDefault()

        if (formData.marks === "") {
            simpleNotification("error", "Please give your marks for this paper")
        } else {
            checkPaper(formData).then(res => {
                if (res) {
                    simpleNotification("success", res.message)
                    return navigate("/student-support/papers")
                }
            })
        }
    }

    return (
        <div className="p-5">
            <Typography variant="h4" pb={4}>
                View paper
            </Typography>

            <div className={`w-full ${viewMore ? "h-screen" : "h-[400px]"} max-w-2xl mx-auto overflow-hidden`}>
                <div className="flex justify-between">
                    <Link to="/student-support/papers">
                        <Button sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                            <ArrowBack fontSize="small" /> Back
                        </Button>
                    </Link>
                    <Button onClick={() => setViewMore(!viewMore)}>{viewMore ? "Collapse" : "Expand"}</Button>
                </div>
                <iframe
                    className="w-full h-full pb-14"
                    title="PDF Viewer"
                    src={`${ASSETS_URL}/uploads/papers/${state.paper.paper}`}
                />
            </div>

            <form onSubmit={handlePaperMarking} className="max-w-2xl mx-auto flex flex-col gap-2 w-[300px] items-center">
                <TextField
                    type="number"
                    name="result"
                    id="result"
                    label="Result"
                    fullWidth
                    value={formData.marks}
                    onChange={(e) => setFormData({
                        ...formData,
                        checkedBy: `${user.firstName} ${user.lastName}`,
                        paperId: state.paper._id,
                        marks: e.target.value
                    })}
                />
                <Button type="submit" sx={{ width: "fit-content" }} variant="contained">Pulish marks</Button>
            </form>
        </div>
    )
}

export default ViewPaper