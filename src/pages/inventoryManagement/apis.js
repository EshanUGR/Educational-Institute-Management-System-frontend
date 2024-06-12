import axios from "axios";
import { simpleNotification } from "../../utiles";

export const getAllInventoryIssues = async () => {
  try {
    const res = await axios.get("/inventory/get-inventory-issues");

    if (res.data) {
      return res.data;
    }
  } catch (error) {
    simpleNotification("error", error.message);
  }
};

export const problemSubmit = async (formData) => {
  try {
    const { itemId, problem } = formData;

    const selectedItem = itemId?.split("-");
    const selectedItemId = selectedItem[selectedItem.length - 1].trim();

    const data = {
      itemId: selectedItemId,
      problem,
    };

    const res = await axios.post("/inventory/add-inventory-issue", data);

    if (res.data) {
      return res.data;
    }
  } catch (error) {
    simpleNotification("error", error.message);
  }
};

export const fixIssue = async (id) => {
  try {
    const res = await axios.delete(`/inventory/delete-inventory-issue/${id}`);

    if (res.data) {
      return res.data;
    }
  } catch (error) {
    simpleNotification("error", error.message);
  }
};
