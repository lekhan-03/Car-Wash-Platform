import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { User, Lock, EyeOff, Eye, Home } from "lucide-react";
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
    let users = [];
    try {
      users = JSON.parse(localStorage.getItem("users")) || [];
    } catch(err) {
      console.error(err);
    }
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

  const formVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, type: "spring", stiffness: 80 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } }
  };

  return (
    <div className="login-container">
      {/* Dynamic Background Elements */}
      <motion.div className="shape shape-1" animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}></motion.div>
      <motion.div className="shape shape-2" animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}></motion.div>
      <div className="shape shape-3"></div>

      <AnimatePresence mode="wait">
        {!showReset ? (
          <motion.div 
            className="login-card glass"
            key="login"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="login-header">
              <motion.h2 initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} transition={{ delay: 0.2 }}>Welcome Back 👋</motion.h2>
              <p className="subtitle">Login to manage your premium car care.</p>
            </div>

            <form onSubmit={handleLogin} className="login-form">
              <div className="input-group">
                <label>Username</label>
                <div className="input-wrapper">
                  <User className="input-icon" size={18} />
                  <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Password</label>
                <div className="input-wrapper">
                  <Lock className="input-icon" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className="toggle-eye" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                  </div>
                </div>
              </div>

              <p className="forgot-pass" onClick={() => setShowReset(true)}>
                Forgot Password?
              </p>

              <motion.button 
                type="submit" 
                className="login-btn"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Login Now
              </motion.button>
            </form>

            <div className="auth-footer">
              <p>
                Don’t have an account?{" "}
                <span onClick={() => navigate("/signup")} className="pointer-link">Create Account</span>
              </p>
              <motion.button 
                className="home-link" 
                onClick={() => navigate("/")}
                whileHover={{ x: -5 }}
              >
                <Home size={16} /> Back to Home
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            className="login-card reset-card glass"
            key="reset"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="login-header">
              <h2>Reset Password 🔒</h2>
              <p className="subtitle">Enter your details to recreate password</p>
            </div>
            <form onSubmit={handleResetPassword} className="login-form">
              <div className="input-group">
                <div className="input-wrapper">
                  <User className="input-icon" size={18} />
                  <input
                    type="text"
                    placeholder="Enter Username"
                    value={resetUser}
                    onChange={(e) => setResetUser(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="input-group">
                <div className="input-wrapper">
                  <Lock className="input-icon" size={18} />
                  <input
                    type="password"
                    placeholder="Enter New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="reset-actions">
                <motion.button type="button" className="cancel-btn" onClick={() => setShowReset(false)} whileHover={{ scale: 1.03 }} whileTap={{ scale:0.97 }}>
                  Cancel
                </motion.button>
                <motion.button type="submit" className="confirm-btn" whileHover={{ scale: 1.03 }} whileTap={{ scale:0.97 }}>
                  Reset
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Login;