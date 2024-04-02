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