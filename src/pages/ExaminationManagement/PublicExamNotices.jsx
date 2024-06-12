/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { simpleNotification } from "../../utiles";
import "./style.css";
import { Close } from "@mui/icons-material";


import jsPDF from "jspdf";
import "jspdf-autotable";



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
import ExcelReportGenerator from "../../components/ExcelReportGenerator";

import PdfReport from "../../components/PdfReport";






const ReportGenerator = () => {
  const [data, setData] = useState({
    Description: "",
    Date: "",
    Time: "",
  });
}


const FormTable = ({
  handleSubmit,
  handleOnChange,
  handleclose,
  rest,
  errors,
}) => {
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

        <label htmlFor="Description">Description:</label>
        <input
          type="text"
          id="name"
          name="Description"
          onChange={handleOnChange}
          value={rest.Description}
        />
        {errors.Description && (
          <span className="text-red-600 text-[12px] pl-[14px] pt-[4px]">
            {errors.Description}
          </span>
        )}

        <label htmlFor="Date">Date:</label>
        <input
          type="date"
          id="email"
          name="Date"
          onChange={handleOnChange}
          value={rest.Date}
        />
        {errors.Date && (
          <span className="text-red-600 text-[12px] pl-[14px] pt-[4px]">
            {errors.Date}
          </span>
        )}

        <label htmlFor="Time">Time :</label>
        <input
          type="time"
          name="Time"
          id="mobile"
          onChange={handleOnChange}
          value={rest.Time}
        />
        {errors.Time && (
          <span className="text-red-600 text-[12px] pl-[14px] pt-[4px]">
            {errors.Time}
          </span>
        )}

        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  );
};

const PublicExamNotices = () => {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dataList, setDataList] = useState([]);
  const [formData, setFormData] = useState({
    Description: "",
    Date: "",
    Time: "",
  });
  const [formDataEdit, setFormDataEdit] = useState({
    Description: "",
    Date: "",
    Time: "",
    _id: "",
  });
  const [errors, setErrors] = useState({
    Description: "",
    Date: "",
    Time: "",
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
      Description: item.Description,
      Date: item.Date,
      Time: item.Time,
    };
  });

  useEffect(() => {
    getFetchData();
  }, []);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      if (formValidate()) {
        const data = await axios.post("/exam/publish-notice", formData);
        if (data.data.success) {
          setAddSection(false);
          getFetchData();
          simpleNotification("success", data.data.message);
          setFormData({
            Description: "",
            Date: "",
            Time: "",
          });
        }
      }
    } catch (error) {
      simpleNotification("error", "Error creating Notice");
    }
  };

  const getFetchData = async () => {
    try {
      const data = await axios.get("/exam/exam-notices");
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
      if (formValidate()) {
        const data = await axios.put(`/exam/update-exam-notice`, formDataEdit);

        if (data.data.success) {
          getFetchData();
          simpleNotification("success", data.data.message);
          setEditSection(false);
        }
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
    setErrors({ ...errors, [name]: "" });
  };

  const handleEdit = (e1) => {
    setFormDataEdit({
      Description: e1.Description,
      Date: e1.Date,
      Time: e1.Time,
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
          const data = await axios.delete(`/exam/delete-exam-notice/${id}`);

          if (data.data.success) {
            Swal.fire({
              title: "Deleted!",
              text: "Notice has been deleted.",
              icon: "success",
            });
            getFetchData();
          }
        }
      });
    } catch (error) {
      simpleNotification("error", "Error deleting Notice");
    }
  };

  const formValidate = () => {
    const errors = {};
    let formIsValid = true;

    if (addSection) {
      if (formData.Description.trim() === "") {
        errors.Description = "Description is required!";
        formIsValid = false;
      }

      if(new Date(formData.Date)<new Date().setHours(0,0,0,0))
        {
          errors.Date="Please select a future date!"
          formIsValid=false;
        }
      if (formData.Date.trim() === "") {
        errors.Date = "Date is required!";
        formIsValid = false;
      }
      if (formData.Time.trim() === "") {
        errors.Time = "Time is required!";
        formIsValid = false;
      }
    }

    if (editSection) {
      if (formDataEdit.Description.trim() === "") {
        errors.Description = "Description is required!";
        formIsValid = false;
      }
      if (formDataEdit.Date.trim() === "") {
        errors.Date = "Date is required!";
        formIsValid = false;
      }
      if (formDataEdit.Time.trim() === "") {
        errors.Time = "Time is required!";
        formIsValid = false;
      }
    }

    setErrors(errors);
    return formIsValid;
  };

  return (
    <div className="relative p-5 w-full h-full">
      <Typography variant="h4" pb={4}>
        Exam Notices
      </Typography>

      <div className="flex justify-between w-full mb-10">
        <Button variant="contained" onClick={() => setAddSection(true)}>
          Add
        </Button>

        <Box
          component="form"
          sx={{
            borderRadius: "5px",
            display: "flex",
            alignItems: "center",
            width: 400,
            gap: "10px",
            border: "1px solid black",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search by date"
            inputProps={{ "aria-label": "search google maps" }}
            type="date"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
          <Button variant="contained" onClick={() => setSearchQuery("")}>
            Clear date
          </Button>
        </Box>
      </div>

      {addSection && (
        <FormTable
          handleSubmit={handleSubmit}
          handleOnChange={handleOnChange}
          handleclose={() => {
            setErrors({ Description: "", Time: "", Date: "" });
            setAddSection(false);
          }}
          rest={formData}
          errors={errors}
          setErrors={setErrors}
        />
      )}

      {editSection && (
        <FormTable
          handleSubmit={handleUpdate}
          handleOnChange={handleEditOnChange}
          handleclose={() => {
            setErrors({ Description: "", Time: "", Date: "" });
            setEditSection(false);
          }}
          rest={formDataEdit}
          errors={errors}
          setErrors={setErrors}
        />
      )}

      <div className="w-full overflow-auto">
        {filterData().length > 0 ? (
          <div>


            <div className="flex justify-end w-full">
              <PdfReport data={reportData} fileName="Exam_Notices" />
              <ExcelReportGenerator data={reportData} fileName="Exam_Notices" />
            </div>


            
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead sx={{ backgroundColor: "blue" }}>
                  <TableRow>
                    <TableCell sx={{ color: "white" }}>Description</TableCell>
                    <TableCell sx={{ color: "white" }}>Date</TableCell>
                    <TableCell sx={{ color: "white" }}>Time</TableCell>
                    <TableCell sx={{ color: "white" }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filterData().map((row) => (
                    <TableRow key={row._id}>
                      <TableCell>{row.Description}</TableCell>
                      <TableCell>{row.Date}</TableCell>
                      <TableCell>{row.Time}</TableCell>
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
          <div className="text-center">No notices uploaded</div>
        )}
      </div>
    </div>
  );
};

export default PublicExamNotices;
