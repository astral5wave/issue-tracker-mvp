const mongoose = require('mongoose');
const CommentSchema = new mongoose.Schema({
    description: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'createdByModel' },
    createdByModel: { type: String, required: true, enum: ['Tester', 'Developer'] },
    issueId: { type: mongoose.Schema.Types.ObjectId, ref: 'Issue', required: true },
    attachments: [{ type: String }],
    mentions: [{ user: { type: mongoose.Schema.Types.ObjectId, refPath: 'mentionsModel' }, model: { type: String, enum: ['Tester', 'Developer'] } }],
},
    { timestamps: true });

module.exports = mongoose.model("Comment", CommentSchema);
