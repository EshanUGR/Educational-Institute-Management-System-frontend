/* eslint-disable no-unused-vars */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { simpleNotification } from "../../../utiles";
import Swal from "sweetalert2";

export const getAllInventories = createAsyncThunk(
  "/inventory/all-inventories",
  async (data, { getState }) => {
    try {
      const { user } = getState();
      const res = await axios.get("/inventory/all-inventories", {
        headers: {
          Authorization: `${user.user.token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);

export const addInventory = createAsyncThunk(
  "/inventory/add-inventory",
  async (data, { getState }) => {
    try {
      const { inventoryDetails, navigate } = data;
      const { user } = getState();
      const inventoryData = new FormData();
      inventoryData.set("name", inventoryDetails.name);
      inventoryData.set("category", inventoryDetails.category);
      inventoryData.set("price", inventoryDetails.price);
      inventoryData.set("quantity", inventoryDetails.quantity);
      inventoryData.set("file", inventoryDetails.file);

      const res = await axios.post("/inventory/add-inventory", inventoryData, {
        headers: {
          Authorization: user.user.token,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data) {
        navigate("/inventory/dashboard");
        simpleNotification("success", "Inventory saved successfully!");

        return res.data;
      }
    } catch (error) {
      throw error.response.data.message;
    }
  }
);

export const editInventory = createAsyncThunk(
  "/inventory/edit-inventory",
  async (data, { getState }) => {
    try {
      const { user } = getState();
      const { inventoryDetails, navigate } = data;

      const inventoryData = new FormData();
      inventoryData.set("name", inventoryDetails.name);
      inventoryData.set("category", inventoryDetails.category);
      inventoryData.set("price", inventoryDetails.price);
      inventoryData.set("quantity", inventoryDetails.quantity);
      inventoryData.set("file", inventoryDetails.file);
      inventoryData.set("id", inventoryDetails.id);

      const res = await axios.patch(
        "/inventory/edit-inventory",
        inventoryData,
        {
          headers: {
            Authorization: user.user.token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data) {
        navigate("/inventory/dashboard");
        simpleNotification("success", "Inventory updated successfully!");

        return res.data;
      }
    } catch (error) {
      throw error.response.data.message;
    }
  }
);

export const deleteInventory = createAsyncThunk(
  "/inventory/delete-inventory",
  async (id, { getState }) => {
    const { user } = getState();

    try {
      const res = await axios.delete(`/inventory/delete-inventory/${id}`, {
        headers: { Authorization: user.user.token },
      });

      return res.data;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);
