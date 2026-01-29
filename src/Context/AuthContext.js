// src/Context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const signup = (userData) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existing = users.find((u) => u.username === userData.username);

    if (existing) {
      alert("Username already exists!");
      return false;
    }

    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup successful! Please log in.");
    return true;
  };

  const login = (username, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const found = users.find(
      (u) => u.username === username && u.password === password
    );

    if (found) {
      setUser(found);
      localStorage.setItem("user", JSON.stringify(found)); // ✅ consistent key
      return true;
    } else {
      alert("Invalid credentials. Please sign up if you don't have an account.");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // ✅ same key
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
