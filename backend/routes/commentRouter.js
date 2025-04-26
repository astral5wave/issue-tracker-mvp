const express = require("express");
const router = express.Router();
const { getAllComments,postComment,deleteComment,editComment} = require("../controller/commentController.js")
const validateToken = require("../middleware/validateToken.js");

router.use(validateToken);

router.route("/:issueId")
    .get(getAllComments)
    .post(postComment)
router.route("/:issueId/:commentId")
    .delete(deleteComment)
    .put(editComment)

module.exports = router;