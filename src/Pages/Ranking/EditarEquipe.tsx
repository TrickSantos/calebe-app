import React, { useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { AntDesign } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, Avatar, Snackbar } from "react-native-paper";
import FormData from "form-data";
import * as ImagePicker from "expo-image-picker";
import styled from "styled-components/native";
import {
  Button,
  ButtonInsideText,
  FormItem,
  Input,
  Label,
} from "../../Components";
import api from "../../Services/api";
import { IUsuario } from "../../../declarations";
import { StyleSheet } from "react-native";
import { RankingStackParamList } from "../../Routes/ranking.routes";
import { StatusBar } from "expo-status-bar";

type Props = StackScreenProps<RankingStackParamList, "Editar">;

const EditarEquipe = ({ navigation, route: { params } }: Props) => {
  const [foto, setFoto] = useState(params.avatar);
  const { control, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [display, setDisplay] = useState(false);

  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }

    const block = pickerResult.uri;

    fetch(block)
      .then((res) => res.blob())
      .then(async (blob) => {
        const form = new FormData();
        form.append("avatar", blob);
        await api
          .put(`/equipe/${params.id}`, form)
          .then(async ({ data }) => {
            setFoto(data.avatar);
            setDisplay(true);
            setMessage("Foto atualizada com sucesso!");
          })
          .catch((e) => console.log(e));
      });
  };

  const onSubmit = async (data: IUsuario) => {
    setLoading(true);
    await api
      .put(`/equipe/${params.id}`, data)
      .then(async () => {
        setDisplay(true);
        setMessage("Dados atualizados com sucesso!");
        navigation.goBack();
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container>
      <StatusBar backgroundColor="#127c82" animated />
      <Action>
        <ClickButton onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="#127c82" />
        </ClickButton>
      </Action>
      <PerfilContainer>
        <ClickButton onPress={openImagePickerAsync}>
          {foto ? (
            <Avatar.Image
              source={{
                uri: foto,
              }}
              size={90}
            />
          ) : (
            <Avatar.Icon style={style.avatarBg} icon="account" size={90} />
          )}
        </ClickButton>
        <NomeText>{params.nome}</NomeText>
        <InfoText>Editar Perfil</InfoText>
      </PerfilContainer>
      <FormContainer>
        <FormItem>
          <Label>Nome</Label>
          <Controller
            name="nome"
            control={control}
            defaultValue={params.nome}
            render={({ field: { value, onBlur, onChange } }) => (
              <Input
                placeholderTextColor="#127C82"
                placeholder="Nome"
                onChange={onChange}
                value={value}
                onBlur={onBlur}
              />
            )}
          />
        </FormItem>
        <FormItem>
          <Label>Email</Label>
          <Controller
            name="instagram"
            control={control}
            defaultValue={params.instagram}
            render={({ field: { value, onBlur, onChange } }) => (
              <Input
                placeholderTextColor="#127C82"
                placeholder="Instagram"
                onChange={onChange}
                value={value}
                onBlur={onBlur}
              />
            )}
          />
        </FormItem>
      </FormContainer>
      <FormItem style={{ marginBottom: 0 }}>
        <Button
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
          <ButtonInsideText onPress={() => handleSubmit(onSubmit)()}>
            {loading ? (
              <ActivityIndicator animating={true} color="#FFF" />
            ) : (
              "Salvar"
            )}
          </ButtonInsideText>
        </Button>
      </FormItem>
      <Snackbar
        visible={display}
        onDismiss={() => {
          setDisplay(false);
          setMessage("");
        }}
      >
        {message}
      </Snackbar>
    </Container>
  );
};

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

const InfoText = styled.Text`
  color: #127c82;
  font-family: "Poppins";
  font-size: 14px;
  font-weight: 500;
`;

const FormContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: #ffffff;
  border-radius: 15px;
  margin: 1rem 0;
`;

const Action = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
const ClickButton = styled.TouchableOpacity``;

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

export default EditarEquipe;
