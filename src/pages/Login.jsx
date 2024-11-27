import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import "./Login.css";

function Login() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [signupData, setSignupData] = useState({ username: "", password: "", confirmPassword: "" });

  // Handle input changes for login
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  // Handle input changes for signup
  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  // Submit login form
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://print-backend-h1r9.vercel.app/api/auth/login", loginData);
      alert(`Login successful!`);
      localStorage.setItem("token", response.data.token); // Save the token
      localStorage.setItem("uniqueId", response.data.uniqueId); // Save the uniqueId
      console.log(response.data.token);
      console.log(response.data.uniqueId);
      navigate("/home"); // Navigate to /home after successful login
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
      alert("Login failed: " + (error.response?.data?.message || error.message));
    }
  };

  // Submit signup form
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await axios.post("https://print-backend-h1r9.vercel.app/api/auth/signup", {
        username: signupData.username,
        password: signupData.password,
      });
      alert(response.data.message);
       // Navigate to /home after successful signup
    } catch (error) {
      console.error("Signup failed:", error.response?.data?.message || error.message);
      alert("Signup failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="login-container">
      {/* Left side: Login */}
      <div className="login-half login-section">
        <h2 className="section-title">Login</h2>
        <form className="form" onSubmit={handleLoginSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="input"
            value={loginData.username}
            onChange={handleLoginChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input"
            value={loginData.password}
            onChange={handleLoginChange}
          />
          <button className="button" type="submit">Login</button>
        </form>
      </div>

      {/* Right side: Signup */}
      <div className="signup-half signup-section">
        <h2 className="section-title">Signup</h2>
        <form className="form" onSubmit={handleSignupSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="input"
            value={signupData.username}
            onChange={handleSignupChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input"
            value={signupData.password}
            onChange={handleSignupChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="input"
            value={signupData.confirmPassword}
            onChange={handleSignupChange}
          />
          <button className="button" type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
