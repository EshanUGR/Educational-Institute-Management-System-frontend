/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { simpleNotification } from "../../utiles";
import "./style.css";
import { Close } from "@mui/icons-material";

import {
  Box,
  Button,
  InputBase,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";

import PdfFeedback from "../../components/PdfFeedback";
import ExcelReportGenerator from "../../components/ExcelReportGenerator";

const FormTable = ({ handleSubmit, handleOnChange, handleclose, rest }) => {
  return (
    <div className="addContainer z-50">
      <form onSubmit={handleSubmit} className="relative">
        <div
          className="absolute top-3 right-3 rounded-full cursor-pointer hover:bg-black/10 duration-300"
          onClick={handleclose}
        >
          <div className="p-1 text-black">
            <Close fontSize="medium" />
          </div>
        </div>

        <label htmlFor="Description">Feedback:</label>
        <input
          type="text"
          id="name"
          name="Feedback"
          onChange={handleOnChange}
          value={rest.Feedback}
        />
        <label htmlFor="Rate">Rate :</label>
        <select
          id="email"
          name="Rate"
          value={rest.Rate}
          onChange={handleOnChange}
        >
          <option value="">Select...</option>
          <option value="hard" name="Rate">
            Hard
          </option>
          <option value="medium" name="Rate">
            Medium
          </option>
          <option value="easy" name="Rate">
            Easy
          </option>
        </select>

        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  );
};

const ExamFeedback = () => {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dataList, setDataList] = useState([]);
  const [formData, setFormData] = useState({
    Feedback: "",
    Rate: "",
  });

  const filterData = () => {
    if (!searchQuery.trim()) {
      return dataList;
    } else {
      return dataList.filter((item) => item.Date === searchQuery);
    }
  };
 const reportData = filterData().map((item) => {
   return {
    Feedback:item.Feedback,
   Rate:item.Rate
   };
 });
  useEffect(() => {
    getFetchData();
  }, []);

  const [formDataEdit, setFormDataEdit] = useState({
    Feedback: "",
    Rate: "",
    _id: "",
  });

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const canSubmit = [formData.Feedback, formData.Rate].every(Boolean);

      if (canSubmit) {
        const data = await axios.post("/exam/publish-feedback", formData);
        if (data.data.success) {
          setAddSection(false);
          getFetchData();
          simpleNotification("success", data.data.message);
          setFormData({
            Feedback: "",
            Rate: "",
          });
        }
      } else {
        simpleNotification("error", "Fill all the input fields");
      }
    } catch (error) {
      simpleNotification("error", "Error creating Notice");
    }
  };

  const getFetchData = async () => {
    try {
      const data = await axios.get("/exam/exam-feedback");
      if (data.data.success) {
        setDataList(data.data.data);
      }
    } catch (error) {
      console.error(error);
      alert("Error fetching data");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const canSubmit = [formDataEdit.Feedback, formDataEdit.Rate].every(
        Boolean
      );

      if (canSubmit) {
        const data = await axios.put(
          `/exam/update-exam-feedback`,
          formDataEdit
        );

        if (data.data.success) {
          getFetchData();
          simpleNotification("success", data.data.message);
          setEditSection(false);
        }
      } else {
        simpleNotification("error", "Fill all the input fields");
      }
    } catch (error) {
      simpleNotification("error", "Something went wrong");
    }
  };

  const handleEditOnChange = (e) => {
    const { value, name } = e.target;
    setFormDataEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = (e1) => {
    setFormDataEdit({
      Feedback: e1.Feedback,
      Rate: e1.Rate,
      _id: e1._id,
    });
    setEditSection(true);
  };

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const data = await axios.delete(`/exam/delete-exam-feedback/${id}`);

          if (data.data.success) {
            Swal.fire({
              title: "Deleted!",
              text: "Feedback has been deleted.",
              icon: "success",
            });
            getFetchData();
          }
        }
      });
    } catch (error) {
      simpleNotification("error", "Error deleting Feedback");
    }
  };

  return (
    <div className="relative p-5 w-full h-full">
      <Typography variant="h4" pb={4}>
        Exam Feedback
      </Typography>

      <div className="flex justify-between w-full mb-10">
        <Button variant="contained" onClick={() => setAddSection(true)}>
          Add
        </Button>
      </div>

      {addSection && (
        <FormTable
          handleSubmit={handleSubmit}
          handleOnChange={handleOnChange}
          handleclose={() => setAddSection(false)}
          rest={formData}
        />
      )}

      {editSection && (
        <FormTable
          handleSubmit={handleUpdate}
          handleOnChange={handleEditOnChange}
          handleclose={() => setEditSection(false)}
          rest={formDataEdit}
        />
      )}

      <div className="w-full overflow-auto">
        {filterData().length > 0 ? (
          <div>
            <div className="flex justify-end w-full">
              <PdfFeedback data={reportData} fileName="Exam_Feedback" />
              <ExcelReportGenerator
                data={reportData}
                fileName="Exam_Feedback"
              />
            </div>

            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead sx={{ backgroundColor: "blue" }}>
                  <TableRow>
                    <TableCell sx={{ color: "white" }}>Feedback</TableCell>
                    <TableCell sx={{ color: "white" }}>Rate</TableCell>
                    <TableCell sx={{ color: "white" }}>Action</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {filterData().map((row) => (
                    <TableRow key={row._id}>
                      <TableCell>{row.Feedback}</TableCell>
                      <TableCell>{row.Rate}</TableCell>

                      <TableCell sx={{ display: "flex", gap: "10px" }}>
                        <Button
                          variant="contained"
                          onClick={() => handleEdit(row)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleDelete(row._id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ) : (
          <div className="text-center">No Feedback uploaded</div>
        )}
      </div>
    </div>
  );
};

export default ExamFeedback;
