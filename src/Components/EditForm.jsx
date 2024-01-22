import React, { useState, useEffect } from "react";
import { Divider, Typography, Box } from "@mui/material";
import "./Editform.css";

const EditForm = ({ onClickEdit, newFormData, student, handleModalClose }) => {
  const [editedStudent, setEditedStudent] = useState({
    name: student.name,
    class: student.class,
    score: student.score,
    result: student.result,
    grade: student.grade,
  });
  const [nameError, setNameError] = useState("");
  const [classError, setClassError] = useState("");
  const [scoreError, setScoreError] = useState("");
  const [studentResult, setStudentResult] = useState("-");
  const [studentGrade, setStudentGrade] = useState("-");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update the relevant state variable based on the input name
    if (name === "score") {
      setEditedStudent((prevStudent) => ({
        ...prevStudent,
        [name]: value,
      }));

      // Calculate and update result and grade in real-time
      const updatedResult = calculateStudentResult(value);
      const updatedGrade = calculateGrade(value);
      setStudentResult(updatedResult);
      setStudentGrade(updatedGrade);
    } else {
      setEditedStudent((prevStudent) => ({
        ...prevStudent,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    const updatedResult = calculateStudentResult(editedStudent.score);
    const updatedGrade = calculateGrade(editedStudent.score);

    setEditedStudent((prevStudent) => ({
      ...prevStudent,
      result: updatedResult,
      grade: updatedGrade,
    }));
  }, [editedStudent.score]);

  const checkError = () => {
    if (editedStudent.name.trim() === "") {
      setNameError("Student Name cannot be empty");
      return true;
    }

    const classValue = parseInt(editedStudent.class, 10);
    if (!/^\d+$/.test(classValue) || classValue < 1 || classValue > 12) {
      setClassError(
        "Please input valid values between 1 & 12 for Student Class"
      );
      return true;
    }

    const scoreValue = parseInt(editedStudent.score, 10);
    if (!/^\d+$/.test(scoreValue) || scoreValue < 0 || scoreValue > 100) {
      setScoreError(
        "Please input a valid number between 0 and 100 for Student Score"
      );
      return true;
    }
  };
  const handleEdit = () => {
    if (checkError()) {
      return;
    }
    onClickEdit(student.name, editedStudent); //i have taken student name for identification
    handleModalClose();
  };

  return (
    <div className="forms">
      <Typography variant="h6" gutterBottom className="editForm-heading">
        Edit Student
      </Typography>
      <Divider />

      <h1 className="form-text">STUDENT NAME*</h1>
      <input
        autoComplete="off"
        type="text"
        placeholder="Enter Student"
        label="Name"
        name="name"
        value={editedStudent.name}
        onChange={handleChange}
      />
      {nameError ? (
        <div
          className="error-message"
          style={{ color: "red", fontStyle: "italic", margin: "0px" }}
        >
          {nameError}
        </div>
      ) : (
        <div className="default-message" style={{ margin: "0px" }}></div>
      )}

      <h1 className="form-text">STUDENT CLASS*</h1>
      <input
        type="number"
        placeholder="Enter Student Class"
        label="Class"
        name="class"
        value={editedStudent.class}
        onChange={handleChange}
        autoComplete="off"
      />
      {classError ? (
        <div
          className="error-message"
          style={{ color: "red", fontStyle: "italic", margin: "0px" }}
        >
          {classError}
        </div>
      ) : (
        <div
          className="default-message"
          style={{ margin: "0px", textAlign: "left" }}
        >
          <h4>Please input values between 1 & 12</h4>
        </div>
      )}

      <h1 className="form-text">STUDENT SCORE*</h1>
      <input
        type="number"
        placeholder="Enter Student Score"
        name="score"
        value={editedStudent.score}
        onChange={handleChange}
        autoComplete="off"
      />
      {scoreError ? (
        <p
          className="error-message"
          style={{ color: "red", fontStyle: "italic", margin: "0px" }}
        >
          {scoreError}
        </p>
      ) : (
        <div
          className="default-message"
          style={{ margin: "0px", textAlign: "left" }}
        >
          <h4>Please input values between 0 & 100</h4>
        </div>
      )}

      <h1 className="form-text">RESULT*</h1>
      <Box
        sx={{
          bgcolor:
            studentResult === "Failed"
              ? "error.main"
              : studentResult === "Passed"
              ? "success.main"
              : "inherit", // Default color
          borderRadius: "20px",
          textAlign: "center",
          color: "white",
          fontSize: "12px",
          lineHeight: "2",
          fontWeight: "200",
          width: "30%",
        }}
      >
        {studentResult}
      </Box>

      <h1 className="form-text">GRADE*</h1>
      <Box
        className="grade-text"
        sx={{
          color:
            studentGrade === "poor"
              ? "error.main"
              : studentGrade === "Average"
              ? "info.main"
              : studentGrade === "Excellent"
              ? "success.main"
              : "inherit",
          textAlign: "left",
        }}
      >
        {studentGrade}
      </Box>
      <Divider />
      <div className="form-action">
        <button
          type="button"
          className="action-button1"
          onClick={() => handleModalClose()}
        >
          CANCEL
        </button>
        <button
          type="button"
          className="action-button2"
          onClick={() => {
            handleEdit();
          }}
        >
          SAVE
        </button>
      </div>
    </div>
  );
  function calculateStudentResult(studentScore) {
    if (studentScore >= 0 && studentScore <= 30) {
      return "Failed";
    } else if (studentScore >= 31 && studentScore <= 100) {
      return "Passed";
    } else if (studentScore >= 76 && studentScore <= 100) {
      return "Passed";
    } else {
      return "INVALID STUDENT SCORE, SCORE MUST BE BETWEEN 0-100";
    }
  }

  function calculateGrade(studentScore) {
    if (studentScore >= 0 && studentScore <= 30) {
      return "poor";
    } else if (studentScore >= 31 && studentScore <= 75) {
      return "Average";
    } else if (studentScore >= 76 && studentScore <= 100) {
      return "Excellent";
    } else {
      return "INVALID STUDENT SCORE, SCORE MUST BE BETWEEN 0-100";
    }
  }
};

export default EditForm;
