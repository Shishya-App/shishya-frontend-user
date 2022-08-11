import "react-native-gesture-handler";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import useFirstLaunch from "./hooks/useFirstLaunch";
import { AppRoutes } from "./constants/AppRoutes";
import { AuthenticationRoutes } from "./constants/AuthenticationRoutes";
import MainNavigator from "./constants/MainNavigator";
import AuthContextProvider from "./store/AuthContext";
import useStart from "./hooks/useStart";
import useAuth from "./hooks/useAuth";

import Loading from "./components/Loading";
import Onboard from "./screens/Onboard";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import InitialStartScreen from "./screens/initialStart";

const AppStack = createNativeStackNavigator<AppRoutes>();
const AuthenticationStack = createNativeStackNavigator<AuthenticationRoutes>();

const App = () => {
  // todo -> Implement the logic during signup and login in the screen to complete the flow smoothly ....
  const isFirstLaunch = useFirstLaunch();
  const { isLoggedIn, user } = useStart();
  const auth = useAuth();

  const login = async () => {
    if (isLoggedIn && user) {
      await auth.login(user);
    }
  };

  useEffect(() => {
    login();
  }, [isLoggedIn, isFirstLaunch, user]);

  if (isFirstLaunch === null || isLoggedIn === null) return <Loading />;
  
 
  const AuthenticationNavigator = () => {
    return (
      <AuthenticationStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={isFirstLaunch ? "Initial" : "Login"}
      >
        <AuthenticationStack.Screen name="Initial" component={InitialStartScreen} />
        <AuthenticationStack.Screen name="Onboard" component={Onboard}/>
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

export default function AppWrapper() {
  return (
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  )
}
