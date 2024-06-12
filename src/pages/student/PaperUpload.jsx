import FileUploader from "../../components/FileUploader"
import { useState } from "react"
import { NoteAdd } from "@mui/icons-material"
import { Box, Button, Grid, TextField, Typography } from "@mui/material"
import { simpleNotification } from "../../utiles"
import { uploadPaper } from "./api"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const PaperUpload = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        subject: "",
        grade: "",
        file: null
    })
    const { user } = useSelector(state => state.user)

    const handleOnChange = e => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = e => {
        e.preventDefault()

        const canSubmit = [formData.subject, formData.grade, formData.file].every(Boolean)

        if (canSubmit) {
            uploadPaper({ ...formData, userId: user._id }).then(res => {
                if (res) {
                    simpleNotification("success", "Paper uploaded successfully!")
                    setFormData({
                        subject: "",
                        grade: "",
                        file: null
                    })
                    navigate("/student/dashboard")
                }
            })
        } else {
            simpleNotification("error", "Please fill all the fields.")
        }
    }

    return (
        <div className="p-5">
            <Typography component="h1" variant="h5">
                Upload Your Paper
            </Typography>

            <Box className="mx-auto" component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, px: 3, maxWidth: 800 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="subject"
                            required
                            fullWidth
                            id="subject"
                            label="Subject"
                            value={formData.subject}
                            onChange={handleOnChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="grade"
                            required
                            fullWidth
                            id="grade"
                            label="Grade"
                            value={formData.grade}
                            onChange={handleOnChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FileUploader
                            Icon={<NoteAdd style={{ width: "5rem", height: "5rem" }} />}
                            details={formData}
                            setDetails={setFormData} uploadText='Upload your paper'
                            height="h-[150px]"
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ display: "flex", justifyContent: "end" }}>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mb: 2, width: "30%" }}
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </div>


        // <div className="max-w-xl mx-auto">
        //     
        // </div>
    )
}

export default PaperUpload