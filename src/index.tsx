import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./Context/AuthContext";
import Routes from "./Routes/index.routes";

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
