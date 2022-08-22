import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

const AddButton = () => {
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <FontAwesome5 name="plus" size={24} color="white" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "#5D5AFF",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "#FFFFFF",
    position: "absolute",
    top: -50,
    shadowColor: "#FFFFFF",
    shadowRadius: 20,
    shadowOffset: { width: 30, height: 30 },
    elevation: 3,
    shadowOpacity: 1,
  },
});

export default AddButton;
