import { ShoppingCart, Warning } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPastPapers, getQuestionsByStudentId } from "./api";

const StudentDashboard = () => {
  const [noOfAskedQuestions, setNoOfAskedQuestions] = useState(0);
  const [noOfUploadedPapers, setNoOfUploadedPapers] = useState(0);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    getQuestionsByStudentId(user._id).then((res) =>
      setNoOfAskedQuestions(res.length)
    );
  }, [user._id]);

  useEffect(() => {
    getPastPapers().then((res) => {
      const count = res.filter(({ paper }) => {
        return paper.userId === user._id;
      });
      setNoOfUploadedPapers(count.length);
    });
  }, [user._id]);

  return (
    <div className="p-5">
      <Typography component="h1" variant="h5">
        Dashboard
      </Typography>
    </div>
  );
};

export default StudentDashboard;
