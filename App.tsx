import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import useFirstLaunch from "./hooks/useFirstLaunch";
import { AppRoutes } from "./constants/AppRoutes";

import Loading from "./components/Loading";
import MainNavigator from "./constants/MainNavigator";

const AppStack = createNativeStackNavigator<AppRoutes>();

const App = () => {
  const isFirstLaunch = useFirstLaunch();

  if (isFirstLaunch === null) return <Loading />;

  //todo -> Create Auth stack manager here after implementing auth flow (Right now constants are set)

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <AppStack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={"Main"}
        >
          <AppStack.Screen name="Main" component={MainNavigator}/>
        </AppStack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  heading: {
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: 20,
  },
});
