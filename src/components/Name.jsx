import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext";

const Name = () => {
  const { setName } = useContext(LoginContext);
  const navigate = useNavigate();

  const handleNameInput = () => {
    let userName = "";
    while (!userName) {
      userName = prompt("Enter your name:");
      if (!userName) {
        alert("Name is required to proceed.");
      }
    }
    setName(userName);
    navigate("/chat");
  };

  useEffect(() => {
    handleNameInput();
  }, []);

  return;
};

export default Name;
