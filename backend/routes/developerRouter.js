const express = require("express");
const router=express.Router();
const {registerDeveloper,loginDeveloper} =require("../controller/developerController.js")

router.route("/register")
    .post(registerDeveloper)

router.route("/login")
    .post(loginDeveloper)


module.exports = router;