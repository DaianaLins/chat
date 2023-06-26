import React from "react";
import { Container } from "./styles";
import Robot from "../../assets/robot.gif";

const Welcome = ({ currentUser }) => {
  return (
    <Container>
      <img src={Robot} alt="Robot" />
      <h1>
        Welcome, <span>{currentUser?.username}!</span>
      </h1>
      <h3>Por favor, selecione para iniciar uma conversa</h3>
    </Container>
  );
};



export default Welcome;
