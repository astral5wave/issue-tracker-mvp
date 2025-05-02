const mongoose = require('mongoose');
const CommentSchema = new mongoose.Schema({
    description: { type: String, required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'postedByModel' },
    postedByModel: { type: String, required: true, enum: ['Tester', 'Developer'] },
    issueId: { type: mongoose.Schema.Types.ObjectId, ref: 'Issue', required: true },
},
    { timestamps: true });

module.exports = mongoose.model("Comment", CommentSchema);
