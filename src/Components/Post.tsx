import React, { useEffect, useState } from "react";
import { ListRenderItem } from "react-native";
import styled from "styled-components/native";
import { IDevocional } from "../../declarations";
import { FontAwesome5, FontAwesome, MaterialIcons } from "@expo/vector-icons";

const Container = styled.View`
  background-color: #ffffff;
  width: 100%;
  border-radius: 20px;
`;

const Header = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  border-bottom-color: #5ea6a9;
  border-bottom-width: 1px;
`;

const Content = styled.View`
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

const ActionContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 5px;
`;

const Post: ListRenderItem<IDevocional> = ({
  item: { verso, conteudo, titulo, autor, video },
}) => {
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
      <Header>
        {autor.avatar ? (
          <Avatar source={{ uri: autor.avatar }} />
        ) : (
          <NullAvatar>
            <FontAwesome5 name="user" size={16} color="black" />
          </NullAvatar>
        )}
        <Titulo>{titulo}</Titulo>
      </Header>
      <Content>
        <Verso>{verso}</Verso>
        <Devocional numberOfLines={10}>{conteudo}</Devocional>
      </Content>
      <Footer>
        <ActionContainer>
          <LikeText>26</LikeText>
          <MaterialIcons name="favorite-outline" size={18} color="#e80d0d" />
        </ActionContainer>
        <ActionContainer>
          <CommentText>26</CommentText>
          <FontAwesome name="commenting-o" size={18} color="black" />
        </ActionContainer>
      </Footer>
    </Container>
  );
};

export default Post;
