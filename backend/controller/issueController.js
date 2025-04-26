const asyncHandeler = require("express-async-handler");
const Issue = require("../models/issueModel");
const Developer = require("../models/developerModel");

//@desc Create Issue
//@route POST /api/issue/
const createIssue = asyncHandeler(async (req, res) => {
    const { memberData } = req;
    if (memberData.role === "tester") {
        const { title, description, priority, createdBy, assignedTo, project } = req.body;
        if (!title || !description || !priority || !createdBy || !assignedTo || !project) {
            return res.status(400).json({ message: "All issue fields required" });
        }
        try {
            const issue = await Issue.create({ title, description, priority, createdBy, assignedTo, project });
            return res.status(200).json(issue);
        }
        catch (e) {
            console.log(e);
            return res.status(400).send(e);
        }


    } else {
        return res.status(403).json({ message: "User not authorize to create issue request" })
    }
})

//@desc Get issues based on role
//@route GET /api/issue/
const getAllIssues = asyncHandeler(async (req, res) => {
    const { memberData } = req;
    if (memberData.role === "tester") {
        try {
            const issues = await Issue.find({ createdBy: memberData.data.id });
            return res.status(200).json(issues);
        } catch (e) {
            console.log(e.message);
            return res.status(500).json({ message: e.message });
        }
    }
    else if (memberData.role === "developer") {
        try {
            const developer = await Developer.findOne({ _id: memberData.data.id }, 'department  project').lean();
            const departmentId = developer?.department;
            const projectId = developer?.project;
            const issues = await Issue.find({ assignedTo: departmentId,project:projectId });
            return res.status(200).json(issues);
        } catch (e) {
            console.log(e.message);
            return res.status(500).json({ message: e.message });
        }
    }
    else {
        return res.status(403).json({ message: "User not authorized to get issues" })
    }
})

//@desc Update issues by tester
//@route PUT /api/issue/:issueId/tester
const updateIssueContentByTester = asyncHandeler(async (req, res) => {
    const { issueId } = req.params;
    const { memberData } = req;
    const { title, description, priority, assignedTo, project } = req.body;
    if(memberData.role!=="tester"){
        return res.status(403).json({message:"User is not authorize to update issue content"});
    }
    try {
        const issue = await Issue.findOne({ _id: issueId, createdBy: memberData.data.id });
        if (!issue) {
            return res.status(400).json({ message: "No such issue found corresponds to given issueId" });
        }
        issue.title = title || issue.title;
        issue.description = description || issue.description;
        issue.priority = priority || issue.priority;
        issue.assignedTo = assignedTo || issue.assignedTo;
        issue.project = project || issue.project;
        await issue.save();
        return res.status(200).json(issue);
    } catch (e) {
        console.log(e.message);
        return res.status(500).json({ message: e.message });
    }
})

//@desc Update issues by developer
//@route PUT /api/issue/:issueId/developer
const updateIssueContentByDeveloper = asyncHandeler(async (req, res) => {
    const { issueId } = req.params;
    const { memberData } = req;
    const { status } = req.body;
    if(memberData.role!=="developer"){
        return res.status(403).json({message:"User is not authorize to update issue content"});
    }
    try {
        const issue = await Issue.findOne({ _id: issueId});
        if (!issue) {
            return res.status(400).json({ message: "No such issue found corresponds to given issueId" });
        }
        issue.status = status || issue.status;
        await issue.save();
        return res.status(200).json(issue);
    } catch (e) {
        console.log(e.message);
        return res.status(500).json({ message: e.message });
    }
})

module.exports = { createIssue, getAllIssues, updateIssueContentByTester, updateIssueContentByDeveloper }