import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful");
      navigate("/dashboard");
    } catch (error) {
    // 👇 YAHAN ADD KARNA HAI
    console.log(error.response?.data || error.message);
    alert(error.response?.data?.message || error.response?.data?.error || "Login failed");
  }
};

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email address"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="primary-btn" onClick={handleLogin}>
          Login
        </button>

        <p className="link-text">
          New user? <Link to="/signup">Create account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;