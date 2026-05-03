
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authMiddleware = require("./middleware/authMiddleware");
const roleMiddleware = require("./middleware/roleMiddleware");
const projectRoutes = require("./routes/projectRoutes");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// ✅ CORS whitelist for development and production
const allowedOrigins = [
  'http://localhost:3000',
  'https://team-task-managerr.netlify.app',
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    const isAllowedNetlifyPreview = /https:\/\/[a-z0-9-]+--team-task-managerr\.netlify\.app$/;

    if (allowedOrigins.includes(origin) || isAllowedNetlifyPreview.test(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS policy does not allow access from origin ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());

// DB connect
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/projects", projectRoutes);

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

app.get(
  "/api/admin",
  authMiddleware,
  roleMiddleware("Admin"),
  (req, res) => {
    res.json({
      message: "Welcome Admin",
      user: req.user,
    });
  }
);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});