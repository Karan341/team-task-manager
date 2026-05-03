const Task = require("../models/Task");

// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const { title, description, assignedTo } = req.body;

    const task = await Task.create({
      title,
      description,
      assignedTo,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL TASKS
exports.getTasks = async (req, res) => {
  try {
    let tasks;

    if (req.user.role === "Admin") {
      tasks = await Task.find().populate("assignedTo", "name email");
    } else {
      tasks = await Task.find({ assignedTo: req.user.id }).populate(
        "assignedTo",
        "name email"
      );
    }

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE TASK
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE TASK
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    await Task.findByIdAndDelete(id);

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};