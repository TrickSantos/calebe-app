import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Desafios from "../Pages/Desafios/Desafios";
import Desafio from "../Pages/Desafios/Desafio";
import Resposta from "../Pages/Desafios/Resposta";
import { IDesafio } from "../../declarations";

export type DesafiosStackParamsList = {
  Desafios: undefined;
  Desafio: IDesafio;
  Resposta: {
    desafioId: number;
    equipeId: number;
  };
};

const DesafioStack = createStackNavigator<DesafiosStackParamsList>();

const DesafiosRoutes = () => (
  <DesafioStack.Navigator initialRouteName="Desafios">
    <DesafioStack.Screen
      name="Desafios"
      component={Desafios}
      options={{ headerShown: false }}
    />
    <DesafioStack.Screen
      name="Desafio"
      component={Desafio}
      options={{ headerShown: false }}
    />
    <DesafioStack.Screen
      name="Resposta"
      component={Resposta}
      options={{ headerShown: false }}
    />
  </DesafioStack.Navigator>
);

export default DesafiosRoutes;
