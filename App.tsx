import "react-native-gesture-handler";
import React, {useState} from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import useFirstLaunch from "./hooks/useFirstLaunch";
import { AppRoutes } from "./constants/AppRoutes";
import { AuthenticationRoutes } from "./constants/AuthenticationRoutes";

import MainNavigator from "./constants/MainNavigator";

import Loading from "./components/Loading";
import Onboard from "./screens/Onboard";
import Login from "./screens/Login";
import Signup from "./screens/Signup";

const AppStack = createNativeStackNavigator<AppRoutes>();
const AuthenticationStack = createNativeStackNavigator<AuthenticationRoutes>();

const App = () => {
  const isFirstLaunch = useFirstLaunch();
  // todo -> implement the is logged in state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isFirstLaunch === null) return <Loading />;
  
  const AuthenticationNavigator = () => {
    return (
      <AuthenticationStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={isFirstLaunch ? "Onboard" : "Login"}
      >
        <AuthenticationStack.Screen name="Onboard" component={Onboard} />
        <AuthenticationStack.Screen name="Login" component={Login} />
        <AuthenticationStack.Screen name="Signup" component={Signup} />
      </AuthenticationStack.Navigator>
    )
  }
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <AppStack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={isLoggedIn ? "Main" : "Authentication"}
        >
          <AppStack.Screen
            name="Authentication"
            component={AuthenticationNavigator}
          />

          <AppStack.Screen name="Main" component={MainNavigator}/>
        </AppStack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;
