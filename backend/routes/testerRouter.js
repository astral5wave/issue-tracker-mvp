const express = require("express");
const router=express.Router();
const {registerTester,loginTester} =require("../controller/testerController.js")

router.route("/register")
    .post(registerTester)

router.route("/login")
    .post(loginTester)


module.exports = router;