import React, { useState } from "react";
import styled from "styled-components/native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Input } from "../../Components";
import { Avatar, Snackbar } from "react-native-paper";
import { StackScreenProps } from "@react-navigation/stack";
import VideoPlayer from "../../Components/VideoPlayer";
import api from "../../Services/api";
import { AxiosError } from "axios";
import { Image } from "react-native";
import { FeedStackParamList } from "../../Routes/feed.routes";
import { StatusBar } from "expo-status-bar";

type Props = StackScreenProps<FeedStackParamList, "Devocional">;
const Devocional = ({ navigation, route }: Props) => {
  const post = route.params;
  const [comentario, setComentario] = useState("");
  const [message, setMessage] = useState("");
  const [display, setDisplay] = useState(false);
  const [likes, setLikes] = useState(post.likes.length);
  const [comentarios, setComentarios] = useState(post.comentarios);

  const onComment = async () => {
    await api
      .put(`/comentar/${post.id}`, { comentario })
      .then(({ data }) => {
        setComentarios(data.comentarios);
        setLikes(data.likes);
        setComentario("");
      })
      .catch(({ response }: AxiosError) => {
        setMessage(response?.data);
        setDisplay(true);
      });
  };

  return (
    <Scroll>
      <StatusBar backgroundColor="#b1d2d6" animated />
      <Container>
        <Action>
          <Click
            style={{ marginRight: "1rem" }}
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="arrowleft" size={24} color="#127C82" />
          </Click>
          <Titulo>
            <Text>{post.titulo}</Text>
          </Titulo>
        </Action>
        <Content>
          {post.video ? (
            <VideoPlayer video={post.video} />
          ) : (
            <>
              <Verso>{post.verso}</Verso>
              {post.cover ? (
                <Image
                  source={{ uri: post.cover }}
                  resizeMode="contain"
                  style={{ width: "100%", height: 200 }}
                />
              ) : null}
              <Descricao>{post.conteudo}</Descricao>
            </>
          )}
        </Content>
        <Footer>
          <Click style={{ marginRight: "1rem" }}>
            <Number style={{ color: "#e80d0d" }}>{likes}</Number>
            <MaterialIcons name="favorite" size={18} color="#e80d0d" />
          </Click>
          <Click>
            <Number>{comentarios.length}</Number>
            <AntDesign name="message1" size={18} color="black" />
          </Click>
        </Footer>
        <CommentariosContainer>
          <Comentar>
            <InputIconText>
              <AntDesign name="message1" size={18} color="#127c82" />
              <Input
                placeholder="Comentário..."
                placeholderTextColor="#127c82"
                value={comentario}
                multiline={true}
                numberOfLines={3}
                onChangeText={setComentario}
                maxLength={255}
                style={{ height: 90, textAlignVertical: "top" }}
              />
              {!!comentario && (
                <Click onPress={onComment} style={{ marginRight: "1rem" }}>
                  <MaterialIcons name="send" size={24} color="#127c82" />
                </Click>
              )}
            </InputIconText>
          </Comentar>
          <Comentarios>
            {comentarios.map((comentario) => (
              <Row key={comentario.id}>
                <Click style={{ marginRight: "1rem" }}>
                  {comentario.usuario.avatar ? (
                    <Avatar.Image
                      source={{ uri: comentario.usuario.avatar }}
                      size={35}
                    />
                  ) : (
                    <Avatar.Icon
                      icon="account"
                      style={{ backgroundColor: "#5ea6a9" }}
                      size={35}
                    />
                  )}
                </Click>
                <Comentario>{comentario.comentario}</Comentario>
              </Row>
            ))}
          </Comentarios>
        </CommentariosContainer>
        <Snackbar visible={display} onDismiss={() => setDisplay(false)}>
          {message}
        </Snackbar>
      </Container>
    </Scroll>
  );
};

const Scroll = styled.ScrollView`
  background-color: #b1d2d6;
  padding: 1rem 2rem;
  flex: 1;
`;

const Comentario = styled.Text`
  color: #127c82;
  font-family: "Poppins";
  font-weight: 400;
  font-size: 14px;
`;

const Comentarios = styled.View``;

const Row = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 1rem 0;
  border-bottom-width: 1px;
  border-bottom-color: #5ea6a9;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
`;

const CommentariosContainer = styled.View`
  margin-top: 1rem;
  border-radius: 20px;
  width: 100%;
  padding: 1rem;
  background-color: #fff;
`;

const Comentar = styled.View`
  width: 100%;
`;

const InputIconText = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  background-color: #86bcbe;
  border-radius: 20px;
  padding-left: 1rem;
`;

const Content = styled.View`
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: #5ea6a9;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
`;

const Footer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Verso = styled.Text`
  font-family: "Poppins";
  font-weight: 600;
  color: #000;
  font-size: 14px;
  margin-bottom: 5px;
`;

const Descricao = styled.Text`
  color: #127c82;
  font-family: "Poppins";
  font-weight: 400;
  font-size: 14px;
`;

const Number = styled.Text`
  font-family: "Poppins";
  color: #000;
  font-size: 18px;
  font-weight: 700;
  margin-right: 5px;
`;

const Action = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
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

const Click = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default Devocional;
