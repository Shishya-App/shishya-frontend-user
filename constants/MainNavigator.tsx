import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { DrawerRoutes } from "./DrawerRoutes";
import {
  MaterialIcons as Icon,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";

import Dashboard from "../screens/Dashboard";

const Drawer = createDrawerNavigator<DrawerRoutes>();

const MainNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveBackgroundColor: "#D2D2D2",
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: "bold",
        },
        drawerActiveTintColor: "#131313",
      }}
      useLegacyImplementation={true}
    >
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          drawerIcon: () => (
            <MaterialCommunityIcons name="view-dashboard" size={24} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default MainNavigator;