const mongoose = require("mongoose");

const connectDB = async ()=>{
    try{
        const connect= await mongoose.connect(process.env.DATABASE_STRING);       //try to connect with atlas
        console.log("Database Connected");
    }
    catch(err){
        console.log(err.message);
        process.exit(1);                     //if error occured then this will terminates the running server as db is not connected, Restart to see if it connects again or not.
    }
}

module.exports= connectDB;