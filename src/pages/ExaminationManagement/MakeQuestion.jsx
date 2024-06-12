/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, List, ListItem, ListItemText, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import SelectOption from "../../components/SelectOption";
import { simpleNotification } from "../../utiles";
import { deleteQuestion, getAllQuestions, postQuestion, updateQuestion } from "./apis";
import { Check, Clear, ExpandMore } from "@mui/icons-material";
import PdfReport from "../../components/PdfReport";


const Form = ({ setShowForm, setQuestions, questions, editQuestion, setEditQuestion }) => {
    const [formData, setFormData] = useState({
        question: "",
        answers: ["", "", "", ""],
        correctAnswer: ""
    });

    useEffect(() => {
        if (editQuestion) {
            setFormData({
                question: editQuestion.question,
                answers: editQuestion.answers,
                correctAnswer: editQuestion.correctAnswer
            })
        }
    }, [editQuestion]);


   

    const isFormEmpty = () => {
        const { question, answers, correctAnswer } = formData;
        // Check if question field is empty
        if (question.trim() === "") {
            return false;
        }
        // Check if any answer field is empty
        if (answers.some(answer => answer.trim() === "")) {
            return false;
        }
        // Check if correctAnswer field is empty
        if (correctAnswer.trim() === "") {
            return false;
        }
        return true;
    };

    const handleAnswerChange = (i, value) => {
        const newAnswers = [...formData.answers]
        newAnswers[i] = value
        setFormData({ ...formData, answers: newAnswers })
    }

    const formSubmit = (e) => {
        e.preventDefault()

        if (isFormEmpty()) {
            if (editQuestion) {
                const data = {
                    formData,
                    questionId: editQuestion._id
                }

                updateQuestion(data).then(res => {
                    if (res) {
                        const updatedRecords = questions.map(question => {
                            if (question._id === res._id) {
                                return res
                            }
                            return question
                        })
                        setQuestions(updatedRecords)
                        simpleNotification("success", "Updated successfully");
                        setShowForm(false)
                        setEditQuestion(null)
                    }
                })
            } else {
                postQuestion(formData).then(res => {
                    if (res) {
                        simpleNotification("success", "Submit successfully");
                        setQuestions({ ...questions, res })
                        setShowForm(false)
                    }
                })
            }
        } else {
            simpleNotification("error", "fill all the fileds")
        }
    }

    return (
        <div className="p-5 w-full bg-white max-w-xl mx-auto mt-10">
            <Typography variant="h5" textAlign="center" pb={2}>{editQuestion ? "Update" : "Add a new"} question</Typography>

            <Box component="form" onSubmit={formSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                    label="Question"
                    fullWidth
                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                    value={formData.question}
                    name="question"
                />
                {formData?.answers?.map((answer, i) => (
                    <TextField
                        key={i}
                        label={`Answer  ${i + 1}`}
                        fullWidth
                        onChange={(e) => handleAnswerChange(i, e.target.value)}
                        value={answer}
                    />
                ))}
                <SelectOption
                    details={formData}
                    setDetails={setFormData}
                    value={formData.correctAnswer}
                    name="correctAnswer"
                    items={formData.answers}
                    label="Correct Answer"
                />
                <div className="flex justify-end gap-2">
                    <Button
                        color="warning"
                        fullWidth
                        variant="contained"
                        onClick={() => {
                            setShowForm(false)
                            setFormData({ question: "", answers: ["", "", "", ""], correctAnswer: "" })
                            if (editQuestion) {
                                setEditQuestion(null)
                            }
                        }}
                    >
                        cancel
                    </Button>
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                    >
                        {editQuestion ? "update" : "submit"}
                    </Button>
                </div>
            </Box>
        </div >
    )
}

const MakeQuestion = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [questions, setQuestions] = useState([]);
    const [editQuestion, setEditQuestion] = useState(null);
    const [expanded, setExpanded] = useState(false);
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        getAllQuestions().then(res => {
            if (res) setQuestions(res)
        })
    }, [questions.length]);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleDeleteQuestion = (questionId) => {
        deleteQuestion(questionId).then((res) => {
            if (res) {
                const newQuestions = questions.filter((question) => question._id !== res._id)
                setQuestions(newQuestions)
                simpleNotification("success", "Question deleted success.")
            }
        })
    }

    const handleEditQuestion = (questionId) => {
        setEditQuestion(questions.find(question => question._id === questionId))
        setShowForm(true)
    }

    return (
      <div className="p-5 relative">
       
        <Typography variant="h4">My Questions</Typography>

        {showForm && (
          <div className="min-h-screen absolute z-50 bg-black/70 top-0 left-0 right-0 bottom-0">
            <Form
              showForm={showForm}
              setShowForm={setShowForm}
              setQuestions={setQuestions}
              setEditQuestion={setEditQuestion}
              questions={questions}
              editQuestion={editQuestion}
            />
          </div>
        )}

        <Box sx={{ width: "100%", overflow: "hidden" }}>
          {!showForm && (
            <Button
              sx={{ my: 2, width: "fit-content" }}
              variant="contained"
              onClick={() => setShowForm(true)}
            >
              Add question
            </Button>
            
          )}

          {questions.length > 0 && (
            <>
              <TableContainer sx={{ height: "full" }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableBody>
                    {questions
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, i) => {
                        return (
                          <TableRow key={row._id}>
                            <TableCell key={row._id}>
                              <Accordion
                                sx={{ border: "1px solid black" }}
                                expanded={expanded === `panel${i + 1}`}
                                onChange={handleChange(`panel${i + 1}`)}
                              >
                                <AccordionSummary
                                  expandIcon={<ExpandMore />}
                                  aria-controls="panel1bh-content"
                                  id="panel1bh-header"
                                  sx={{ borderBottom: "1px solid black" }}
                                >
                                  <Typography sx={{ width: "100%" }}>
                                    {row.question}
                                  </Typography>
                                </AccordionSummary>

                                <AccordionDetails>
                                  <List>
                                    {row.answers.map((answer, i) => (
                                      <ListItem
                                        key={i}
                                        sx={{ display: "flex", gap: 1 }}
                                      >
                                        {answer === row.correctAnswer ? (
                                          <Check
                                            fontSize="small"
                                            color="action"
                                          />
                                        ) : (
                                          <Clear
                                            fontSize="small"
                                            color="action"
                                          />
                                        )}

                                        <ListItemText>{answer}</ListItemText>
                                      </ListItem>
                                    ))}
                                  </List>
                                  <div className="w-full flex justify-end gap-2">
                                    <Button
                                      variant="contained"
                                      onClick={() =>
                                        handleEditQuestion(row._id)
                                      }
                                    >
                                      Edit
                                    </Button>

                                    
                                    <Button
                                      variant="contained"
                                      color="error"
                                      onClick={() =>
                                        handleDeleteQuestion(row._id)
                                      }
                                    >
                                      Delete
                                    </Button>
                                  </div>
                                </AccordionDetails>
                              </Accordion>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={questions.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )}
        </Box>
        
      </div>
    );
}

export default MakeQuestion