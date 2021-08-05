import React, { useEffect, useState } from "react";
import { FlatList, ActivityIndicator } from "react-native";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import styled from "styled-components/native";
import { MuralStackParamList } from "../../Routes/mural.routes";
import { StackScreenProps } from "@react-navigation/stack";
import { IEquipe } from "../../../declarations";
import * as Linking from "expo-linking";
import api from "../../Services/api";
import FotoMural from "../../Components/FotoMural";

type Props = StackScreenProps<MuralStackParamList, "Perfil">;

const Perfil = ({
  navigation,
  route: {
    params: { equipeId },
  },
}: Props) => {
  const [equipe, setEquipe] = useState<IEquipe>({} as IEquipe);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getEquipe() {
      setLoading(true);
      await api
        .get(`/equipe/${equipeId}`)
        .then(({ data }) => {
          setEquipe(data);
        })
        .catch((e) => console.log(e))
        .finally(() => setLoading(false));
    }
    getEquipe();
  }, []);

  return (
    <Container>
      <Detail showsVerticalScrollIndicator={false}>
        <ClickButton
          style={{ margin: "1rem 0" }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="#FFF" />
        </ClickButton>
        <Header>
          {equipe.avatar ? (
            <Avatar source={{ uri: equipe.avatar }} />
          ) : (
            <NullAvatar>
              <FontAwesome5 name="user" size={24} color="#127c82" />
            </NullAvatar>
          )}
          <Nome>{equipe.nome}</Nome>
          <ClickButton
            onPress={() =>
              Linking.openURL(`https://www.instagram.com/${equipe.instagram}`)
            }
          >
            <Instagram>Instagram: {equipe.instagram}</Instagram>
          </ClickButton>
          <Infos>
            <Distrito>CPA 2 - Sede</Distrito>
            <Igreja>CPA 2 - Sede</Igreja>
          </Infos>
        </Header>
        <FlatList
          data={equipe.fotos}
          showsVerticalScrollIndicator={false}
          refreshing={loading}
          ListFooterComponent={() =>
            loading ? <ActivityIndicator size="large" color="#fff" /> : null
          }
          keyExtractor={(foto) => foto.id.toString()}
          renderItem={({ item }) => <FotoMural {...item} />}
        />
      </Detail>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #127c82;
  padding: 1rem;
`;

const Detail = styled.ScrollView`
  flex: 1;
`;

const Header = styled.View`
  align-items: center;
  width: 100%;
`;

const Nome = styled.Text`
  font-family: "Poppins";
  font-size: 20px;
  font-weight: 400;
  color: #fff;
`;

const Infos = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 1rem 0;
`;

const Instagram = styled.Text`
  font-family: "Poppins";
  font-size: 12px;
  font-weight: 200;
  color: #fff;
`;

const Distrito = styled.Text`
  font-family: "Poppins";
  font-size: 16px;
  font-weight: 400;
  color: #fff;
`;

const Igreja = styled.Text`
  font-family: "Poppins";
  font-size: 16px;
  font-weight: 400;
  color: #fff;
`;

const NullAvatar = styled.View`
  height: 70px;
  width: 70px;
  border-radius: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #bdbdbd;
`;

const Avatar = styled.Image`
  height: 70px;
  width: 70px;
  border-radius: 70px;
`;

const ClickButton = styled.TouchableOpacity``;

export default Perfil;
