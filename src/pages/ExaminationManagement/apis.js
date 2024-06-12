import { simpleNotification } from "../../utiles";
import axios from "axios";

export const postQuestion = async (formData) => {
  try {
    const res = await axios.post("/exam/add-question", formData);

    if (res.data) {
      return res.data;
    }
  } catch (error) {
    simpleNotification("error", error.message);
  }
};

export const updateQuestion = async (data) => {
  try {
    const { formData, questionId } = data;

    const res = await axios.put(`/exam/edit-question/${questionId}`, formData);

    if (res.data) {
      return res.data;
    }
  } catch (error) {
    simpleNotification("error", error.message);
  }
};

export const deleteQuestion = async (questionId) => {
  try {
    const res = await axios.delete(`/exam/delete-question/${questionId}`);

    if (res.data) {
      return res.data;
    }
  } catch (error) {
    simpleNotification("error", error.message);
  }
};

export const getAllQuestions = async () => {
  try {
    const res = await axios.get("/exam/get-questions");

    if (res.data) {
      return res.data;
    }
  } catch (error) {
    simpleNotification("error", error.message);
  }
};
