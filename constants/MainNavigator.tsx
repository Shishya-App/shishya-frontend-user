import React from "react";
import {
  MaterialIcons as Icon,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DashboardRoutes } from "./DashboardRoutes";

import Dashboard from "../screens/Dashboard";
import AddButton from "../components/AddButton";
import { Text, SafeAreaView } from "react-native";
import UploadDocuments from "../screens/UploadDocuments";
import Profile from "../screens/Profile";
import MyDocuments from "../screens/MyDocuments";
import Apply from "../screens/Apply";

const TabNavigator = createBottomTabNavigator<DashboardRoutes>();

const MainNavigator = () => {
  const [modalIsOpen, setModalIsOpen] = React.useState<boolean>(true);

  const UpploadDocumentsModal = () => (
    <UploadDocuments
      visible={modalIsOpen}
      onClose={() => setModalIsOpen(false)}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TabNavigator.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FFFFFF",
          tabBarInactiveTintColor: "#D3D3D3",
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            backgroundColor: "#5D5AFF",
            borderTopLeftRadius: 35,
            borderTopRightRadius: 35,
          },
        }}
      >
        <TabNavigator.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <Icon name="home" size={focused ? 30 : 24} color={color} />
            ),
          }}
        />
        <TabNavigator.Screen
          name="My Documents"
          component={MyDocuments}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name="documents"
                size={focused ? 30 : 24}
                color={color}
              />
            ),
          }}
        />
        <TabNavigator.Screen
          name="Upload Documents"
          component={UpploadDocumentsModal}
          options={{
            tabBarIcon: AddButton,
          }}
        />
        <TabNavigator.Screen
          name="Apply"
          component={Apply}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <FontAwesome5
                name="file-signature"
                size={focused ? 30 : 24}
                color={color}
              />
            ),
          }}
        />
        <TabNavigator.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <FontAwesome5
                name="user-circle"
                size={focused ? 30 : 24}
                color={color}
              />
            ),
          }}
        />
      </TabNavigator.Navigator>
    </SafeAreaView>
  );
};

export default MainNavigator;
