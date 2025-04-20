const express=require('express');
require('dotenv').config()
const mongoose = require('mongoose');
const errorHandler = require('./middleware/errorHandler');

const PORT=process.env.PORT||80000;
const DBConnection=process.env.DATABASE_STRING;
const app=express();
const dbconnect=async ()=>{
    await mongoose.connect(DBConnection);
    console.log("DB Connceted Successfully");
}



dbconnect();
app.use(express.json())
app.get("/",(req,res)=>{
    res.send({message:"Hi"})
})
app.use(errorHandler);
app.listen(PORT,()=>{
    console.log(`Server running on the port:`,PORT);
})