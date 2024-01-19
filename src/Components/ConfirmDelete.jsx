import React from "react";
import { Divider, Typography, Box } from "@mui/material";
import "./confirmDelete.css";
function ConfirmDelete({ student, onclickDelete, setShowDeleteForm }) {
  return (
    <div className="delete-confirm">
      <Typography variant="h6" gutterBottom className="remove-student">
        Remove Student
      </Typography>
      <Divider />
      <h3>
        Are you sure you want to remove the current student from the list?
      </h3>
      <h1 className="form-text">STUDENT NAME</h1>
      <h3>{student.name}</h3>

      <h1 className="form-text">STUDENT CLASS*</h1>
      <h3>{student.class}</h3>
      <Divider />
      <div className="form-action">
        <button
          type="button"
          className="cancle-button"
          onClick={() => setShowDeleteForm()}
        >
          CANCEL
        </button>
        <button
          type="button"
          className="delte-button"
          onClick={() => onclickDelete(student)}
        >
          REMOVE
        </button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
