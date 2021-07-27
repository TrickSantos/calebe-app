import React from "react";
import { Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Desafios from "../Pages/Desafios";
import Ranking from "../Pages/Ranking";
import Feed from "../Pages/Feed";
import Configuracoes from "../Pages/Configuracoes";
import { createStackNavigator } from "@react-navigation/stack";
import Editar from "../Pages/Editar";
import Equipe from "../Pages/Equipe";
import EditarEquipe from "../Pages/EditarEquipe";

export type RankingStackParamList = {
  Ranking: undefined;
  Equipe: {
    id: number;
  };
  Editar: {
    id: number;
    nome: string;
    instagram: string;
    avatar: string;
    igrejaId: number;
  };
};

export type ConfigStackParamList = {
  Configuracao: undefined;
  Editar: undefined;
};

const Tab = createBottomTabNavigator();

const ConfigStack = createStackNavigator();

const RankingStack = createStackNavigator();

const RankingRoutes = () => (
  <RankingStack.Navigator initialRouteName="Ranking">
    <RankingStack.Screen
      name="Ranking"
      component={Ranking}
      options={{ headerShown: false }}
    />
    <RankingStack.Screen
      name="Equipe"
      component={Equipe}
      options={{ headerShown: false }}
    />
    <RankingStack.Screen
      name="Editar"
      component={EditarEquipe}
      options={{ headerShown: false }}
    />
  </RankingStack.Navigator>
);

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

const AppRoutes: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        showLabel: false,
        activeTintColor: "#127C82",
        inactiveTintColor: "#000",
        style: {
          backgroundColor: "#FFF",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Feed}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Ranking"
        component={RankingRoutes}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="award" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Desafios"
        component={Desafios}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Configs"
        component={ConfigRoutes}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default AppRoutes;
