import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import KanbanBoard from "../components/KanbanBoard";
import axiosInstance from "../utils/axiosInstance";
const Home = () => {
  const navigate = useNavigate();
  const[member,setMember]=useState(null);

  const getMember=async ()=>{
    try{
      const response=await axiosInstance.get("/member");
      setMember(response.data.member);
    }
    catch(e){
      console.log(e);
    }
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); //login page
    }
    getMember();
  }, []);
  return (
    <>
      <Header member={member}/>
      <KanbanBoard />
    </>
  );
};

export default Home;
