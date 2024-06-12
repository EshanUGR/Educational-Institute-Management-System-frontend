import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import SelectOption from '../../components/SelectOption';
import FileUploader from '../../components/FileUploader';
import { FileUpload } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { getSupportServiceMemebers, postQuestion } from './api';
import { simpleNotification, subjects } from '../../utiles';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const teachers = ["teacher - Nishantha", "teacher - Kamal"]

const SupportService = () => {
    const navigate = useNavigate()
    const { user } = useSelector(state => state.user)
    const [supportServiceMembers, setSupportServiceMembers] = useState([]);
    const [formData, setFormData] = useState({
        studentId: user?._id,
        grade: "",
        subject: "",
        teacher: "",
        category: "",
        topic: "",
        explanation: "",
        file: null
    });

    useEffect(() => {
        getSupportServiceMemebers().then(res => {
            setSupportServiceMembers(res)
        })
    }, []);

    const handleOnChange = e => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const canSubmit = [
            formData.studentId,
            formData.grade,
            formData.subject,
            formData.teacher,
            formData.category,
            formData.topic,
            formData.explanation,
            formData.file
        ].every(Boolean)

        if (canSubmit) {
            Swal.fire({
                title: "Are you sure?",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Submit"
            }).then((result) => {
                if (result.isConfirmed) {
                    postQuestion(formData).then(res => {
                        if (res) {
                            Swal.fire({
                                title: "Submitted!",
                                text: "Your form has been submitted successfully!.",
                                icon: "success"
                            });
                            setFormData({
                                studentId: "",
                                grade: "",
                                subject: "",
                                teacher: "",
                                category: "",
                                topic: "",
                                explanation: "",
                                file: null
                            })
                            navigate("/student/dashboard")
                        }
                    })
                }
            });
        } else {
            simpleNotification("error", "Please fill all the fields.")
        }
    };

    return (
        <Container component="main" maxWidth="md">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Support Service
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="studentId"
                                required
                                fullWidth
                                id="studentId"
                                label="Student ID"
                                value={formData.studentId}
                                onChange={handleOnChange}
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="grade"
                                label="Grade"
                                name="grade"
                                value={formData.grade}
                                onChange={handleOnChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <SelectOption
                                setDetails={setFormData}
                                details={formData}
                                name="subject"
                                label="Subject"
                                value={formData.subject}
                                items={subjects} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <SelectOption
                                setDetails={setFormData}
                                details={formData}
                                name="teacher"
                                label="Staff member"
                                value={formData.teacher}
                                items={supportServiceMembers}
                                teachers={teachers} />
                        </Grid>
                        <Grid item xs={12}>
                            <SelectOption
                                setDetails={setFormData}
                                details={formData}
                                name="category"
                                label="Category"
                                value={formData.category}
                                items={["paper class", "Issue about class sessions", "Class schedule"]} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="topic"
                                label="Topic"
                                name="topic"
                                value={formData.topic}
                                onChange={handleOnChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <textarea
                                id="explanation"
                                rows="4"
                                name="explanation"
                                className="w-full text-sm text-gray-900 bg-white border-2 border-gray-300 rounded-sm py-1 px-3 :to-blue-700 outline-blue-700 placeholder:text-black/60"
                                placeholder="Explain your matter briefly"
                                required
                                value={formData.explanation}
                                onChange={handleOnChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            Upload your file here
                            <FileUploader
                                details={formData}
                                setDetails={setFormData}
                                Icon={<FileUpload
                                    style={{ width: "5rem", height: "5rem" }}
                                />}
                                uploadText="Only PDF, Image allowed"
                                acceptFileType="application/pdf,image/*"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </Container >
    )
}

export default SupportService