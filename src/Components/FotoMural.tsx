import React, { useState } from "react";
import { Image, View, Dimensions } from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { IFoto } from "../../declarations";
import { useNavigation } from "@react-navigation/native";
import api from "../Services/api";
import { useAuth } from "../Context/AuthContext";

const { width } = Dimensions.get("window");

const FotoMural = ({ foto, usuario, id, likes }: IFoto) => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [curtidas, setCurtidas] = useState(likes.length);
  const [liked, setLiked] = useState(
    likes.some((el) => el.userId === user?.id)
  );

  const handleCurtir = async () => {
    await api.put(`/curtir_foto/${id}`).then(({ data }) => {
      const { likes }: IFoto = data;
      setCurtidas(likes.length);
      setLiked(likes.some((el) => el.userId === user?.id));
    });
  };

  const handleUnlike = async () => {
    await api.delete(`/curtida_foto/${id}`).then(({ data }) => {
      const { likes }: IFoto = data;
      setCurtidas(likes.length);
      setLiked(likes.some((el) => el.userId === user?.id));
    });
  };

  return (
    <Post>
      <Header
        onPress={() =>
          navigation.navigate("Perfil", { equipeId: usuario.equipeId })
        }
      >
        <View style={{ flexDirection: "row" }}>
          {usuario.avatar ? (
            <Avatar source={{ uri: usuario.avatar }} />
          ) : (
            <NullAvatar>
              <FontAwesome5 name="user" size={16} color="black" />
            </NullAvatar>
          )}
          <View>
            <Nome>{usuario.nome}</Nome>
            <Tempo>{`Equipe ${usuario.equipe.nome}`}</Tempo>
          </View>
        </View>
        {user?.id === usuario.id ||
        (user?.equipeId === usuario.equipeId && usuario.perfil === "lider") ? (
          <ActionContainer
            onPress={async () => {
              await api
                .delete(`/foto/${id}`)
                .then(() => {
                  navigation.goBack();
                })
                .catch((e) => console.log(e));
            }}
          >
            <MaterialIcons name="delete-outline" size={18} color="#e80d0d" />
          </ActionContainer>
        ) : null}
      </Header>
      <Image
        source={{
          uri: foto,
        }}
        style={{ width, height: 300 }}
        resizeMode="cover"
      />
      <Footer>
        <ActionContainer onPress={liked ? handleUnlike : handleCurtir}>
          <LikeText>{curtidas}</LikeText>
          {liked ? (
            <MaterialIcons name="favorite" size={18} color="#e80d0d" />
          ) : (
            <MaterialIcons name="favorite-outline" size={18} color="#e80d0d" />
          )}
        </ActionContainer>
      </Footer>
    </Post>
  );
};

const Post = styled.View`
  background-color: white;
  margin-top: 2rem;
`;

const Header = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

const Nome = styled.Text`
  font-family: "Poppins";
  font-size: 14px;
  font-weight: 500;
  color: #127c82;
`;

const Tempo = styled.Text`
  font-family: "Poppins";
  font-size: 10px;
  font-weight: 500;
  color: #127c82;
`;

const Footer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
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

const Avatar = styled.Image`
  height: 40px;
  width: 40px;
  border-radius: 50px;
  margin-right: 10px;
`;

export default FotoMural;
