import React, { useState } from "react";
import { FaGoogle, FaGithub, FaEnvelope, FaLock, FaBrain } from "react-icons/fa";
import "../pages/Signup/Signup.css";
import Button from "./button/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ switchToSignup }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const user = {
      email, password
    };
    try {
      console.log(user);
      const res = await axios.post(
        "http://localhost:5000/login", user
      );

      localStorage.setItem("token", res.data.token);
      console.log(res.data);
      alert(res.data.message);
      navigate("/")
    }
catch (error) {
  alert(error.response?.data?.message || "Login Failed");
}
  };

  return (
    <div className="loginCard">
      <div className="auth-header">
        <div className="auth-logo">
          <FaBrain />
        </div>
        <h1>Welcome Back</h1>
        <p>Log in to access your RepoMind workspace</p>
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
          <span>or sign in with email</span>
        </div>

        <form onSubmit={handleLogin}>
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

          <Button text="Sign In" type="submit" variant="primary" />
        </form>

        <div className="auth-switch">
          <span>Don't have an account?</span>
          <p onClick={switchToSignup}>Create an account</p>
        </div>
      </div>
    </div>
  );
}

export default Login;