/* eslint-disable no-empty-pattern */
import { createSlice } from "@reduxjs/toolkit";
import { attemptQuiz } from "./examApis";

const initialState = {
  status: "idle",
  questions: [],
  error: "",
};

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    clearErrorMessage: (state) => {
      state.status = "idle";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(attemptQuiz.pending, (state) => {
        state.status = "loading";
      })
      .addCase(attemptQuiz.fulfilled, (state, action) => {
        (state.status = "scceeded"), (state.questions = action.payload);
      })
      .addCase(attemptQuiz.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearErrorMessage } = examSlice.actions;
export default examSlice.reducer;
