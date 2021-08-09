import React, { useState } from "react";
import { Image } from "react-native";
import { Feather, SimpleLineIcons } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components/native";
import logo from "../../assets/new.png";
import { StackScreenProps } from "@react-navigation/stack";
import { useAuth } from "../Context/AuthContext";
import api from "../Services/api";
import { ActivityIndicator, Snackbar } from "react-native-paper";
import { AxiosError } from "axios";
import {
  Button,
  ButtonInsideText,
  ErrorText,
  FormItem,
  Input,
  Label,
} from "../Components";

const Container = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #127c82;
`;

const Logo = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  color: white;
  font-family: "Poppins";
  font-size: 20px;
  font-weight: 700;
`;

const LoginForm = styled.View`
  width: 100%;
  padding: 2rem;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top-right-radius: 40px;
  border-top-left-radius: 40px;
`;

const TextButton = styled.TouchableOpacity`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextButtonInside = styled.Text`
  font-family: "Poppins";
  color: #127c82;
  font-size: 14px;
`;

const InputIconText = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  background-color: #86bcbe;
  border-radius: 20px;
  padding-left: 1rem;
`;

type RootStackParamList = {
  Login: undefined;
  App: undefined;
};

type Props = StackScreenProps<RootStackParamList, "Login">;

function Login({ navigation }: Props) {
  const [recuperar, setRecuperar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [display, setDisplay] = useState(false);
  const { login } = useAuth();
  const { control, handleSubmit, reset } = useForm({ mode: "all" });

  const onRecuperar = async (data: { email: string }) => {
    setLoading(true);
    await api
      .post("/recuperar", data)
      .then(() => {
        setDisplay(true);
        reset({});
        setMessage("Siga as instruções enviadas no seu email");
      })
      .catch((e) => {
        const { response } = e as AxiosError;
        setDisplay(true);
        setMessage(response?.data.message);
        setRecuperar(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onSubmit = async (data: { email: string; password: string }) => {
    setLoading(true);
    await login(data.email, data.password)
      .catch(({ response }: AxiosError) => {
        setDisplay(true);
        setMessage(response?.data.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Container>
      <Logo>
        <Image
          source={logo}
          style={{ width: 350, height: 250 }}
          resizeMode="contain"
        />
        <Text>{recuperar ? "Recuperar senha" : "Bem vindo!"}</Text>
      </Logo>
      <LoginForm>
        <FormItem>
          <Label>Email</Label>

          <Controller
            name="email"
            control={control}
            rules={{
              required: "O email deve ser informado",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Entre com um email válido",
              },
            }}
            render={({
              field: { value, onBlur, onChange },
              fieldState: { error },
            }) => (
              <>
                <InputIconText>
                  <Feather name="mail" size={18} color="#127c82" />
                  <Input
                    autoCompleteType="email"
                    placeholderTextColor="#127C82"
                    autoCapitalize="none"
                    placeholder="Email"
                    onChangeText={(text) => onChange(text.trim())}
                    value={value}
                    onBlur={onBlur}
                  />
                </InputIconText>
                {error && <ErrorText>{error.message}</ErrorText>}
              </>
            )}
          />
        </FormItem>
        {!recuperar && (
          <FormItem style={{ marginBottom: "2rem" }}>
            <Label>Senha</Label>

            <Controller
              name="password"
              control={control}
              rules={{
                required: "A senha precisa ser informada",
              }}
              render={({
                field: { value, onBlur, onChange },
                fieldState: { error },
              }) => (
                <>
                  <InputIconText>
                    <SimpleLineIcons name="lock" size={18} color="#127c82" />
                    <Input
                      autoCompleteType="password"
                      secureTextEntry
                      placeholderTextColor="#127C82"
                      placeholder="Senha"
                      onChange={onChange}
                      value={value}
                      onBlur={onBlur}
                    />
                  </InputIconText>
                  {error && <ErrorText>{error.message}</ErrorText>}
                </>
              )}
            />
          </FormItem>
        )}
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
            disabled={loading}
            onPress={() => {
              recuperar
                ? handleSubmit(onRecuperar)()
                : handleSubmit(onSubmit)();
            }}
          >
            <ButtonInsideText>
              {loading ? (
                <ActivityIndicator animating={true} color="#FFF" />
              ) : recuperar ? (
                "Enviar"
              ) : (
                "Entrar"
              )}
            </ButtonInsideText>
          </Button>
          <TextButton onPress={() => setRecuperar(!recuperar)}>
            <TextButtonInside>
              {loading ? (
                <ActivityIndicator animating={true} color="#FFF" />
              ) : recuperar ? (
                "Voltar para login"
              ) : (
                "Esqueceu a senha?"
              )}
            </TextButtonInside>
          </TextButton>
        </FormItem>
      </LoginForm>
      <Snackbar visible={display} onDismiss={() => setDisplay(false)}>
        {message}
      </Snackbar>
    </Container>
  );
}

export default Login;
