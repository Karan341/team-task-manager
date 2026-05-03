const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,

  //  project owner
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  //  team members
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);