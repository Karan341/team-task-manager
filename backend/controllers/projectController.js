const Project = require("../models/Project");

// CREATE PROJECT
exports.createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    const project = await Project.create({
      name,
      description,
      createdBy: req.user.id,
      members: [req.user.id],
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET PROJECTS
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("members", "name email");

    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ADD MEMBER TO PROJECT
exports.addMember = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { userId } = req.body;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // already member check
    if (project.members.includes(userId)) {
      return res.status(400).json({ message: "User already a member" });
    }

    project.members.push(userId);
    await project.save();

    res.json(project);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};