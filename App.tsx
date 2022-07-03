import { useState } from "react";
import { StyleSheet } from "react-native";
import { CheckBox, Header } from "@rneui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default () => {
  const [check1, setCheck1] = useState(true);

  return (
    <SafeAreaProvider>
      <Header
        leftComponent={{
          icon: "menu",
          color: "white",
          size: 30,
        }}
        centerComponent={{ text: "Shishya", style: styles.heading }}
      ></Header>
      <CheckBox
        center
        title="Is this project going to be awesome?"
        checked={check1}
        onPress={() => setCheck1(!check1)}
      />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  heading: {
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: 20,
  },
});
