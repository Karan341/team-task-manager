const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending",
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
},
dueDate: {
  type: Date,
},
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);