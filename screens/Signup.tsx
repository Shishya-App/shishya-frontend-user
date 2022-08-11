import React, { useEffect, useContext } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import {
  AuthenticationRoutes,
  StackNavigationProps,
} from "../constants/AuthenticationRoutes";
import CustomizedButton from "../components/customizedButton";
import useAxios from "../hooks/useAxios";
import LoadingAPIS from "../components/LoadingApis";
import DialogComponent from "../components/DialogComponent";
import { AuthContext } from "../store/AuthContext";
const Signup = ({
  navigation,
}: StackNavigationProps<AuthenticationRoutes, "Signup">) => {
  const {signupAPI} = useContext(AuthContext);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  //   todo -> Signup integration done just improve the folder structure

  const toggleDialog = () => {
    setVisible(!visible);
  };

  const handlePress = async () => {
    const res = await signupAPI(username, password, email);
    setLoading(loading);
    toggleDialog();
  };

  return (
    // todo -> Make component for text input
    !loading ? (
      <View>
        <View>
          <Text style={styles.textStyle}>Welcome to Sign Up!!</Text>

          <TextInput
            placeholder="Username"
            onChangeText={(text) => setUsername(text)}
            style={styles.textInputStyle}
          />

          <TextInput
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            style={styles.textInputStyle}
          />

          <TextInput
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            style={styles.textInputStyle}
          />

          <CustomizedButton handlePress={handlePress} title={"Sign Up"} />
        </View>
        <DialogComponent dialog="Email has been sent to you. Please confirm it...." onDone={() => navigation.navigate("Login")} title={"Email Confirmation"} toggleDialog={toggleDialog} visible={visible} />
      </View>
    ) : (
      <LoadingAPIS text="Please be patient..." />
    )
  );
};

export default Signup;

const styles = StyleSheet.create({
  textStyle: {
    marginTop: 50,
    color: "black",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },
  textInputStyle: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "black",
  },
});
