import React from "react";

const Table = () => {
  return (
    <div className="timetable" id="timetable">
      <h2>Today's Timetable</h2>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Room No.</th>
            <th>Subject</th>
            <th></th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
};

export default Table;
