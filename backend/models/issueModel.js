const mongoose = require('mongoose');
const IssueSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'In Progress', 'Done', 'Rejected'], default: 'Pending' },
    priority: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], default: 'Medium' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Tester', required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true }
}, { timestamps: true });

module.exports = mongoose.model("Issue", IssueSchema);