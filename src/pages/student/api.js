import axios from "axios";
import { simpleNotification } from "../../utiles";

export const getSupportServiceMemebers = async () => {
  try {
    const res = await axios.get("/support-service/support-service-members");

    if (res.data) {
      return res.data;
    }
  } catch (error) {
    simpleNotification("error", error.message);
  }
};

export const getQuestionsByStudentId = async (studentId) => {
  try {
    const res = await axios.get(
      `/support-service/get-questions-by-studentId/${studentId}`
    );

    if (res.data) {
      return res.data;
    }
  } catch (error) {
    simpleNotification("error", error.message);
  }
};

export const postQuestion = async (formData) => {
  try {
    const res = await axios.post("/support-service/post-question", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.data) {
      return res.data;
    }
  } catch (error) {
    simpleNotification("error", error.message);
  }
};

export const uploadPaper = async (formData) => {
  try {
    const res = await axios.post("/support-service/upload-paper", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.data) {
      return res.data;
    }
  } catch (error) {
    simpleNotification("error", error.message);
  }
};

export const getPastPapers = async () => {
  try {
    const res = await axios.get(`/support-service/get-pastpapers`);

    if (res.data) {
      return res.data;
    }
  } catch (error) {
    simpleNotification("error", error.message);
  }
};
