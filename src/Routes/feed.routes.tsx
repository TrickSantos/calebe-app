import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { IDevocional } from "../../declarations";
import Devocional from "../Pages/Feed/Devocional";
import Feed from "../Pages/Feed/Feed";

export type FeedStackParamList = {
  Feed: undefined;
  Devocional: IDevocional;
};

const FeedStack = createStackNavigator<FeedStackParamList>();

const FeedRoutes = () => (
  <FeedStack.Navigator initialRouteName="Feed">
    <FeedStack.Screen
      name="Feed"
      component={Feed}
      options={{ headerShown: false }}
    />
    <FeedStack.Screen
      name="Devocional"
      component={Devocional}
      options={{ headerShown: false }}
    />
  </FeedStack.Navigator>
);

export default FeedRoutes;
