import { createSlice } from "@reduxjs/toolkit";
import {
  addInventory,
  deleteInventory,
  editInventory,
  getAllInventories,
} from "./inventoryApis";

const initialState = {
  status: "idle",
  inventories: [],
  error: "",
};

const inventorySlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearErrorMessage: (state) => {
      state.status = "idle";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // get all inventories
      .addCase(getAllInventories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllInventories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.inventories = action.payload;
      })
      .addCase(getAllInventories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // add inventory
      .addCase(addInventory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addInventory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.inventories = [...state.inventories, action.payload];
      })
      .addCase(addInventory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // update inventory
      .addCase(editInventory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editInventory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.inventories = state.inventories.map((inventory) =>
          inventory._id === action.payload._id
            ? { ...inventory, ...action.payload }
            : inventory
        );
      })
      .addCase(editInventory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // delete inventory
      .addCase(deleteInventory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteInventory.fulfilled, (state, action) => {
        const newList = state.inventories.filter(
          (inventory) => inventory._id !== action.payload.data
        );
        state.status = "succeeded";
        state.inventories = newList;
      })
      .addCase(deleteInventory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearErrorMessage } = inventorySlice.actions;
export default inventorySlice.reducer;
