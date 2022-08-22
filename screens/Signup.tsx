import React, { useEffect, useContext } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
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
import { signUpValidationSchema } from "../utils/validations/AuthValidations";
import { Formik } from "formik";

const Signup = ({
  navigation,
}: StackNavigationProps<AuthenticationRoutes, "Signup">) => {
  const { signupAPI } = useContext(AuthContext);
  // todo -> HANDLE CONFIRM PASSWORD FEATURE IN FRONTEND ONLY

  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const toggleDialog = () => {
    setVisible(!visible);
  };

  // const handlePress = async () => {
  //   const res = await signupAPI(username, password, email);
  //   setLoading(loading);
  //   toggleDialog();
  // };

  return (
    !loading ? 
    <View style={styles.main__container}>
      <Image source={require("../assets/images/back.png")} />
      <View style={styles.secondaryContainer}>
        <View style={styles.textViews}>
          <View style={styles.logo__container}>
            <Image source={require("../assets/images/signupHat.png")} />
          </View>
          <Text style={styles.textStyle}>Create an account</Text>
          <Text style={styles.subTextStyle}>
            Ease out your admission process
          </Text>
        </View>
        <Formik
          validationSchema={signUpValidationSchema}
          initialValues={{
            username: "",
            password: "",
            email: "",
            confirmPassword: "",
          }}
          onSubmit={async (values) => {
            setLoading(true);
            const res = await signupAPI(
              values.username,
              values.password,
              values.email
            );
            console.log("SIGNUP RES: ", res);
            setLoading(false);
            toggleDialog();
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View style={styles.inputs__wrapper}>
              <CustomInput
                placeholder="Username"
                setVal={handleChange("username")}
                label={"Username"}
                isPass={false}
                keyboardType={"default"}
                onBlur={handleBlur("username")}
                error={errors.username}
              />
              <CustomInput
                placeholder="Email"
                setVal={handleChange("email")}
                label={"Email"}
                error={errors.email}
                isPass={false}
                keyboardType={"email-address"}
                onBlur={handleBlur("email")}
              />
              <CustomInput
                placeholder="Password"
                setVal={handleChange("password")}
                label={"Password"}
                error={errors.password}
                isPass={true}
                keyboardType={undefined}
                onBlur={handleBlur("password")}
              />
              <CustomInput
                placeholder="Confirm Password"
                setVal={handleChange("confirmPassword")}
                label={"Confirm Password"}
                error={errors.confirmPassword}
                isPass={true}
                keyboardType={undefined}
                onBlur={handleBlur("confirmPassword")}
              />
              <CustomizedButton handlePress={handleSubmit} title={"Sign Up"} />
            </View>
          )}
        </Formik>
        <View style={styles.footer}>
          <Text style={styles.footer__text}>
            Already have an account?{" "}
            <Text style={styles.auth__text}>Login</Text>
          </Text>
        </View>
       
        <DialogComponent
          dialog="An email has been sent to your email address. Please follow the link to confirm your account."
          onDone={() => navigation.navigate("Login")}
          title={"Confirm Email..."}
          toggleDialog={toggleDialog}
          visible={visible}
        />
      </View>
    </View>
    :
    <LoadingAPIS dialog="Please Wait while we fetch data your data."/>
  );
};

export default Signup;

const styles = StyleSheet.create({
  main__container: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  },
  textViews: {
    width: "100%",
  },
  logo__container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  secondaryContainer: {
    width: "100%",
    heigth: "100%",
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
    width: "100%",
    paddingHorizontal: 30,
    marginVertical: 10,
  },
  textInputStyle: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "black",
  },
  footer: {
    marginBottom: 10,
  },
  footer__text: {
    textAlign: "center",
    color: "#999EA1",
  },
  auth__text: {
    color: "#4E0189",
  },
});
