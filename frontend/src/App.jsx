import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import Home from "./pages/Home";
import RegisterForm from "./pages/RegisterForm";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<RegisterForm />} />
    </Routes>
  );
}

export default App;
