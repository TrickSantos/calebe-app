import { StackScreenProps } from "@react-navigation/stack";
import React, { useState } from "react";
import styled from "styled-components/native";
import * as Picker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import { MuralStackParamList } from "../../Routes/mural.routes";
import { ActivityIndicator, Image, Dimensions } from "react-native";
import { FAB } from "react-native-paper";
import api from "../../Services/api";

type Props = StackScreenProps<MuralStackParamList, "Adicionar">;
const { width } = Dimensions.get("window");

const Adicionar = ({
  navigation,
  route: {
    params: { userId },
  },
}: Props) => {
  const [foto, setFoto] = useState("");
  const [loading, setLoading] = useState(false);

  let openImagePickerAsync = async () => {
    let permissionResult = await Picker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await Picker.launchImageLibraryAsync({
      mediaTypes: Picker.MediaTypeOptions.All,
      quality: 1,
      videoQuality: 0.7,
    });
    if (pickerResult.cancelled === true) {
      return;
    }

    const block = pickerResult.uri;
    setLoading(true);
    fetch(block)
      .then((res) => res.blob())
      .then(async (blob) => {
        const form = new FormData();
        form.append("file", blob);
        form.append("pasta", "mural");
        await api
          .post("/upload", form)
          .then(async ({ data }) => {
            setFoto(data.url);
          })
          .catch((e) => console.log(e))
          .finally(() => setLoading(false));
      });
  };

  const handleSubmit = async () => {
    await api
      .post("/foto", { userId, foto })
      .then(() => {
        setLoading(false);
        navigation.popToTop();
      })
      .catch((e) => console.log(e));
  };

  return (
    <Container>
      <Action>
        <Click
          style={{ marginRight: "1rem" }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="#127C82" />
        </Click>
        <Titulo>
          <Text>Foto para o mural da Equipe</Text>
        </Titulo>
      </Action>

      {foto ? (
        <Content>
          <Envio>
            <Image
              source={{ uri: foto }}
              style={{ width, height: 300 }}
              resizeMode="cover"
            />
          </Envio>
        </Content>
      ) : null}
      {foto ? (
        <Salvar onPress={handleSubmit}>
          {loading ? (
            <ActivityIndicator animating={true} color="#FFF" />
          ) : (
            <TextButton>Postar</TextButton>
          )}
        </Salvar>
      ) : null}

      <FAB
        small
        icon="plus"
        label={foto ? "Trocar Foto" : "Adicionar Foto"}
        onPress={openImagePickerAsync}
        loading={loading}
        style={{
          position: "absolute",
          margin: "1rem",
          right: 0,
          bottom: 0,
        }}
      />
    </Container>
  );
};

const Titulo = styled.View`
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
  width: 100%;
  background-color: #b1d2d6;
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

const Action = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0 1rem;
`;

const Content = styled.View`
  width: 100%;
`;

const Click = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Envio = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: #5ea6a9;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
`;

const Salvar = styled.TouchableOpacity`
  width: 100%;
  padding: 0.5rem;
  border-radius: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #127c82;
`;

export default Adicionar;
