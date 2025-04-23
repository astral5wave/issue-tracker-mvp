const express = require("express");
const router = express.Router();
const { getAllProjects, addProject, updateProject, deleteProject, getProjectById} = require("../controller/projectController.js")

router.route("/")
    .get(getAllProjects)
    .post(addProject)
router.route("/:id")
    .get(getProjectById)
    .put(updateProject)
    .delete(deleteProject)

module.exports = router;