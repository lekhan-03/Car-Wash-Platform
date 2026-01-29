// src/Pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetUser, setResetUser] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const ok = login(username, password);
    if (ok) navigate("/account");
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex((u) => u.username === resetUser);

    if (userIndex === -1) {
      alert("User not found. Please sign up first.");
      return;
    }

    users[userIndex].password = newPassword;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Password reset successful! You can now login.");
    setShowReset(false);
  };

  return (
    <div className="login-container">
      
      {/* Decorative Background Shapes */}
      <div className="shape shape-1"></div>
      <div className="shape shape-2"></div>

      <div className="login-card">
        <div className="login-header">
          <h2>Welcome Back 👋</h2>
          <p className="subtitle">Login to manage your car care.</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="toggle-eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          <p className="forgot-pass" onClick={() => setShowReset(true)}>
            Forgot Password?
          </p>

          <button type="submit" className="login-btn">
            Login Now
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don’t have an account?{" "}
            <span onClick={() => navigate("/signup")}>Create Account</span>
          </p>
          <button className="home-link" onClick={() => navigate("/")}>
            ← Back to Home
          </button>
        </div>

        {/* Reset Password Modal */}
        {showReset && (
          <div className="reset-overlay">
            <div className="reset-modal">
              <h3>Reset Password 🔒</h3>
              <form onSubmit={handleResetPassword} className="reset-form">
                <input
                  type="text"
                  placeholder="Enter Username"
                  value={resetUser}
                  onChange={(e) => setResetUser(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Enter New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <div className="reset-actions">
                  <button type="button" className="cancel-btn" onClick={() => setShowReset(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="confirm-btn">
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;