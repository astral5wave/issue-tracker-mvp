const express=require('express');
require('dotenv').config()
const errorHandler = require('./middleware/errorHandler');
const connectDB=require("./config/connectDB")
const PORT=process.env.PORT||80000;
const  cors = require('cors')
const app=express();
const validateToken=require('./middleware/validateToken');


app.use(cors());
connectDB();
app.use(express.json())

app.use("/api/developer",require("./routes/developerRouter"));
app.use("/api/tester",require("./routes/testerRouter"));
app.use("/api/department",require("./routes/departmentRouter"));
app.use("/api/project",require("./routes/projectRouter"));
app.use("/api/issue",require("./routes/issueRouter"));
app.use("/api/comment",require("./routes/commentRouter"));
// app.use("/api/notification",require("./routes/notificationRouter"));


app.get("/member",validateToken,(req,res)=>{
    const {memberData}=req;
    return res.status(200).json({
        member:{
            role:memberData.role,
            id:memberData.data.id,
            name:memberData.data.name,
            email:memberData.data.email,
            userName:memberData.data.email,

        }
    });
});

app.get("/",(req,res)=>{
    res.send({message:"Hi"})
})

app.use(errorHandler);
app.listen(PORT,()=>{
    console.log(`Server running on the port:`,PORT);
})