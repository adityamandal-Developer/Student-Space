import React, { useState } from "react";
import "./App.css";
import StudentTable from "./Components/StudentTable";
import DrawerComponent from "./Components/DrawerComponent";
import Form from "./Components/Form";
import { Typography, Box } from "@mui/material";
import AddStudentMessage from "./Components/AddStudentMessage";

function App() {
  const [showForm, setShowForm] = useState(false);

  const handleAddButtonClick = () => {
    setShowForm(true);
  };

  const handleModalClose = () => {
    setShowForm(false);
  };
  const [forms, setNewForms] = useState([]);
  const handleNewForms = (
    studentName,
    studentClass,
    studentScore,
    studentResult,
    studentGrade
  ) => {
    const newforms = [
      ...forms,
      {
        name: studentName,
        class: studentClass,
        score: studentScore,
        result: studentResult,
        grade: studentGrade,
      },
    ];
    setNewForms(newforms);
  };
  const handleDeleteForm = (formName) => {
    const newforms = forms.filter((form) => form !== formName);
    setNewForms(newforms);
  };
  return (
    <div className="flex-container">
      <div className="drawer">
        <DrawerComponent
          sx={{ boxShadow: "0px 3px 14px 2px rgba(0, 0, 0, 0.05)" }}
        />
      </div>

      <div className="content">
        <div className="heading">
          <h1 className="students">Students</h1>
          <button
            type="button"
            className="add-button"
            onClick={handleAddButtonClick}
          >
            + ADD
          </button>
        </div>

        <StudentTable forms={forms} onclickDelete={handleDeleteForm} />
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
          }}
        >
          <Typography sx={{ margin: "8px" }}>
            showing {forms.length} of {forms.length} entries
          </Typography>
        </Box>
        {forms.length === 0 && <AddStudentMessage />}
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <Form
              newFormData={handleNewForms}
              handleModalClose={handleModalClose}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
