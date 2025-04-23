const express = require("express");
const router = express.Router();
const { registerTester, loginTester, assignFields } = require("../controller/testerController.js")

router.route("/register")
    .post(registerTester)

router.route("/login")
    .post(loginTester)

// router.use(validateToken);

router.patch("/:username/assignFields", assignFields);

module.exports = router;