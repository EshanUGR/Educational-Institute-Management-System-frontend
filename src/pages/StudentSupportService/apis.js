import axios from "axios";
import { simpleNotification } from "../../utiles";

export const getStudentQuestions = async (name) => {
  try {
    const res = await axios.get(
      `support-service/get-student-questions/${name}`
    );

    if (res.data) {
      return res.data;
    }
  } catch (error) {
    simpleNotification("error", error.message);
  }
};

export const getStudentQuestion = async (id) => {
  try {
    const res = await axios.get(`/support-service/get-student-question/${id}`);

    if (res.data) {
      return res.data;
    }
  } catch (error) {
    simpleNotification("error", error.message);
  }
};

export const addReply = async (reply) => {
  try {
    const res = await axios.post("/support-service/add-reply", reply);

    if (res.data) {
      return res.data;
    }
  } catch (error) {
    simpleNotification("error", error.message);
  }
};

export const getReply = async (questionId) => {
  try {
    const res = await axios.get(`/support-service/get-reply/${questionId}`);

    if (res.data) {
      return res.data;
    }
  } catch (error) {
    simpleNotification("error", error.message);
  }
};

export const editReply = async (data) => {
  try {
    const { replyId, ...rest } = data;
    const res = await axios.put(`/support-service/edit-reply/${replyId}`, rest);

    if (res.data) {
      return res.data;
    }
  } catch (error) {
    simpleNotification("error", error.message);
  }
};

export const deleteReply = async (replyId) => {
  try {
    const res = await axios.delete(`/support-service/delete-reply/${replyId}`);

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

export const checkPaper = async (formData) => {
  try {
    const { paperId, ...rest } = formData;

    const res = await axios.patch(
      `/support-service/check-pastpapers/${paperId}`,
      rest
    );

    if (res.data) {
      return res.data;
    }
  } catch (error) {
    simpleNotification("error", error.message);
  }
};
