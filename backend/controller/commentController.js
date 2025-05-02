const asyncHandeler = require("express-async-handler");
const mongoose = require("mongoose");
const Comment = require("../models/commentModel");
const Issue = require("../models/issueModel");
const Developer = require("../models/developerModel");
const Tester = require("../models/testerModel");

//@desc Create a comment
//@route POST /api/comment/:issueId
const postComment = asyncHandeler(async (req, res) => {
    const { issueId } = req.params;
    const { memberData } = req;
    const { description } = req.body;

    if (!issueId || !description) {
        return res.status(400).json({ message: "Issue ID and description are required." });
    }

    if (!mongoose.Types.ObjectId.isValid(issueId)) {
        return res.status(400).json({ message: "Invalid Issue ID format." });
    }

    try {
        const issue = await Issue.findById(issueId);
        if (!issue) {
            return res.status(404).json({ message: "Issue not found." });
        }

        let member;
        if (memberData.role === 'developer') {
            member = await Developer.findById(memberData.data.id); // Assuming Developer model
        } else if (memberData.role === 'tester') {
            member = await Tester.findById(memberData.data.id); // Assuming Tester model
        } else {
            return res.status(403).json({ message: "Invalid role." });
        }

        if (!member) {
            return res.status(404).json({ message: "member not found." });
        }

        if (issue.project.toString() !== member.project.toString()) {
            return res.status(403).json({ message: "You are not allowed to comment on this issue." });
        }
        if (memberData.role === 'developer' && member.department.toString() !== issue.assignedTo.toString()) {
            return res.status(403).json({ message: "You are not allowed to comment on this issue." });
        }
        const comment = {
            description,
            postedBy: memberData.data.id,
            postedByModel: memberData.role.charAt(0).toUpperCase() + memberData.role.slice(1),
            issueId
        };

        const newComment = await Comment.create(comment);

        return res.status(201).json({
            message: "Comment posted successfully.",
            data: newComment
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).send({ message: "Server Error", error: e.message });
    }
});

//@desc get all comments
//@route GET /api/comment/:issueId
const getAllComments = asyncHandeler(async (req, res) => {
    const { issueId } = req.params;
    try {
        const comments = await Comment.find({ issueId }).sort({ createdAt: -1 });
        return res.status(201).json(comments);
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: "Server Error", error: e.message });
    }
})

//@desc Delete a comment
//@route DELETE /api/comment/:issueId/:commentId
const deleteComment = asyncHandeler(async (req, res) => {
    const { issueId, commentId } = req.params;
    const { memberData } = req;
    try {

        const comment = await Comment.findOne({ _id: commentId });
        if (!comment) {
            return res.status(404).json({ message: "No such comment found." });
        }
        if (comment.issueId.toString() !== issueId) {
            return res.status(400).json({ message: "Comment does not belong to the given issue." });
        }
        if (comment.postedBy.toString() !== memberData.data.id || comment.postedByModel.toLowerCase() !== memberData.role) {
            return res.status(403).json({ message: "You are not allowed to delete this comment." });
        }
        await comment.deleteOne();

        return res.status(200).json({
            message: "Comment deleted successfully.",
            comment: comment
        });
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: "Server Error", error: e.message });
    }
})

//@desc Edit a comment
//@route PUT /api/comment/:issueId/:commentId
const editComment = asyncHandeler(async (req, res) => {
    const { issueId, commentId } = req.params;
    const { memberData } = req;
    const { description } = req.body;

    if (!description) {
        return res.status(400).json({ message: "Description is required." });
    }

    try {
        const comment = await Comment.findOne({ _id: commentId });
        if (!comment) {
            return res.status(404).json({ message: "No such comment found." });
        }
        if (comment.issueId.toString() !== issueId) {
            return res.status(400).json({ message: "Comment does not belong to the given issue." });
        }
        if (comment.postedBy.toString() !== memberData.data.id || comment.postedByModel.toLowerCase() !== memberData.role) {
            return res.status(403).json({ message: "You are not allowed to edit this comment." });
        }

        comment.description = description;
        await comment.save();

        return res.status(200).json({
            message: "Comment edited successfully.",
            comment: comment
        });
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: "Server Error", error: e.message });
    }
});

module.exports = { postComment, getAllComments, deleteComment, editComment }

