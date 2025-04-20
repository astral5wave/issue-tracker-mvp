const mongoose = require('mongoose');
const DeveloperSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', default: null },
    username: { type: String, required: true, unique: true }
},{
    timestamps:true,
});

module.exports = mongoose.model("Developer",DeveloperSchema);