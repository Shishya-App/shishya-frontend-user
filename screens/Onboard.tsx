import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import {
  StackNavigationProps,
  AuthenticationRoutes,
} from "../constants/AuthenticationRoutes";
import CustomizedButton from "../components/customizedButton";

const Onboard = ({
  navigation,
}: StackNavigationProps<AuthenticationRoutes, "Onboard">) => {
  return (
    <View style={styles.firstContainer}>
      <Image source={require("../assets/images/back.png")} />
      <View
        style={styles.secondartContainer}
      >
        <View>
            <Image source={require("../assets/images/firstPic.png")} />
        </View>
        <View
          style={styles.textContainer}
        >
          <Text style={styles.textStyle}>Get all your data in a click</Text>
          <Text style={styles.textContent}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus
            praesent purus tincidunt ut cursus vitae. Nisl, vitae nulla lectus
            tortor, est a aliquam. Pretium netus{" "}
          </Text>
        </View>
        <View style={styles.button__wrapper}>
          <CustomizedButton  handlePress={() => navigation.navigate('Signup')} title={"Get Started"}/>
        </View>
      </View>
    </View>
  );
};

export default Onboard;

const styles = StyleSheet.create({
  firstContainer: {
    backgroundColor: "white",
    height: "100%",
  },
  secondartContainer: {
    width: "100%",
    heigth: '100%',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 40
  },
  textContainer: {
    width: "70%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 40,
  },
  textStyle: {
    color: "black",
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
  },
  textContent: {
    color: "black",
    fontSize: 14,
    textAlign: "center",
    marginVertical: 15
  },
  button__wrapper: {
    width: '70%'
  }
});
