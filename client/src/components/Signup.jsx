import React, { useState } from 'react';
import { FaGoogle, FaGithub, FaEnvelope, FaLock, FaBrain } from "react-icons/fa";
import "../pages/Signup/Signup.css";
import Button from './button/Button';
import axios from "axios";

function Signup({ switchToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async(e) => {
    e.preventDefault();

    if (email === "") {
      alert("Please enter your email");
      return;
    }

    if (password === "") {
      alert("Please enter your password");
      return;
    }

    if (ConfirmPassword === "") {
      alert("Please confirm your password");
      return;
    }

    if (password !== ConfirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    const user = {
      email, password, ConfirmPassword
    };
    try {
      console.log(user);
      const res = await axios.post(
        "http://localhost:5000/signup", user
      );
      console.log(res.data);
      alert(res.data.message);
    }
    catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="loginCard">
      <div className="auth-header">
        <div className="auth-logo">
          <FaBrain />
        </div>
        <h1>Create Account</h1>
        <p>Get started with RepoMind AI in seconds</p>
      </div>

      <div className="elements">
        <div className="social-buttons">
          <Button
            icon={<FaGoogle className="icon google" />}
            text="Continue with Google"
            variant="btn"
          />

          <Button
            icon={<FaGithub className="icon github" />}
            text="Continue with GitHub"
            variant="btn"
          />
        </div>

        <div className="divider">
          <span>or sign up with email</span>
        </div>

        <form onSubmit={handleSignup}>
          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Confirm Password"
              value={ConfirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <Button text="Create Account" type="submit" variant="primary" />
        </form>

        <div className="auth-switch">
          <span>Already have an account?</span>
          <p onClick={switchToSignup}>Sign in</p>
        </div>
      </div>
    </div>
  );
}

export default Signup;