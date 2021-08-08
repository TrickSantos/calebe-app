import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  /* baseURL: __DEV__ ? "http://192.168.15.23:3333" : "https://api.calebe.online", */
  baseURL: "https://api.calebe.online",
});

api.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = `Bearer ${await AsyncStorage.getItem(
      "auth:token"
    )}`;
    config.headers.common.Authorization = `Bearer ${await AsyncStorage.getItem(
      "auth:token"
    )}`;

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default api;
