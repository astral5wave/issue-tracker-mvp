const express = require("express");
const router=express.Router();
const {registerDeveloper,loginDeveloper,assignFields} =require("../controller/developerController.js")
const validateToken=require("../middleware/validateToken.js")

router.route("/register")
    .post(registerDeveloper)

router.route("/login")
    .post(loginDeveloper)

// router.use(validateToken);

router.patch("/:username/assignFields",assignFields);

module.exports = router;