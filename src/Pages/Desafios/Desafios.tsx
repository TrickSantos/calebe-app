import React, { useEffect, useState } from "react";
import api from "../../Services/api";
import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import { IDesafio, IEquipe } from "../../../declarations";
import { useAuth } from "../../Context/AuthContext";
import { StackScreenProps } from "@react-navigation/stack";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { ActivityIndicator, Avatar } from "react-native-paper";
import { DesafiosStackParamsList } from "../../Routes/desafios.routes";

type Props = StackScreenProps<DesafiosStackParamsList, "Desafios">;
const Desafios = ({ navigation }: Props) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [equipe, setEquipe] = useState<IEquipe>({} as IEquipe);
  const [desafios, setDesafios] = useState<IDesafio[]>([] as IDesafio[]);

  useEffect(() => {
    navigation.addListener("focus", async () => {
      setLoading(true);
      await api.get(`/equipe/${user?.equipeId}`).then(({ data }) => {
        setEquipe(data);
      });
      await api
        .get(`/desafio?equipeId=${user?.equipeId}`)
        .then(({ data }) => {
          setDesafios(data);
        })
        .catch((e) => console.log(e))
        .finally(() => setLoading(false));
    });
  }, []);

  return (
    <Container>
      <Text>Desafios</Text>
      <EquipeContainer style={style.shadow}>
        {equipe.avatar ? (
          <Avatar.Image
            style={style.shadowRanking}
            source={{ uri: equipe.avatar }}
            size={80}
          />
        ) : (
          <Avatar.Icon style={style.shadowRanking} icon="account" size={80} />
        )}
        <Equipe>{equipe.nome}</Equipe>
        <Pontuacao>{equipe.pontos}</Pontuacao>
      </EquipeContainer>
      {loading && (
        <ActivityIndicator size="large" color="#FFF" animating={true} />
      )}
      <DesafiosContainer>
        {desafios.map((desafio) => (
          <Row key={desafio.id}>
            <Desafio
              style={style.shadow}
              onPress={() => navigation.navigate("Desafio", desafio)}
            >
              <Feather
                name="award"
                size={20}
                style={{ margin: "1rem" }}
                color="#127c82"
              />
              <Titulo>{desafio.titulo}</Titulo>
              <Tag>
                <Valor>+ {desafio.pontos}</Valor>
              </Tag>
              <MaterialIcons name="arrow-right" size={28} color="#5CEAA0" />
            </Desafio>
          </Row>
        ))}
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

const DesafiosContainer = styled.ScrollView`
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
