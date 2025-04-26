const express = require("express");
const router = express.Router();
const { createIssue,getAllIssues,updateIssueContentByTester,updateIssueContentByDeveloper} = require("../controller/issueController.js")
const validateToken=require("../middleware/validateToken.js");

router.use(validateToken);

router.route("/")
    .post(createIssue)
    .get(getAllIssues)

router.route("/:issueId/tester")
    .put(updateIssueContentByTester)

router.route("/:issueId/developer")
    .put(updateIssueContentByDeveloper)

module.exports = router;