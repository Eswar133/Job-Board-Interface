import React, { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return isLoggedIn ? (
    <Dashboard onLogout={handleLogout} />
  ) : (
    <Login onLoginSuccess={handleLogin} />
  );
}
