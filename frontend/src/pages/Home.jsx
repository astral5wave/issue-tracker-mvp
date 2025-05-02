import React, { useEffect } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); //login page
    }
    console.log(token);
  }, []);
  return (
    <>
      <Header />
      <KanbanBoard />
    </>
  );
};

export default Home;
