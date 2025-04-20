const mongoose = require('mongoose');
const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['Active', 'Completed'], default: 'Active' }, 
  deadline: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Project", ProjectSchema);