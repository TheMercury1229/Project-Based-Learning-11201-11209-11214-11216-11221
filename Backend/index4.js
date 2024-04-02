import  db  from "./db.js";
try {
    db.connect();
} catch (error) {
    console.log("error");
}
async function doLogic(rollno){
   return new Promise(async (resolve , reject)=>{
    const result = await db.query("SELECT * FROM attendance_real WHERE rollno = $1 AND (subject_id = 1 OR  subject_id=2 OR  subject_id = 3 OR subject_id = 4 OR subject_id = 5 )",[rollno])
            let totalDays = 0;
            let presentDays = 0;
            result.rows.forEach(element => {
                totalDays += parseInt(element.conducted);
                console.log(element.conducted);
                console.log("------------")
                console.log(element.attended);
    
                presentDays += parseInt(element.attended);
            });
            console.log("-----------");
            console.log("-----------");
            console.log("-----------");
            console.log(totalDays);
            let insert = true;
            console.log(presentDays);
            if((presentDays/totalDays)*100 < 75)
            {
                // await db.query("INSERT INTO defaulter (rollno , isdefaulter) VALUES ($1,$2)" , [rollno , insert])
                resolve(true);
            }else{
                insert = false;
                await db.query("INSERT INTO defaulter (rollno , isdefaulter) VALUES ($1,$2)" , [rollno , insert])
                resolve(false);
            }
   })
}
async function getData(){
    const result = await  db.query(`SELECT * FROM attendance_real`);
    const  data=result.rows;
    // console.log(data);
    for(var i = 11201 ; i<11264;i++)
    {
        if(i!=11204 && i!=11211)
        {
            await doLogic(i);
        }
        
    }
    
}
getData().then((response)=>{
    console.log("done")
});