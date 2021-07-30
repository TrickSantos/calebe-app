import React, { useState } from "react";
import styled from "styled-components/native";
import { IDevocional } from "../../declarations";
import { FontAwesome5, AntDesign, MaterialIcons } from "@expo/vector-icons";
import VideoPlayer from "./VideoPlayer";
import { useAuth } from "../Context/AuthContext";
import api from "../Services/api";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";

const Container = styled.View`
  background-color: #ffffff;
  width: 100%;
  border-radius: 20px;
`;

const Header = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  border-bottom-color: #5ea6a9;
  border-bottom-width: 1px;
`;

const Content = styled.TouchableOpacity`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  border-bottom-color: #5ea6a9;
  border-bottom-width: 1px;
`;

const Footer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

const Verso = styled.Text`
  font-family: "Poppins";
  font-weight: 500;
  color: #000;
  font-size: 12px;
  margin-bottom: 5px;
`;

const Devocional = styled.Text`
  font-family: "Poppins";
  color: #127c82;
  font-size: 12px;
`;

const Titulo = styled.Text`
  font-family: "Poppins";
  color: #127c82;
  font-weight: 700;
  font-size: 16px;
`;

const Avatar = styled.Image`
  height: 50px;
  width: 50px;
  border-radius: 50px;
  margin-right: 10px;
`;

const NullAvatar = styled.View`
  height: 40px;
  width: 40px;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #bdbdbd;
  margin-right: 5px;
`;

const LikeText = styled.Text`
  font-family: "Poppins";
  color: #e80d0d;
  font-weight: 700;
  margin-right: 5px;
`;

const CommentText = styled.Text`
  font-family: "Poppins";
  color: #000;
  font-weight: 700;
  margin-right: 5px;
`;

const ActionContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 5px;
`;

interface Props {
  post: IDevocional;
}

const Post = ({ post }: Props) => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [curtidas, setCurtidas] = useState(post.likes.length);
  const [comments, setComments] = useState(post.comentarios.length);
  const [liked, setLiked] = useState(
    post.likes.some((el) => el.userId === user?.id)
  );

  const handleCurtir = async () => {
    await api.put(`/curtir/${post.id}`).then(({ data }) => {
      const { likes, comentarios }: IDevocional = data;
      setCurtidas(likes.length);
      setComments(comentarios.length);
      setLiked(likes.some((el) => el.userId === user?.id));
    });
  };
  const handleUnlike = async () => {
    await api.delete(`/curtida/${post.id}`).then(({ data }) => {
      const { likes, comentarios }: IDevocional = data;
      setCurtidas(likes.length);
      setComments(comentarios.length);
      setLiked(likes.some((el) => el.userId === user?.id));
    });
  };

  return (
    <Container
      style={{
        marginVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
      }}
    >
      <Header onPress={() => navigation.navigate("Devocional", post)}>
        {post.autor.avatar ? (
          <Avatar source={{ uri: post.autor.avatar }} />
        ) : (
          <NullAvatar>
            <FontAwesome5 name="user" size={16} color="black" />
          </NullAvatar>
        )}
        <Titulo>{post.titulo}</Titulo>
      </Header>
      <Content onPress={() => navigation.navigate("Devocional", post)}>
        {post.video ? (
          <VideoPlayer video={post.video} />
        ) : (
          <>
            <Verso>{post.verso}</Verso>
            {post.cover ? (
              <Image
                source={{ uri: post.cover }}
                resizeMode="contain"
                style={{ width: "100%", height: 250 }}
              />
            ) : null}
            <Devocional numberOfLines={10}>{post.conteudo}</Devocional>
          </>
        )}
      </Content>
      <Footer>
        <ActionContainer onPress={liked ? handleUnlike : handleCurtir}>
          <LikeText>{curtidas}</LikeText>
          {liked ? (
            <MaterialIcons name="favorite" size={18} color="#e80d0d" />
          ) : (
            <MaterialIcons name="favorite-outline" size={18} color="#e80d0d" />
          )}
        </ActionContainer>
        <ActionContainer>
          <CommentText>{comments}</CommentText>
          <AntDesign name="message1" size={18} color="black" />
        </ActionContainer>
      </Footer>
    </Container>
  );
};

export default Post;
