import React, { useState } from "react";
import "./forms.css";
import { Divider, Typography, Box } from "@mui/material";
import { useEffect } from "react";

function Form({ newFormData, handleModalClose }) {
  const [studentName, setStudentName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [studentScore, setStudentScore] = useState("");
  const [studentResult, setStudentResult] = useState("-");
  const [studentGrade, setStudentGrade] = useState("-");
  const [nameError, setNameError] = useState("");
  const [classError, setClassError] = useState("");
  const [scoreError, setScoreError] = useState("");

  const handleNameChange = (event) => {
    setStudentName(event.target.value);
    setNameError(""); // Clear error when the user starts typing again
  };

  const handleClassChange = (event) => {
    const value = event.target.value;
    setStudentClass(value);

    // Additional validation: Check if the entered value is a valid integer
    if (!/^\d+$/.test(value)) {
      setClassError("Please enter a valid numerical value for Student Class");
      return;
    }

    // Clear class error when the user starts typing again
    setClassError("");

    // Use useEffect to update studentResult and studentGrade after studentClass has changed
    // useEffect(() => {
    //   // Update studentResult and studentGrade states based on the calculated result
    //   const result = calculateStudentResult(studentScore);
    //   setStudentResult(result);
    //   const grade = calculateGrade(studentScore);
    //   setStudentGrade(grade);
    // }, [studentScore, value]);
  };

  const handleScoreChange = (event) => {
    const score = event.target.value;
    setStudentScore(score);

    // Update studentResult and studentGrade states based on the calculated result
    const result = calculateStudentResult(score);
    setStudentResult(result);
    const grade = calculateGrade(score);
    setStudentGrade(grade);
    setScoreError(""); // Clear error when the user starts typing again
  };

  const checkError = () => {
    // Check if studentName is empty
    if (studentName.trim() === "") {
      setNameError("Student Name cannot be empty");
      return true;
    }

    // Check if studentClass is not in the range of 1-12
    const classValue = parseInt(studentClass, 10);
    if (isNaN(classValue) || classValue < 1 || classValue > 12) {
      setClassError(
        "Please input valid values between 1 & 12 for Student Class"
      );
      return true;
    }

    // Check if studentScore is not in the range of 0-100
    const scoreValue = parseInt(studentScore, 10);
    if (isNaN(scoreValue) || scoreValue < 0 || scoreValue > 100) {
      setScoreError(
        "Please input valid values between 0 & 100 for Student Score"
      );
      return true;
    }

    // If all conditions pass, return false (no error)
    return false;
  };

  const handleAddButtonClicked = () => {
    // Check for errors before proceeding
    if (checkError()) {
      return; // Don't proceed if there is an error
    }

    // Pass form data to the newFormData function
    newFormData(
      studentName,
      studentClass,
      studentScore,
      studentResult,
      studentGrade
    );

    // Reset form fields
    setStudentName("");
    setStudentClass("");
    setStudentScore("");
    setStudentResult("-");
    setStudentGrade("-");
    handleModalClose();
  };

  return (
    <div className="forms">
      <Typography variant="h6" gutterBottom>
        Add Student
      </Typography>
      <Divider />

      <h1 className="form-text">STUDENT NAME*</h1>
      <input
        type="text"
        placeholder="Enter Student"
        value={studentName}
        onChange={handleNameChange}
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
        type="text"
        placeholder="Enter Student Class"
        value={studentClass}
        onChange={handleClassChange}
      />
      {classError ? (
        <div
          className="error-message"
          style={{ color: "red", fontStyle: "italic", margin: "0px" }}
        >
          {classError}
        </div>
      ) : (
        <div className="default-message" style={{ margin: "0px" }}>
          <h4>Please input values between 1 & 12</h4>
        </div>
      )}

      <h1 className="form-text">STUDENT SCORE*</h1>
      <input
        type="text"
        placeholder="Enter Student Score"
        value={studentScore}
        onChange={handleScoreChange}
      />
      {scoreError ? (
        <p
          className="error-message"
          style={{ color: "red", fontStyle: "italic", margin: "0px" }}
        >
          {scoreError}
        </p>
      ) : (
        <div className="default-message" style={{ margin: "0px" }}>
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
        sx={{
          color:
            studentGrade === "poor"
              ? "error.main"
              : studentGrade === "Average"
              ? "info.main"
              : studentGrade === "Excellent"
              ? "success.main"
              : "inherit", // Default color
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
            handleAddButtonClicked();
          }}
        >
          CONFIRM
        </button>
      </div>
    </div>
  );

  function calculateStudentResult(studentScore) {
    if (studentScore >= 0 && studentScore <= 30) {
      return "Failed";
    } else if (studentScore >= 31 && studentScore <= 75) {
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
}

export default Form;
