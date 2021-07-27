import React from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import App from "./src";

export default function Main() {
  const [loaded] = useFonts({
    Poppins: require("./assets/fonts/Poppins.ttf"),
  });

  return !loaded ? <AppLoading /> : <App />;
}
