import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
function createData(subject, room, time, type, teacher) {
  return { subject, room, time, type, teacher };
}
const rows = [
  createData("Physics", "A-102", "9:00 AM", "Lecture", "HSK"),
  createData("Maths-2", "A-102", "10:00AM", "Lecture", "KKK"),
  createData("Mechanics", "F-205", "10:15AM", "Lab", "EMR"),
  createData("Graphics", "F-307", "1:00PM", "Lecture", "AAC"),
  createData("BEE", "F-306", "2:00PM", "Lecture", "ASB"),
];

export default function TimeTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} className="table">
        <TableHead>
          <TableRow>
            <TableCell className="table-header" align="center">
              <span className="table-header">Subject</span>
            </TableCell>
            <TableCell align="center">
              <span className="table-header">Room</span>
            </TableCell>
            <TableCell className="table-header" align="center">
              <span className="table-header">Time</span>
            </TableCell>
            <TableCell className="table-header" align="center">
              <span className="table-header">Type</span>
            </TableCell>
            <TableCell className="table-header" align="center">
              <span className="table-header">Teacher</span>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.time}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">
                <span className="table-content">{row.subject}</span>
              </TableCell>
              <TableCell align="center">
                <span className="table-content"> {row.room}</span>
              </TableCell>
              <TableCell align="center">
                <span className="table-content">{row.time}</span>
              </TableCell>
              <TableCell align="center">
                <span className="table-content">{row.type}</span>
              </TableCell>
              <TableCell align="center">
                <span className="table-content">{row.teacher}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
