const asyncHandeler = require("express-async-handler");
const Project = require("../models/projectModel.js");

//@desc Get All Project
//@route GET /api/project
const getAllProjects = asyncHandeler(async (req, res) => {
    try {
        const projects = await Project.find();
        return res.status(200).json(projects);
    }
    catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }
})

// @desc Add a New Project
// @route POST /api/project
const addProject = asyncHandeler(async (req, res) => {
    const { name, description, deadline } = req.body;

    if (!name || !description || !deadline) {
        return res.status(400).json({ message: "Project fields are required" });
    }

    const projectExists = await Project.findOne({ name });

    if (projectExists) {
        return res.status(400).json({ message: "Project already exists" });
    }

    try {
        const newProject = await Project.create({ name, description, deadline });
        return res.status(201).json(newProject);
    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }
});

// @desc Update a Project
// @route PUT /api/project/:id
const updateProject = asyncHandeler(async (req, res) => {
    const { id } = req.params;
    const { name, description, deadline,status } = req.body;

    try {
        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        project.name = name || project.name;
        project.description = description || project.description;
        project.deadline = deadline || project.deadline;
        project.status = status || project.status;

        const updatedProject = await project.save();
        return res.status(200).json(updatedProject);
    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }
});

// @desc Delete a Project
// @route DELETE /api/project/:id
const deleteProject = asyncHandeler(async (req, res) => {
    const { id } = req.params;

    try {
        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        await project.deleteOne();
        return res.status(200).json({ message: "Project deleted successfully", projectRemoved: project });
    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }
});

// @desc Get Project by Id
// @route GET /api/project/:id
const getProjectById = asyncHandeler(async (req, res) => {
    const { id } = req.params;
    try {
        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        return res.status(200).json(project);
    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }
});

module.exports = { getAllProjects, addProject, updateProject, deleteProject, getProjectById }