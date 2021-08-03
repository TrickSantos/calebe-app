import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Configuracoes from "../Pages/Configuracoes/Configuracoes";
import Editar from "../Pages/Configuracoes/Editar";

export type ConfigStackParamList = {
  Configuracao: undefined;
  Editar: undefined;
};

const ConfigStack = createStackNavigator<ConfigStackParamList>();

const ConfigRoutes = () => (
  <ConfigStack.Navigator initialRouteName="Configuracao">
    <ConfigStack.Screen
      name="Configuracao"
      component={Configuracoes}
      options={{ headerShown: false }}
    />
    <ConfigStack.Screen
      name="Editar"
      component={Editar}
      options={{ headerShown: false }}
    />
  </ConfigStack.Navigator>
);

export default ConfigRoutes;
