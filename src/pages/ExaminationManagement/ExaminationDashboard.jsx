import { NoteAlt, Quiz } from "@mui/icons-material"
import { Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { getAllQuestions } from "./apis";
import axios from "axios";

const ExaminationDashboard = () => {
    const [questions, setQuestions] = useState(0);
    const [notices, setNotices] = useState(0);



    useEffect(() => {
        getAllQuestions().then((res) => {
            setQuestions(res.length)
        })

        getFetchData()
    }, []);

    const getFetchData = async () => {
        try {
            const data = await axios.get("/exam/exam-notices");
            if (data.data.success) {
                setNotices(data.data.data.length);
            }
        } catch (error) {
            console.error(error);
            alert("Error fetching data");
        }
    };

    return (
        <div className="p-5 relative">
            <Typography variant="h4">Dashboard</Typography>

            <div className="w-full max-w-2xl mx-auto">
                <div className="grid grid-cols-2 place-items-center gap-5 mt-10">
                    <div className="h-[150px] w-full border-2 flex items-center justify-center flex-col rounded-lg shadow-md text-center font-bold text-xl">
                        <div className="p-3 bg-blue-600 rounded-full">
                            <NoteAlt fontSize="large" className="text-white" />
                        </div>
                        Total Notices
                        <span className="font-normal">{notices}</span>
                    </div>
                    <div className="h-[150px] w-full border-2 flex items-center justify-center flex-col rounded-lg shadow-md text-center font-bold text-xl">
                        <div className="p-3 bg-red-600 rounded-full">
                            <Quiz fontSize="large" className="text-white" />
                        </div>
                        Total Questions
                        <span className="font-normal">{questions}</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-5 mt-10 max-w-sm mx-auto">
                <Link to="/exam/publish-exam-notices" className="py-2 bg-[#1f2937ea] hover:bg-[#1F2937] font-bold uppercase rounded-full duration-300 text-white w-full text-center">Publish Exam Notice</Link>
                <Link to="/exam/make-question" className="py-2 bg-[#1f2937ea] hover:bg-[#1F2937] hover:bg-[] font-bold uppercase rounded-full duration-300 text-white w-full text-center">Questions</Link>
            </div>
        </div>
    )
}

export default ExaminationDashboard