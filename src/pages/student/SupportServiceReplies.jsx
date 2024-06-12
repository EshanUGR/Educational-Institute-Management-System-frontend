import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getQuestionsByStudentId } from "./api";
import { calculateTimeAgo, truncatedSentence } from '../../utiles';

const SupportServiceReplies = () => {
    const [questionWithReply, setQuestionWithReply] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const { user } = useSelector(state => state.user)

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
        if (user?._id) {
            setIsLoading(true)
            getQuestionsByStudentId(user?._id)
                .then(res => {
                    setIsLoading(false)
                    setQuestionWithReply(res)
                }).catch(error => {
                    if (error) {
                        console.log(error)
                        setIsLoading(false)
                    }
                })
        }
    }, [user?._id]);

    return (
        <div className="p-5">
            <Typography variant="h4">My Questions</Typography>

            {isLoading ? (
                <div><p>Loading</p></div>
            ) : (
                <div>
                    {questionWithReply.length !== 0 ? (
                        <div>
                            {questionWithReply.map((q, i) => (
                                <div key={i} className='mt-5 max-w-2xl mx-auto'>
                                    <Accordion
                                        sx={{ border: "1px solid black" }} expanded={expanded === `panel${i + 1}`}
                                        onChange={handleChange(`panel${i + 1}`)}
                                    >
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header"
                                            sx={{ borderBottom: "1px solid black" }}
                                        >
                                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                                {truncatedSentence(q.question.category)}
                                            </Typography>

                                            <Typography sx={{ width: '33%', color: 'text.secondary' }}>
                                                {truncatedSentence(q.question.topic)}
                                            </Typography>

                                            <Typography sx={{ width: '33%', color: 'text.secondary', textAlign: "end" }}>
                                                {q?.reply ? `Replied ${calculateTimeAgo(q.reply?.createdAt)}` : "Waiting for reply"}
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                {q.reply ? q.reply.message : "No reply yet."}
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>No question yet.</div>
                    )}
                </div>
            )}
        </div>
    )
}

export default SupportServiceReplies