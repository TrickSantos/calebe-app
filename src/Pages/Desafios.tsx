import React from "react";
import styled from "styled-components/native";

const Desafios = () => {
  return (
    <Container>
      <Text>Desafios</Text>
      <EquipeContainer>
        <Text>Desafios ainda não liberados!</Text>
      </EquipeContainer>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #127c82;
`;
const Text = styled.Text`
  color: white;
  font-family: "Poppins";
  font-size: 18px;
  font-weight: 500;
  margin: 1rem 0;
`;

const EquipeContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default Desafios;
