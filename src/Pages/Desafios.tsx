import React from "react";
import { StyleSheet } from "react-native";
import { Avatar } from "react-native-paper";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { useAuth } from "../Context/AuthContext";

const Desafios = () => {
  const { user } = useAuth();
  return (
    <Container>
      <Text>Desafios</Text>
      <EquipeContainer style={style.shadow}>
        {user?.equipe.avatar ? (
          <Avatar.Image
            style={style.shadowRanking}
            source={{ uri: user?.equipe.avatar }}
            size={80}
          />
        ) : (
          <Avatar.Icon style={style.shadowRanking} icon="account" size={80} />
        )}
        <Equipe>{user?.equipe.nome}</Equipe>
        <Pontuacao>0</Pontuacao>
      </EquipeContainer>
      <DesafiosContainer>
        {/* <Row>
          <Desafio style={style.shadow}>
            <Feather
              name="award"
              size={20}
              style={{ margin: "1rem" }}
              color="#127c82"
            />
            <Titulo>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Titulo>
            <Tag>
              <Valor>+ 100</Valor>
            </Tag>
            <MaterialIcons name="arrow-right" size={28} color="#5CEAA0" />
          </Desafio>
        </Row> */}
      </DesafiosContainer>
    </Container>
  );
};

const style = StyleSheet.create({
  shadowRanking: {
    borderColor: "#5CEAA0",
    borderWidth: 2,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: "#5CEAA0",
    shadowOpacity: 1.0,
    shadowRadius: 20,
    backgroundColor: "#5ea6a9",
  },
  shadow: {
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  avatarBg: {
    backgroundColor: "#5ea6a9",
  },
});

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
  width: 100%;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 1rem;
`;

const Equipe = styled.Text`
  color: white;
  font-family: "Poppins";
  font-size: 14px;
  margin: 0.5rem;
`;
const Pontuacao = styled.Text`
  font-family: "Poppins";
  font-weight: 500;
  color: #5ceaa0;
  font-size: 18px;
`;

const Row = styled.View`
  display: flex;
  flex-direction: row;
`;

const DesafiosContainer = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
`;

const Desafio = styled.TouchableOpacity`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #5ea6a9;
  border-radius: 30px;
  padding-right: 1rem;
`;

const Titulo = styled.Text`
  font-family: "Poppins";
  font-weight: 200;
  font-size: 14px;
  color: white;
`;

const Tag = styled.View`
  background-color: #5ceaa0;

  border-radius: 20px;
`;

const Valor = styled.Text`
  font-family: "Poppins";
  font-weight: 400;
  color: white;
  font-size: 12px;
  margin: 5px 10px;
`;

export default Desafios;
