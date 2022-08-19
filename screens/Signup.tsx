import React, { useEffect, useContext } from "react";
import { StyleSheet, Text, View, Image} from "react-native";
import {
  AuthenticationRoutes,
  StackNavigationProps,
} from "../constants/AuthenticationRoutes";
import CustomizedButton from "../components/customizedButton";
import useAxios from "../hooks/useAxios";
import LoadingAPIS from "../components/LoadingApis";
import DialogComponent from "../components/DialogComponent";
import { AuthContext } from "../store/AuthContext";
import CustomInput from "../components/input";

const Signup = ({
  navigation,
}: StackNavigationProps<AuthenticationRoutes, "Signup">) => {
  const {signupAPI} = useContext(AuthContext);
  // todo -> HANDLE CONFIRM PASSWORD FEATURE IN FRONTEND ONLY

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const toggleDialog = () => {
    setVisible(!visible);
  };

  const handlePress = async () => {
    const res = await signupAPI(username, password, email);
    setLoading(loading);
    toggleDialog();
  };

  return (

    !loading ? (
      <View style={styles.main__container}>
        <Image source={require("../assets/images/back.png")} />
        <View style={styles.secondaryContainer}>
            <View style={styles.textViews}>
              <View style={styles.logo__container}>
                <Image source={require("../assets/images/signupHat.png")} />
              </View>
              <Text style={styles.textStyle}>Create an account</Text>
              <Text style={styles.subTextStyle}>Ease out your admission process</Text>
            </View>
            <View style={styles.inputs__wrapper}>
              <CustomInput placeholder="Username" setVal={setUsername} label={"Username"}/>
              <CustomInput placeholder="Email" setVal={setEmail} label={"Email"}/>
              <CustomInput placeholder="Password" setVal={setPassword} label={"Password"}/>
              <CustomInput placeholder="Confirm Password" setVal={setConfirmPassword} label={"Confirm Password"}/>
              <CustomizedButton handlePress={handlePress} title={"Sign Up"} />

            </View>

              <View style={styles.footer}>
                <Text style={styles.footer__text}>Already have an account? <Text style={styles.auth__text}>Login</Text></Text>
              </View>
          <DialogComponent dialog="Email has been sent to you. Please confirm it...." onDone={() => navigation.navigate("Login")} title={"Email Confirmation"} toggleDialog={toggleDialog} visible={visible} />
        </View>
      </View>
    ) : (
      <LoadingAPIS text="Please be patient..." />
    )
  );
};

export default Signup;

const styles = StyleSheet.create({
  main__container: {
    backgroundColor: "white",
    width: '100%',
    height: '100%',
  },
  textViews: {
    width: '100%',
  },
  logo__container: {
    width: '100%',
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
  },
  secondaryContainer: {
    width: "100%",
    heigth: '100%',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    color: "black",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },
  subTextStyle: {
    marginTop: 5,
    color: "grey",
    fontSize: 16,
    fontWeight: "300",
    textAlign: "center",
  },
  inputs__wrapper: {
    width: '100%',
    paddingHorizontal: 30,
    marginVertical: 20,
  },
  textInputStyle: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "black",
  },
  footer: {
    display:'flex',
    flexDirection:'column',
    justifyContent:'flex-end',
  },
  footer__text: {
    textAlign: 'center',
    color: "#999EA1"
  },
  auth__text: {
    color: "#4E0189",
  }
});
