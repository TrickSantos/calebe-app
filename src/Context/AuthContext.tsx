import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../Services/api";
import { AxiosResponse } from "axios";
import { IUsuario } from "../../declarations";

interface AuthContextProps {
  signed: boolean;
  user: IUsuario | null;
  setUser: React.Dispatch<React.SetStateAction<IUsuario | null>>;
  login(email: string, password: string): Promise<AxiosResponse>;
  logout(): Promise<AxiosResponse>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IUsuario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorage() {
      const storageUser = await AsyncStorage.getItem("auth:user");
      const storageToken = await AsyncStorage.getItem("auth:token");
      if (storageToken && storageUser) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
        api.defaults.headers.Authorization = `Bearer ${storageToken}`;
      } else if (!storageUser) {
        setLoading(false);
      }
    }
    loadStorage();
  }, []);

  async function login(email: string, password: string) {
    return new Promise<AxiosResponse>((resolve, reject) => {
      api
        .post("/login", { email, password })
        .then(async (response) => {
          const { token, user } = response.data;
          setUser(user);

          await AsyncStorage.setItem("auth:user", JSON.stringify(user)).then(
            async () => {
              await AsyncStorage.setItem("auth:token", token).then(() => {
                api.defaults.headers.common.Authorization = `Bearer ${token}`;
                api.defaults.headers.Authorization = `Bearer ${token}`;

                resolve(response);
              });
            }
          );
        })
        .catch((erro) => {
          reject(erro);
        });
    });
  }

  async function logout() {
    return new Promise<AxiosResponse>((resolve) => {
      api.post("/logout").then(async (response) => {
        await AsyncStorage.clear().then(() => {
          setUser(null);
          resolve(response);
        });
      });
    });
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, setUser, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export default AuthContext;
