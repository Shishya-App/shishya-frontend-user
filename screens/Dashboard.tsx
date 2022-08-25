import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ArcBackground from "../components/ArcBackground";
import PdfCarousel from "../components/PdfCarousel";
import {
  BottomTabNavigationProps,
  DashboardRoutes,
} from "../constants/DashboardRoutes";

const Dashboard = ({
  navigation,
}: BottomTabNavigationProps<DashboardRoutes, "Dashboard">) => {
  return (
    <ArcBackground>
      <PdfCarousel />
      <Pressable
        onPress={() => {
          navigation.dispatch(
            CommonActions.navigate({
              name: "Jobs",
            })
          );
        }}
      >
        <Text>Hello</Text>
      </Pressable>
    </ArcBackground>
  );
};

Dashboard.defaultProps = {
  modal: false,
};

export default Dashboard;

const styles = StyleSheet.create({
  textStyle: {
    color: "black",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },
});
