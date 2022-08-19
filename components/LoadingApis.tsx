import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

type propTypes = {
  dialog: string;
};

const LoadingAPIS = ({
  dialog,
}: propTypes) => {
  return (
    <View>
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>
          {dialog}
        </Text>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    </View>
  );
};

export default LoadingAPIS;

const styles = StyleSheet.create({
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  loadingText: {
    color: "black",
    fontSize: 20,
    fontWeight: "300",
    textAlign: "center",
    // lineHeight: 10
  },

});
