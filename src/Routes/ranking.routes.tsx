import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EditarEquipe from "../Pages/Ranking/EditarEquipe";
import Equipe from "../Pages/Ranking/Equipe";
import Ranking from "../Pages/Ranking/Ranking";

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

const RankingStack = createStackNavigator<RankingStackParamList>();

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

export default RankingRoutes;
