const asyncHandeler = require("express-async-handler");
const Department = require("../models/departmentModel.js");

//@desc Get All Department
//@route GET /api/department
const getAllDepartments = asyncHandeler(async (req, res) => {
    try {
        const departments = await Department.find();
        return res.status(200).json(departments);
    }
    catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }
})

// @desc Add a New Department
// @route POST /api/department
const addDepartment = asyncHandeler(async (req, res) => {
    const { name, description } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Department name is required" });
    }

    const departmentExists = await Department.findOne({ name });

    if (departmentExists) {
        return res.status(400).json({ message: "Department already exists" });
    }

    try {
        const newDepartment = await Department.create({ name, description });
        res.status(201).json(newDepartment);
    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }
});

// @desc Update a Department
// @route PUT /api/department/:id
const updateDepartment = asyncHandeler(async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
        const department = await Department.findById(id);

        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }

        department.name = name || department.name;
        department.description = description || department.description;

        const updatedDepartment = await department.save();
        res.status(200).json(updatedDepartment);
    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }
});

// @desc Delete a Department
// @route DELETE /api/department/:id
const deleteDepartment = asyncHandeler(async (req, res) => {
    const { id } = req.params;

    try {
        const department = await Department.findById(id);

        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }

        await department.deleteOne();
        res.status(200).json({ message: "Department deleted successfully", departmentRemoved: department });
    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }
});

// @desc Get Department by Id
// @route GET /api/department/:id
const getDepartmentById = asyncHandeler(async (req, res) => {
    const { id } = req.params;
    try {
        const department = await Department.findById(id);

        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }
        res.status(200).json(department);
    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }
});

module.exports = { getAllDepartments, addDepartment, updateDepartment, deleteDepartment, getDepartmentById }