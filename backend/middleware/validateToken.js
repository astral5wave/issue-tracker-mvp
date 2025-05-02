const jwt= require("jsonwebtoken");
const asyncHandeler = require("express-async-handler");


const validToken =asyncHandeler (async (req,res,next)=>{
    const authHeader= req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        const token=authHeader.split(" ")[1];
        try{
            const memberData =jwt.verify(token,process.env.SECRET);
            req.memberData=memberData;     //req now have the member data in it.
            next();
        }
        catch(e){
            res.status(400).send("Error occured during Token validation")
        }
    }else{
        res.status(400).send("Enter a valid token to continue")
    }
})

module.exports=validToken;