import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Pages/Login";
import AppRoutes from "./app.routes";

const AppStack = createStackNavigator();
const { Navigator, Screen } = AppStack;

const AuthRoutes: React.FC = () => {
  return (
    <Navigator initialRouteName="Login">
      <Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Screen
        name="App"
        component={AppRoutes}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
};

export default AuthRoutes;
