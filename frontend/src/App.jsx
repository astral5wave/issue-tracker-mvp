import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import Home from "./pages/Home";
import RegisterForm from "./pages/RegisterForm";
import KanbanBoard from "./components/KanbanBoard";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<RegisterForm />} />
      {/* <Route path="/KanbanBoard" element={<KanbanBoard />} /> */}
    </Routes>
  );
}

export default App;
