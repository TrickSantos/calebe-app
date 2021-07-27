import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import styled from "styled-components/native";
import { ActivityIndicator, Avatar } from "react-native-paper";
import { useAuth } from "../Context/AuthContext";
import { StyleSheet } from "react-native";
import { RankingStackParamList } from "../Routes/app.routes";
import { IEquipe } from "../../declarations";
import api from "../Services/api";

const Container = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: #127c82;
`;

const PerfilContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 0;
`;

const NomeText = styled.Text`
  color: #fff;
  font-family: "Poppins";
  font-size: 18px;
  font-weight: 500;
`;

const Action = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const InfoText = styled.Text`
  color: #fff;
  font-family: "Poppins";
  font-size: 14px;
  font-weight: 500;
`;

const Membros = styled.ScrollView`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
`;

const Membro = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #5ea6a9;
  border-radius: 30px;
  padding-right: 1rem;
`;

const Nome = styled.Text`
  color: white;
  font-family: "Poppins";
  font-size: 14px;
`;

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
  },
  shadow: {
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  avatarBg: {
    backgroundColor: "#5ea6a9",
  },
});

const ClickButton = styled.TouchableOpacity``;

type Props = StackScreenProps<RankingStackParamList, "Equipe">;

const Equipe = ({
  navigation,
  route: {
    params: { id },
  },
}: Props) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [equipe, setEquipe] = useState<IEquipe | null>(null);

  useEffect(() => {
    async function getEquipe() {
      setLoading(true);
      await api
        .get(`/equipe/${id}`)
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
      <Action>
        <ClickButton onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="#FFF" />
        </ClickButton>
      </Action>
      {loading ? (
        <ActivityIndicator animating={true} color="#fff" />
      ) : (
        <>
          {equipe && (
            <PerfilContainer>
              {equipe.avatar ? (
                <Avatar.Image
                  source={{
                    uri: equipe.avatar,
                  }}
                  size={90}
                />
              ) : (
                <Avatar.Icon style={style.avatarBg} icon="account" size={90} />
              )}

              <NomeText>{equipe.nome}</NomeText>
              {!(user?.perfil === "membro" || user?.equipeId !== id) && (
                <ClickButton
                  onPress={() => navigation.navigate("Editar", { ...equipe })}
                >
                  <InfoText>Editar Equipe</InfoText>
                </ClickButton>
              )}
            </PerfilContainer>
          )}
          <Membros>
            {equipe?.membros.map((membro) => (
              <Membro style={style.shadow} key={membro.id}>
                {membro.avatar ? (
                  <Avatar.Image
                    source={{
                      uri: membro.avatar,
                    }}
                    size={50}
                  />
                ) : (
                  <Avatar.Icon
                    style={style.avatarBg}
                    icon="account"
                    size={50}
                  />
                )}
                <Nome>{membro.nome}</Nome>
                <Feather name="chevron-right" size={24} color="#5ea6a9" />
              </Membro>
            ))}
          </Membros>
        </>
      )}
    </Container>
  );
};

export default Equipe;
