import React, { useState, useEffect } from "react";
import "./App.css";
import StudentTable from "./Components/StudentTable";
import DrawerComponent from "./Components/DrawerComponent";
import Form from "./Components/Form";
import { Typography, Box } from "@mui/material";
import AddStudentMessage from "./Components/AddStudentMessage";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [forms, setNewForms] = useState([]);

  useEffect(() => {
    const storedForms = JSON.parse(localStorage.getItem("forms")) || [];
    setNewForms(storedForms);
  }, []);
  const updateLocalStorage = (newForms) => {
    localStorage.setItem("forms", JSON.stringify(newForms));
  };

  const handleAddButtonClick = () => {
    setShowForm(true);
  };

  const handleModalClose = () => {
    setShowForm(false);
  };

  const handleNewForms = (
    studentID,
    studentName,
    studentClass,
    studentScore,
    studentResult,
    studentGrade
  ) => {
    const newForms = [
      ...forms,
      {
        id: studentID,
        name: studentName,
        class: studentClass,
        score: studentScore,
        result: studentResult,
        grade: studentGrade,
      },
    ];
    setNewForms(newForms);
    updateLocalStorage(newForms);
  };

  const handleDeleteForm = (formId) => {
    const newForms = forms.filter((form) => form !== formId);
    setNewForms(newForms);
    updateLocalStorage(newForms);
  };

  const handleUpdateForm = (formId, updatedData) => {
    const updatedForms = forms.map((form) =>
      form.id === formId ? { ...form, ...updatedData } : form
    );
    setNewForms(updatedForms);
    updateLocalStorage(updatedForms);
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

        <StudentTable
          forms={forms}
          onclickDelete={handleDeleteForm}
          onClickEdit={handleUpdateForm}
          handleModalClose={handleModalClose}
        />
        <Box
          sx={{
            bottom: 0,
          }}
        >
          <Typography sx={{ margin: "0px", padding: "0px", zIndex: 2 }}>
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
