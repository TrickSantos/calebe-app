import React from "react";
import { Image } from "react-native";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { useAuth } from "../../Context/AuthContext";
import VideoPlayer from "../../Components/VideoPlayer";
import { StackScreenProps } from "@react-navigation/stack";
import { DesafiosStackParamsList } from "../../Routes/desafios.routes";
import { StatusBar } from "expo-status-bar";

type Props = StackScreenProps<DesafiosStackParamsList, "Desafio">;

const Desafio = ({ navigation, route: { params } }: Props) => {
  const { user } = useAuth();
  const desafioId = params.id;
  return (
    <Scroll>
      <StatusBar backgroundColor="#127c82" animated />
      <Container>
        <Action>
          <Click
            style={{ marginRight: "1rem" }}
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="arrowleft" size={24} color="#127C82" />
          </Click>
          <Titulo>
            <Text>{params.titulo}</Text>
          </Titulo>
        </Action>
        <Content>
          {params.video ? (
            <VideoPlayer video={params.video} />
          ) : (
            <>
              {params.cover ? (
                <Image
                  source={{ uri: params.cover }}
                  resizeMode="contain"
                  style={{ width: "100%", height: 300 }}
                />
              ) : null}
            </>
          )}
          <Descricao>{params.conteudo}</Descricao>
        </Content>
        {user && (user.perfil === "lider" || user.perfil === "admin") && (
          <Preencher
            onPress={() =>
              navigation.navigate("Resposta", {
                desafioId,
                equipeId: user.equipeId,
              })
            }
          >
            <TextButton>Preencher Desafio</TextButton>
          </Preencher>
        )}
      </Container>
    </Scroll>
  );
};

const Scroll = styled.ScrollView`
  background-color: #b1d2d6;
  padding: 1rem 2rem;
  flex: 1;
`;

const Titulo = styled.View`
  flex: 1;
`;

const Container = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Text = styled.Text`
  color: #127c82;
  font-family: "Poppins";
  font-size: 18px;
  font-weight: 700;
  margin: 1rem 0;
`;

const TextButton = styled.Text`
  color: #fff;
  font-family: "Poppins";
  font-size: 18px;
  font-weight: 500;
`;

const Preencher = styled.TouchableOpacity`
  width: 100%;
  padding: 0.5rem;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #127c82;
`;

const Action = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const Click = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Content = styled.View`
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: #5ea6a9;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
`;

const Descricao = styled.Text`
  color: #127c82;
  font-family: "Poppins";
  font-weight: 400;
  font-size: 14px;
`;

export default Desafio;
