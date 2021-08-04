import React, { useState } from "react";
import { Feather, AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, Avatar } from "react-native-paper";
import styled from "styled-components/native";
import { useAuth } from "../../Context/AuthContext";
import { StackScreenProps } from "@react-navigation/stack";

const Container = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;

const PerfilContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 0;
`;

const NomeText = styled.Text`
  color: #127c82;
  font-family: "Poppins";
  font-size: 16px;
  font-weight: 600;
`;

const EquipeText = styled.Text`
  color: #127c82;
  font-family: "Poppins";
  font-size: 14px;
  font-weight: 500;
`;

const MenuContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: #ffffff;
  border-radius: 15px;
  margin: 1rem 0;
`;

const Menu = styled.TouchableOpacity`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

type RootStackParamList = {
  Configuracao: undefined;
  Editar: undefined;
};

type Props = StackScreenProps<RootStackParamList, "Configuracao">;

const Configuracoes = ({ navigation }: Props) => {
  const { logout, user } = useAuth();
  const [loading, setLoading] = useState(false);

  return (
    <Container>
      <StatusBar backgroundColor="#f2f2f2" animated />
      <PerfilContainer>
        <Avatar.Image
          source={{
            uri: user?.avatar,
          }}
        />
        <NomeText>{user?.nome}</NomeText>
        <EquipeText>{`Equipe ${user?.equipe.nome}`}</EquipeText>
      </PerfilContainer>
      <MenuContainer
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
        <Menu onPress={() => navigation.navigate("Editar")}>
          <Feather name="user" size={24} color="#127c82" />
          <NomeText>Editar conta</NomeText>
          <AntDesign name="right" size={24} color="#127c82" />
        </Menu>
      </MenuContainer>
      <MenuContainer
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
        <Menu
          onPress={async () => {
            setLoading(true);
            await logout().finally(() => setLoading(false));
          }}
        >
          <AntDesign name="logout" size={24} color="red" />
          <NomeText style={{ color: "red" }}>
            {loading ? (
              <ActivityIndicator animating={true} color="red" />
            ) : (
              "Sair"
            )}
          </NomeText>
          <AntDesign name="right" size={24} color="red" />
        </Menu>
      </MenuContainer>
    </Container>
  );
};

export default Configuracoes;
