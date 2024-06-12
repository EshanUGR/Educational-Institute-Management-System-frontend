import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { simpleNotification } from "../../../utiles";
import Swal from "sweetalert2";
import { logout } from "./userSlice";

export const register = createAsyncThunk(
  "/user/register",
  async (userDetails) => {
    try {
      const { navigate: nav, ...data } = userDetails;
      const res = await axios.post(`/user/register`, data);
      if (res?.data) {
        simpleNotification("success", "Registered successfully. Please login.");
        nav("/login");
      }
    } catch (error) {
      throw error.response.data.message;
    }
  }
);

export const login = createAsyncThunk("/user/login", async (userDetails) => {
  try {
    const res = await axios.post(`/user/login`, userDetails);
    if (res.data) {
      simpleNotification("success", "Logged in Successfully!");
    }
    return res?.data;
  } catch (error) {
    throw error.response.data.message;
  }
});

export const editProfile = createAsyncThunk(
  "/user/edit-profile",
  async (data) => {
    try {
      const { userInfo, navigate, redirectUrl } = data;

      const res = await axios.patch(`/user/edit-profile`, userInfo);

      if (res.data) {
        simpleNotification("success", "Profile updated Successfully!");
        navigate(redirectUrl);
      }

      return res.data;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);

export const deleteAccount = createAsyncThunk(
  "/user/delete-profile",
  async (id, { dispatch }) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`/user/delete-account/${id}`).then((res) => {
            if (res.data) {
              Swal.fire({
                title: "Deleted!",
                text: "Your account has beed deleted successfully!",
                icon: "success",
                timer: 2000,
              });
              dispatch(logout());
            }
          });
        }
      });
    } catch (error) {
      throw error.response.data.message;
    }
  }
);
