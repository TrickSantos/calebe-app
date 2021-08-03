import React from "react";
import { Feather, Entypo, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DesafiosRoutes from "./desafios.routes";
import RankingRoutes from "./ranking.routes";
import FeedRoutes from "./feed.routes";
import ConfigRoutes from "./config.routes";

const Tab = createBottomTabNavigator();

const AppRoutes: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        showLabel: false,
        activeTintColor: "#127C82",
        inactiveTintColor: "#000",
      }}
    >
      <Tab.Screen
        name="Home"
        component={FeedRoutes}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="open-book" size={size} color={color} />
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
        component={DesafiosRoutes}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="game-controller-outline"
              size={size}
              color={color}
            />
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
