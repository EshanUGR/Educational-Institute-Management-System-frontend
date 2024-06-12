import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const attemptQuiz = createAsyncThunk("/exam/attempt-quiz", async () => {
  try {
    const res = await axios.get("/exam/generate-quiz");
    return res.data;
  } catch (error) {
    throw error.response.data.message;
  }
});
