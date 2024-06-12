/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useState } from "react"
import { getPastPapers, getStudentQuestions } from "./apis";
import { useSelector } from "react-redux";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import { Link } from "react-router-dom";
import { formatDate } from "../../utiles";
import { Description, Warning } from "@mui/icons-material";
import { Box } from "@mui/material";

const StudentSupportDashboard = () => {
    const [questions, setQuestions] = useState([])
    const [checkedPapersCount, setCheckedPapersCount] = useState(0)
    const [searchQuery, setSearchQuery] = useState('');
    const { user } = useSelector(state => state.user)

    useEffect(() => {
        getStudentQuestions(`${user?.firstName} ${user?.lastName}`).then(res => {
            if (res) setQuestions(res)
        })
    }, [user?.firstName, user?.lastName]);

    useEffect(() => {
        getPastPapers().then(res => {
            if (res) {
                setCheckedPapersCount(res.filter(({ paper }, i) => paper.checkedBy === `${user?.firstName} ${user?.lastName}`).length)
            }
        })
    }, [user?.firstName, user?.lastName]);

    const filterData = () => {
        if (!searchQuery.trim()) {
            return questions
        } else {
            return questions.filter(item => new Date(item.createdAt).toLocaleDateString() === formatDate(searchQuery));
        }
    };

    return (
        <div className="p-5">
            <Typography variant="h4" pb={4}>
                Students Questions & Summary
            </Typography>

            <div className="grid grid-cols-2 place-items-center gap-5 mb-10 max-w-xl mx-auto">
                <div className="h-[150px] w-full border-2 flex items-center justify-center flex-col rounded-lg shadow-md text-center font-bold text-xl">
                    <div className="p-3 bg-red-600 rounded-full">
                        <Warning fontSize="large" className="text-white" />
                    </div>
                    No of questions
                    <span className="font-normal">{questions.length}</span>
                </div>
                <div className="h-[150px] w-full border-2 flex items-center justify-center flex-col rounded-lg shadow-md text-center font-bold text-xl">
                    <div className="p-3 bg-blue-600 rounded-full">
                        <Description fontSize="large" className="text-white" />
                    </div>
                    Checked papers count
                    <span className="font-normal">{checkedPapersCount}</span>
                </div>
            </div>

            <Box
                component="form"
                sx={{ borderRadius: "5px", display: 'flex', alignItems: 'center', width: 400, gap: "10px", border: "1px solid black", margin: "auto" }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search by date"
                    inputProps={{ 'aria-label': 'search google maps' }}
                    type="date"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    value={searchQuery}
                />
                <Button variant="contained" onClick={() => setSearchQuery("")}>Clear date</Button>
            </Box>

            {filterData().length > 0 ?
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto mt-5">
                    {filterData().map(question => (
                        <Card key={question._id} className="border-2 shadow-xl">
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {question.topic}
                                </Typography>

                                <Typography variant="body2">
                                    {question.category}
                                </Typography>

                                <Typography variant="body2">
                                    {new Date(question.createdAt).toLocaleString()}
                                </Typography>
                            </CardContent>

                            <CardActions className="justify-end">
                                <Link to={`/student-support/view-question/${question._id}`}>
                                    <Button size="small">View Question</Button>
                                </Link>
                            </CardActions>
                        </Card>
                    ))}
                </div> : <div className="pt-5 text-center">No questions found</div>
            }

        </div>
    )
}

export default StudentSupportDashboard