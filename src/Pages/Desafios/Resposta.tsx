import React, { useState } from "react";
import styled from "styled-components/native";
import { AntDesign, MaterialIcons, Feather } from "@expo/vector-icons";
import { ActivityIndicator, FAB } from "react-native-paper";
import * as Picker from "expo-image-picker";
import api from "../../Services/api";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { StackScreenProps } from "@react-navigation/stack";
import { DesafiosStackParamsList } from "../../Routes/desafios.routes";
import { AxiosError } from "axios";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native";
import { Input, Label } from "../../Components";

type RespostaType = {
  resposta: string;
};

type Props = StackScreenProps<DesafiosStackParamsList, "Resposta">;

const Resposta = ({ navigation, route: { params } }: Props) => {
  const { equipeId, desafioId } = params;
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, reset } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "respostas",
  });

  const onSubmit = async (data: RespostaType[]) => {
    setLoading(true);
    await api
      .post("/resposta", { ...data, equipeId, desafioId })
      .then(() => {
        reset({ respostas: [] });
        navigation.popToTop();
      })
      .catch((e: AxiosError) => {
        console.log(e);
      })
      .finally(() => setLoading(false));
  };

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
        form.append("pasta", "desafios/resposta");
        await api
          .post("/upload", form)
          .then(async ({ data }) => {
            append({ resposta: data.url });
          })
          .catch((e) => console.log(e))
          .finally(() => setLoading(false));
      });
  };

  return (
    <Container>
      <StatusBar backgroundColor="#b1d2d6" animated />
      <Action>
        <Click
          style={{ marginRight: "1rem" }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="#127C82" />
        </Click>
        <Titulo>
          <Text>Desafio 1</Text>
        </Titulo>
      </Action>

      <Content showsVerticalScrollIndicator={false}>
        {fields.map((resposta, index) => (
          <Envio key={resposta.id}>
            <Feather name="file" size={24} color="#127C82" />
            <NomeArquivo>{`Arquivo ${index + 1}`}</NomeArquivo>
            <Click
              style={{ marginRight: "1rem" }}
              onPress={() => remove(index)}
            >
              <MaterialIcons name="delete" size={24} color="red" />
            </Click>
          </Envio>
        ))}

        {fields.length > 0 && (
          <>
            <Observacao>
              <Label>Observação</Label>
              <Controller
                control={control}
                name="observacao"
                render={({ field: { onChange, value, onBlur } }) => (
                  <Input
                    placeholder="Observações..."
                    placeholderTextColor="#127c82"
                    multiline={true}
                    numberOfLines={3}
                    maxLength={255}
                    style={{ height: 90, textAlignVertical: "top" }}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
            </Observacao>
            <Salvar onPress={() => handleSubmit(onSubmit)()}>
              {loading ? (
                <ActivityIndicator animating={true} color="#FFF" />
              ) : (
                <TextButton>Salvar</TextButton>
              )}
            </Salvar>
          </>
        )}
      </Content>
      <FAB
        small
        icon="plus"
        label="Adicionar"
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

const Observacao = styled.View`
  margin: 1rem 0;
`;

const Container = styled.View`
  flex: 1;
  background-color: #b1d2d6;
  padding: 1rem 2rem;
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

const NomeArquivo = styled.Text`
  color: #127c82;
  font-family: "Poppins";
  font-size: 14px;
  font-weight: 500;
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
`;

const Content = styled.ScrollView`
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

export default Resposta;
