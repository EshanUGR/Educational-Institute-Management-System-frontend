/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { attemptQuiz } from "../../app/features/exam/examApis";
import { Input, Pagination, Stack } from "@mui/material";
import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import { simpleNotification } from "../../utiles";

const CountdownTimer = ({ minutes, onComplete }) => {
  const [seconds, setSeconds] = useState(minutes * 60);

  useEffect(() => {
    const timer =
      seconds > 0 && setInterval(() => setSeconds(seconds - 1), 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  useEffect(() => {
    if (seconds === 0) {
      onComplete();
    }
  }, [seconds, onComplete]);

  const displayTime = () => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return <div>Time Left: {displayTime()}</div>;
};

const calculateTime = (startAndEndTime) => {
  const { startTime, endTime } = startAndEndTime;

  const takenTime = endTime - startTime;
  const minutes = Math.floor(takenTime / 60000);
  const seconds = ((takenTime % 60000) / 1000).toFixed(0);

  return `${minutes} minutes ${seconds} seconds`;
};

const AttemptQuiz = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [value, setValue] = useState("");
  const [providedAnswers, setProvidedAnswers] = useState([]);
  const [isAttempQuiz, setIsAttempQuiz] = useState(false);
  const [quizPwd, setQuizPwd] = useState("");
  const { questions } = useSelector((state) => state.exam);
  const [quizStartAndEndTime, setQuizStartAndEndTime] = useState({
    startTime: "",
    endTime: "",
  });
  const pwd = "123";

  let marks = 0;
  questions.forEach((element, i) => {
    providedAnswers.map((item, j) => {
      if (item.questionNo - 1 === i) {
        if (item.ans === element.correctAnswer) {
          marks++;
        }
      }
    });
  });

  useEffect(() => {
    dispatch(attemptQuiz());
  }, [dispatch]);

  useEffect(() => {
    const answeredQuestion = providedAnswers.find(
      (ans) => ans.questionNo === page
    );
    if (answeredQuestion) {
      setValue(answeredQuestion.ans);
    } else {
      setValue("");
    }
  }, [page, providedAnswers]);

  useEffect(() => {
    if (quizCompleted) {
      setQuizStartAndEndTime({ ...quizStartAndEndTime, endTime: new Date() });
    }
  }, [quizCompleted]);

  const handlePageChange = (e, page) => {
    setPage(page);
    setValue("");
  };

  const handleTimeout = () => {
    setQuizCompleted(true);
  };

  const handleRadioChange = (e) => {
    const selectedValue = e.target.value;
    // Find if answer for the current question already exists
    const existingAnswerIndex = providedAnswers.findIndex(
      (ans) => ans.questionNo === page
    );
    if (existingAnswerIndex !== -1) {
      // If answer exists, update it
      const updatedAnswers = [...providedAnswers];
      updatedAnswers[existingAnswerIndex].ans = selectedValue;
      setProvidedAnswers(updatedAnswers);
    } else {
      // If answer doesn't exist, add it to the answers array
      setProvidedAnswers([
        ...providedAnswers,
        { questionNo: page, ans: selectedValue },
      ]);
    }
    setValue(selectedValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (pwd === quizPwd) {
      setIsAttempQuiz(true);
      setQuizStartAndEndTime({ ...quizStartAndEndTime, startTime: new Date() });
    } else {
      simpleNotification("error", "Quiz password is not match.");
    }

    setQuizPwd("");
  };

  return (
    <div className="h-full">
      {!isAttempQuiz && (
        <form
          className="flex flex-col gap-2 justify-center items-center h-full mx-auto"
          onSubmit={handleSubmit}
        >
          <Input
            size="large"
            type="text"
            placeholder="Enter Quiz Password"
            onChange={(e) => setQuizPwd(e.target.value)}
            value={quizPwd}
            sx={{ width: "50%" }}
          />
          <Button
            type="submit"
            variant="outlined"
            sx={{ width: "fit-content" }}
          >
            submit
          </Button>
        </form>
      )}

      {isAttempQuiz && (
        <div>
          <div className="flex items-center px-5 pt-5 justify-between">
            <h1 className="">Attempt Quiz</h1>
            <span>
              {!quizCompleted && (
                <CountdownTimer minutes={1 / 10} onComplete={handleTimeout} />
              )}
            </span>
          </div>

          <div className="p-5 border-2 m-5">
            <FormLabel
              id="demo-error-radios"
              sx={{ fontSize: "23px", color: "black", fontWeight: "bold" }}
            >
              {page.toString().padStart(2, "0")}. {questions[page - 1].question}
            </FormLabel>

            <RadioGroup
              aria-labelledby="demo-error-radios"
              name="quiz"
              value={value}
              onChange={handleRadioChange}
            >
              {questions[page - 1].answers.map((answer, index) => {
                return (
                  <FormControlLabel
                    key={index}
                    value={answer}
                    control={<Radio />}
                    label={answer}
                    checked={answer === value}
                    disabled={quizCompleted}
                  />
                );
              })}
            </RadioGroup>

            <div className="flex justify-end my-4">
              {page === 10 && (
                <Button
                  variant="contained"
                  onClick={() => setQuizCompleted(true)}
                >
                  Start Quiz
                </Button>
              )}
            </div>

            <div className="flex justify-center">
              <Stack spacing={2}>
                <Pagination
                  count={10}
                  variant="outlined"
                  shape="rounded"
                  page={page}
                  onChange={handlePageChange}
                />
              </Stack>
            </div>
          </div>

          <div className="text-center mb-10">
            {quizCompleted && (
              <div className="border-2 max-w-md mx-auto py-6">
                <p className="pb-5 font-bold text-xl upper">
                  Thanks for taking the quiz!
                </p>
                <p className="flex justify-between max-w-xs mx-auto mb-3 border-b border-black/30">
                  Result: <span>{marks}/10</span>
                </p>
                <p className="flex justify-between max-w-xs mx-auto mb-3 border-b border-black/30">
                  Taken time: <span>{calculateTime(quizStartAndEndTime)}</span>
                </p>
                <p className="flex justify-between max-w-xs mx-auto mb-3 border-b border-black/30">
                  Quiz start time:{" "}
                  <span>
                    {new Date(
                      quizStartAndEndTime.startTime
                    ).toLocaleTimeString()}
                  </span>
                </p>
                <p className="flex justify-between max-w-xs mx-auto mb-3 border-b border-black/30">
                  Quiz end time:{" "}
                  <span>
                    {new Date(quizStartAndEndTime.endTime).toLocaleTimeString()}
                  </span>
                </p>
                <p className="flex justify-between max-w-xs mx-auto border-b border-black/30">
                  Date:{" "}
                  <span>
                    {new Date(
                      quizStartAndEndTime.startTime
                    ).toLocaleDateString()}
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AttemptQuiz;
