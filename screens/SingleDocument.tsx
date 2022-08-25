import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppRoutes, StackNavigationProps } from "../constants/AppRoutes";

const SingleDocument = ({
  navigation,
  route,
}: StackNavigationProps<AppRoutes, "Single Document">) => {
  const { document } = route.params;
  return (
    <View>
      <Text>{document.title}</Text>
    </View>
  );
};

export default SingleDocument;

const styles = StyleSheet.create({});
