const express = require("express");
const router = express.Router();

const {
  createProject,
  getProjects,
  addMember,
} = require("../controllers/projectController");

const authMiddleware = require("../middleware/authMiddleware");



router.post("/", authMiddleware, createProject);
router.get("/", authMiddleware, getProjects);
router.post("/:projectId/members", authMiddleware, addMember);
module.exports = router;