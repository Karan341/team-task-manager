const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ SIGNUP
exports.signup = async (req, res) => {
  try {
    console.log("Signup request received:", req.body);

    // Temporary: Just return success without database operations
    res.status(201).json({
      message: "User created successfully (test)",
      user: {
        _id: "test_id",
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
      },
    });

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: error.message });
  }
};


//  LOGIN
exports.login = async (req, res) => {
  try {
    console.log("Login request:", req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    console.log("Comparing passwords...");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("Generating JWT token...");
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log("Login successful for user:", user._id);
    res.json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: error.message });
  }
};