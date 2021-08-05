import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Mural from "../Pages/Mural/Mural";
import Perfil from "../Pages/Mural/Perfil";
import Adicionar from "../Pages/Mural/Adicionar";

export type MuralStackParamList = {
  Mural: undefined;
  Perfil: {
    equipeId: number;
  };
  Adicionar: {
    userId: number;
  };
};

const MuralStack = createStackNavigator<MuralStackParamList>();

const MuralRoutes = () => (
  <MuralStack.Navigator initialRouteName="Mural">
    <MuralStack.Screen
      name="Mural"
      component={Mural}
      options={{ headerShown: false }}
    />
    <MuralStack.Screen
      name="Perfil"
      component={Perfil}
      options={{ headerShown: false }}
    />
    <MuralStack.Screen
      name="Adicionar"
      component={Adicionar}
      options={{ headerShown: false }}
    />
  </MuralStack.Navigator>
);

export default MuralRoutes;
