import React, { useState } from "react";

export default function Login({ onLoginSuccess }) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (id === "admin" && password === "admin123") {
      setError("");
      onLoginSuccess();
    } else {
      setError("Invalid credentials. Use admin and admin123.");
      setId("");
      setPassword("");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Admin Login</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="id">Admin ID</label>
            <input
              type="text"
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="admin"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="admin123"
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        {error && <div className="error-popup">{error}</div>}

        <div className="demo-note">
          <p>Demo Credentials:</p>
          <p>ID: <strong>admin</strong></p>
          <p>Password: <strong>admin123</strong></p>
        </div>
      </div>
    </div>
  );
}
