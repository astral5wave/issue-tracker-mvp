const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    createdBy: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'createdByModel' },
    createdByModel: { type: String, required: true, enum: ['Tester', 'Developer'] },
    recipient: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'recipientModel' },
    recipientModel: { type: String, required: true, enum: ['Tester', 'Developer'] },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    issueId: { type: mongoose.Schema.Types.ObjectId, ref: 'Issue', required: true },
    type: { type: String, required: true, enum: ['issue_created', 'status_changed', 'new_comment'] },
    isRead: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Notification', NotificationSchema);