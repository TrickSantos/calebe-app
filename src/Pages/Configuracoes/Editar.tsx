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
import { useAuth } from "../../Context/AuthContext";
import api from "../../Services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUsuario } from "../../../declarations";
import { StatusBar } from "expo-status-bar";

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
  const { user, setUser } = useAuth();
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
          .put(`/usuario/${user?.id}`, form)
          .then(async ({ data }) => {
            setUser(data);
            await AsyncStorage.setItem("auth:user", JSON.stringify(data));
            setDisplay(true);
            setMessage("Foto atualizada com sucesso!");
          })
          .catch((e) => console.log(e));
      });
  };

  const onSubmit = async (data: IUsuario) => {
    setLoading(true);
    await api
      .put(`/usuario/${user?.id}`, data)
      .then(async ({ data }) => {
        setUser(data);
        await AsyncStorage.setItem("auth:user", JSON.stringify(data));
        setDisplay(true);
        setMessage("Dados atualizados com sucesso!");
        navigation.replace("Configuracao");
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
      <StatusBar backgroundColor="#f2f2f2" animated />
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
        <NomeText>{user?.nome}</NomeText>
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

export default Editar;
