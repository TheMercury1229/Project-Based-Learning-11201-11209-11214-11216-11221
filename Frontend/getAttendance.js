fetch("http://localhost:3000/attendance/getAllSubjectAttendance",{
          method : 'GET' , 
          headers:{
            token : "eyJhbGciOiJIUzI1NiJ9.MTEyMDEsJDJiJDEwJHc0Z0NQTWhmNjRQR2NqL1NYZkFzQS5jcWRTZ0J3Y3plTmRnUk9PWllWVWVrTHkyamVqdEhDLHN0dWRlbnQ.O2JOa3m0wxP9mw3S04ge-eXYaeSyArL5CQLtC4yHxng",
            "Content-type" : "application/json"
          },
        }).then((response)=>{
          response.json().then((data)=>{
            const attendance = data.data;
            console.log(attendance);
        })
    })


    <section className="attendance">
      <div className="top">
        <h1>Mark Attendance</h1>
        <div className="sub-heading">
          <h3>
            Sub-Name: <span>Maths</span>
          </h3>
          <h3>
            Class: <span>FE-12</span>
          </h3>
        </div>
      </div>
      <div className="middle">
        <div style={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            checkboxSelection
            className="attendance-div"
            sx={{
              boxShadow: 2,
              marginInline: "auto",
              color: "var(--color-dark)",
              fontSize: "17px",
              textAlign: "center",
              "& .MuiDataGrid-cell:hover": {
                color: "#545dae;",
                fontWeight: "600",
              },
            }}
            onRowSelectionModelChange={(row) => handleSelectionChange(row)}
          />
        </div>
      </div>
      <div className="bottom">
        <Button text="Mark Attendance" onClick={markAttendanceHandler} />
      </div>
    </section>

//niche wala is marks

<section className="marks">
        <div className="top">
          <h1>Give Marks</h1>
          <div className="sub-heading">
            <h3>
              Sub-Name: <span>Maths</span>
            </h3>
            <h3>
              Class: <span>FE-12</span>
            </h3>
          </div>
        </div>
        <div className="middle">
          <div style={{ height: 600, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              className="attendance-div"
              sx={{
                boxShadow: 2,
                marginInline: "auto",
                color: "var(--color-dark)",
                fontSize: "17px",
                textAlign: "center",
                "& .MuiDataGrid-cell:hover": {
                  color: "#545dae;",
                  fontWeight: "600",
                },
              }}
            />
          </div>
        </div>
        <div className="bottom">
          <Button
            text={`${updateMarks ? "Update Marks" : "Marks Updated"}`}
            onClick={() => setUpdateMarks(false)}
          />
        </div>
      </section>