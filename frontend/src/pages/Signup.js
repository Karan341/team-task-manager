import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const API_URL = "https://team-task-manager-production-661a.up.railway.app";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Member");

  const navigate = useNavigate();

  const handleSignup = async () => {
  if (!name || !email || !password || !role) {
    alert("Please fill all fields");
    return;
  }

  try {
    const res = await axios.post(`${API_URL}/api/auth/signup`, {
      name,
      email,
      password,
      role,
    });

    console.log(res.data);
    alert("Signup successful");
    navigate("/");
  } catch (error) {
    console.log(error.response?.data || error.message);
    alert(error.response?.data?.message || error.response?.data?.error || "Signup failed");
  }
};

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>

        <input placeholder="Full name" onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email address" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

        <select onChange={(e) => setRole(e.target.value)}>
          <option value="Member">Member</option>
          <option value="Admin">Admin</option>
        </select>

        <button className="primary-btn" onClick={handleSignup}>
          Signup
        </button>

        <p className="link-text">
          Already have account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;