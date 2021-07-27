import styled from "styled-components/native";

export const Input = styled.TextInput`
  height: 50px;
  width: 100%;
  background-color: #86bcbe;
  font-family: "Poppins";
  color: #127c82;
  padding: 1rem;
  border-radius: 20px;
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #5ea6a9;
  border-radius: 20px;
`;

export const ButtonInsideText = styled.Text`
  color: white;
  font-family: "Poppins";
`;

export const Label = styled.Text`
  color: #127c82;
  font-family: "Poppins";
  font-size: 16px;
  font-weight: 600;
  margin-left: 1rem;
`;

export const FormItem = styled.View`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1rem;
`;
