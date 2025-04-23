const express = require("express");
const router = express.Router();
const { } = require("../controller/issueController.js")
const validateToken=require("../middleware/validateToken.js");

router.use(validateToken);

router.route("/")
    .post(createIssue)
    .get(getAllIssues)

router.route("/:id/tester")
    .put(updateIssueContentByTester)

router.route("/:id/developer")
    .put(updateIssueContentByDeveloper)

module.exports = router;