import { useState } from "react";
import { useEffect } from "react";
import { addReply, deleteReply, editReply, getReply, getStudentQuestion } from "./apis";
import { Link, useParams } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { ASSETS_URL, simpleNotification } from "../../utiles";
import { ArrowBack, Delete, Edit } from "@mui/icons-material";

const ViewQuestion = () => {
    const { id } = useParams()
    const [question, setQuestion] = useState(null)
    const [postedReply, setPostedReply] = useState(null)
    const [isEditing, setIsEditing] = useState(false);
    const [reply, setReply] = useState({
        questionId: id,
        message: ""
    })

    useEffect(() => {
        getStudentQuestion(id).then(res => setQuestion(res))
        getReply(id).then(res => setPostedReply(res))
    }, [id]);

    useEffect(() => {
        if (isEditing) {
            setReply({
                questionId: postedReply?.questionId,
                message: postedReply?.message
            })
        }
    }, [isEditing, postedReply?.message, postedReply?.questionId]);

    const handleSubmit = (e) => {
        e.preventDefault()

        const canAdd = [reply.message].every(Boolean)

        if (canAdd) {
            if (reply.questionId) {
                if (isEditing) {
                    editReply({ ...reply, replyId: postedReply._id }).then(res => {
                        if (res) {
                            simpleNotification("success", "Reply updated successfully!")
                            setPostedReply(res)
                            setIsEditing(false)
                        }
                    })
                } else {
                    addReply(reply).then(res => {
                        if (res) {
                            simpleNotification("success", "Reply added successfully!")
                            setPostedReply(res)
                        }
                    })
                }
            } else {
                simpleNotification("error", "Question id not found!")
            }
        } else {
            simpleNotification("error", "Please fill reply filed")
        }
    }

    const handleDeleteReply = (replyId) => {
        deleteReply(replyId).then(res => {
            if (res) {
                simpleNotification("success", res.message)
                setPostedReply(null)
                setReply({ questionId: id, message: "" })
            }
        })
    }

    return (
        <Box p={5}>
            <Link to="/student-support/dashboard" className="mb-5">
                <Button sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <ArrowBack fontSize="small" />Go back
                </Button>
            </Link>

            <div>
                <Typography variant="h5" sx={{ textDecoration: "underline" }}>Category</Typography>
                <Typography variant="body">{question?.category}</Typography>
            </div>

            <div className="pt-5">
                <Typography variant="h5" sx={{ textDecoration: "underline" }}>Student Details</Typography>
                <Typography
                    maxWidth={300}
                    variant="body1">
                    ID: <span className="font-bold">{question?.studentId}</span></Typography>
                <Typography
                    maxWidth={300}
                    variant="body1">Grade: <span className="font-bold">{question?.grade}</span></Typography>
                <Typography
                    maxWidth={300}
                    variant="body1">Name: <span className="font-bold">Chamila</span></Typography>
                <Typography
                    maxWidth={300}
                    variant="body1">Email: <span className="font-bold">chamila@gmail.com</span></Typography>
            </div>

            <div className="flex flex-col items-center py-10">
                <Typography variant="h4">{question?.topic}</Typography>
                <Typography variant="body">
                    {question?.explanation}
                </Typography>
                <Button
                    href={`${ASSETS_URL}/uploads/proofDocs/${question?.file}`}
                    variant="contained"
                    size="medium"
                    sx={{ mt: "10px", mb: "20px" }}>
                    view proof doc
                </Button>
            </div>

            {!postedReply && <form onSubmit={handleSubmit} className="w-[75%] mb-12 mx-auto flex flex-col items-center">
                <Typography variant="h5" mb={1}>Reply to question</Typography>
                <textarea
                    id="explanation"
                    rows="4"
                    name="explanation"
                    className="w-full text-lg text-gray-900 bg-white border-2 border-gray-300 rounded-sm py-1 px-3 :to-blue-700 outline-blue-700 placeholder:text-black/60"
                    placeholder="Add your reply"
                    onChange={(e) => setReply({ ...reply, message: e.target.value })}
                    value={reply.message} />
                <div className="flex gap-2">
                    <Button
                        type="submit"
                        variant="outlined"
                        sx={{ marginTop: "10px" }}>
                        Add reply
                    </Button>
                </div>
            </form>}

            {isEditing && <form onSubmit={handleSubmit} className="w-[75%] mb-12 mx-auto flex flex-col items-center">
                <Typography variant="h5" mb={1}>Edit reply</Typography>
                <textarea
                    id="explanation"
                    rows="4"
                    name="explanation"
                    className="w-full text-lg text-gray-900 bg-white border-2 border-gray-300 rounded-sm py-1 px-3 :to-blue-700 outline-blue-700 placeholder:text-black/60"
                    placeholder="Update your reply"
                    onChange={(e) => setReply({ ...reply, message: e.target.value })}
                    value={reply.message} />
                <div className="flex gap-2">
                    <Button
                        variant="contained"
                        sx={{ marginTop: "10px" }}
                        onClick={() => setIsEditing(false)}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="outlined"
                        sx={{ marginTop: "10px" }}>
                        Update reply
                    </Button>
                </div>
            </form>}

            {postedReply && <div>
                <Typography textAlign="center" variant="h5" mb={1}>Your reply</Typography>
                <div className="border border-black rounded-md flex flex-col max-w-md mx-auto">
                    <p className="text-wrap p-2 text-center">
                        {postedReply?.message}
                    </p>
                    <div className="flex gap-2 justify-center border-t border-black/50">
                        <Button
                            onClick={() => setIsEditing(true)} variant="contained"
                            sx={{ my: 1 }}
                        >
                            <Edit />
                        </Button>
                        <Button
                            onClick={() => handleDeleteReply(postedReply?._id)}
                            variant="contained"
                            color="error"
                            sx={{ my: 1 }}
                        >
                            <Delete />
                        </Button>
                    </div>
                </div>
            </div>}
        </Box>
    )
}

export default ViewQuestion

