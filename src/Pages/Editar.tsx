import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { AntDesign } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";
import { Avatar } from "react-native-paper";
import FormData from "form-data";
import * as ImagePicker from "expo-image-picker";
import styled from "styled-components/native";
import fs from "fs";
import {
  Button,
  ButtonInsideText,
  FormItem,
  Input,
  Label,
} from "../Components";
import { useAuth } from "../Context/AuthContext";
import api from "../Services/api";
import { b64toBlob } from "../Services/util";

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

type RootStackParamList = {
  Configuracao: undefined;
  Editar: undefined;
};

type Props = StackScreenProps<RootStackParamList, "Configuracao">;

const Editar = ({ navigation }: Props) => {
  const { user } = useAuth();
  const { control, setValue } = useForm();

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

    /*  const block = pickerResult.uri;

    const contentType = block[0].split(":")[1];
    const data = block[1].split(",")[1];

    const file = b64toBlob(data, contentType, 512);
    console.log(file); */

    /* const form = new FormData();

    form.append("file", '');
    form.append("pasta", "user");

    await api
      .post("/upload", form)
      .then(({ data }) => {
        console.log(data);
      })
      .catch((e) => console.log(e)); */
  };

  return (
    <Container>
      <Action>
        <ClickButton onPress={() => navigation.replace("Configuracao")}>
          <AntDesign name="arrowleft" size={24} color="#127c82" />
        </ClickButton>
      </Action>
      <PerfilContainer>
        <ClickButton onPress={openImagePickerAsync}>
          <Avatar.Image
            source={{
              uri: user?.avatar,
            }}
            size={90}
          />
        </ClickButton>
        <NomeText>Patrick</NomeText>
        <InfoText>Editar Perfil</InfoText>
      </PerfilContainer>
      <FormContainer>
        <FormItem>
          <Label>Nome</Label>
          <Controller
            name="nome"
            control={control}
            defaultValue={user?.nome}
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
            name="email"
            control={control}
            defaultValue={user?.email}
            rules={{
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Entre com um email válido",
              },
            }}
            render={({ field: { value, onBlur, onChange } }) => (
              <Input
                autoCompleteType="email"
                placeholderTextColor="#127C82"
                placeholder="Email"
                onChange={onChange}
                value={value}
                onBlur={onBlur}
              />
            )}
          />
        </FormItem>
        <FormItem>
          <Label>Senha</Label>
          <Controller
            name="password"
            control={control}
            render={({ field: { value, onBlur, onChange } }) => (
              <Input
                autoCompleteType="password"
                secureTextEntry
                placeholderTextColor="#127C82"
                placeholder="Senha"
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
          <ButtonInsideText>Salvar</ButtonInsideText>
        </Button>
      </FormItem>
    </Container>
  );
};

export default Editar;
