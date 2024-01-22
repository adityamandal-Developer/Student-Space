import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Divider, Typography, Box } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ConfirmDelete from "./ConfirmDelete";
import { useState } from "react";
import EditForm from "./EditForm";

const StudentTable = ({
  forms,
  onclickDelete,
  newFormData,
  handleModalClose,
  onClickEdit,
}) => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
    "&:hover": {
      backgroundColor: "#F1F4F8",
      transition: "background-color 0.3s ease-in-out",
    },
  }));
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [showEditForm, setshowEditForm] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(null);

  const handleDeleteButtonClicked = (student) => {
    setStudentToDelete(student);
    setShowDeleteForm(true);
  };

  const handleDeleteButtonClickedClose = () => {
    setStudentToDelete(null);
    setShowDeleteForm(false);
  };

  const handleEditButtonClicked = (student) => {
    setStudentToEdit(student);
    setshowEditForm(true);
  };
  const handleEditButtonClickedClose = () => {
    setStudentToEdit(null);
    setshowEditForm(false);
  };

  const handleDeleteConfirmation = () => {
    if (studentToDelete) {
      onclickDelete(studentToDelete);
      setStudentToDelete(null);
      setShowDeleteForm(false);
    }
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">No.</StyledTableCell>
            <StyledTableCell>Student</StyledTableCell>
            <StyledTableCell align="center">Class</StyledTableCell>
            <StyledTableCell align="center">Result</StyledTableCell>
            <StyledTableCell align="center">Score</StyledTableCell>
            <StyledTableCell align="center">Grade</StyledTableCell>
            <StyledTableCell align="center">‎ ‎ ‎‎ ‎ ‎ ‎ ‎ ‎ ‎</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {forms.map((student, index) => (
            <StyledTableRow key={index + 1} className="table-row">
              <StyledTableCell align="left">
                {(student.id = index + 1)}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {student.name}
              </StyledTableCell>
              <StyledTableCell align="center">{student.class}</StyledTableCell>
              <StyledTableCell align="center">
                <Box
                  sx={{
                    bgcolor:
                      student.result === "Failed"
                        ? "error.main"
                        : student.result === "Passed"
                        ? "success.main"
                        : "inherit",
                    borderRadius: "20px",
                    textAlign: "center",
                    color: "white",
                    fontSize: "12px",
                    lineHeight: "3",
                    margin: "0",
                    fontWeight: "200",
                    height: "100%",
                    width: "100%",

                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {student.result}
                </Box>
              </StyledTableCell>
              <StyledTableCell align="center">{student.score}</StyledTableCell>
              <StyledTableCell align="center">
                <Typography component="div" variant="body1">
                  <Box
                    sx={{
                      color:
                        student.grade === "poor"
                          ? "error.main"
                          : student.grade === "Average"
                          ? "info.main"
                          : student.grade === "Excellent"
                          ? "success.main"
                          : "inherit",
                    }}
                  >
                    {student.grade}
                  </Box>
                </Typography>
              </StyledTableCell>
              <StyledTableCell className="edit-form1" align="center">
                <div className="edit-form">
                  <div
                    className="delete-icon"
                    onClick={() => handleDeleteButtonClicked(student)}
                  >
                    <DeleteOutlineOutlinedIcon />
                  </div>
                  {showDeleteForm && (
                    <div className="modal-overlay">
                      <div className="modal">
                        <ConfirmDelete
                          student={studentToDelete}
                          onclickDelete={handleDeleteConfirmation}
                          setShowDeleteForm={handleDeleteButtonClickedClose}
                        />
                      </div>
                    </div>
                  )}

                  <div
                    className="edit-icon"
                    onClick={() => handleEditButtonClicked(student)}
                  >
                    <EditOutlinedIcon />
                  </div>
                  {showEditForm && (
                    <div className="modal-overlay">
                      <div className="modal">
                        <EditForm
                          onClickEdit={onClickEdit}
                          newFormData={newFormData}
                          student={studentToEdit}
                          handleModalClose={handleEditButtonClickedClose}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentTable;
