const express = require("express");
const router = express.Router();
const { getAllDepartments, addDepartment, updateDepartment, deleteDepartment, getDepartmentById} = require("../controller/departmentController.js")

router.route("/")
    .get(getAllDepartments)
    .post(addDepartment)
router.route("/:id")
    .get(getDepartmentById)
    .put(updateDepartment)
    .delete(deleteDepartment)

module.exports = router;