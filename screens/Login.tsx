import React, { useEffect, useContext, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { AppRoutes, StackNavigationProps } from "../constants/AppRoutes";
import CustomizedButton from "../components/customizedButton";
import { AuthContext } from "../store/AuthContext";
import CustomInput from "../components/input";
import { loginValidationSchema } from "../utils/validations/AuthValidations";
import { Formik } from "formik";
import LoadingAPIS from "../components/LoadingApis";

const Login = ({navigation}: StackNavigationProps<AppRoutes, "Authentication">) => {
  const { loginAPI } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  // const handlePress = async () => {
  //   setLoading(true);
  //   const res = await loginAPI(username, password);
  //   setLoading(false);
  // };

  return (
    !loading ? 
    <View style={styles.main__container}>
      <View style={styles.header__style}>
        <Text style={styles.login__text}>Login</Text>
        <Image source={require("../assets/images/User.png")} />
      </View>
      <View style={styles.image__container}>
        <Image source={require("../assets/images/loginBack.png")} />
      </View>
      <View style={styles.secondaryContainer}>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{ username: "", password: "" }}
          onSubmit={async (values) => {
              setLoading(true);
              const res = await loginAPI(values.username, values.password);
              setLoading(false);
              console.log("LOGIN RES: ", res);
              if(res?.tokens) navigation.navigate('Main');
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View style={styles.inputs__wrapper}>
              <CustomInput
                placeholder="Username"
                setVal={handleChange('username')}
                label={"Username"}
                keyboardType="default"
                onBlur={handleBlur('username')}
                isPass={false}
                error={errors.username}
              />
              <CustomInput
                placeholder="Password"
                setVal={handleChange('password')}
                label={"Password"}
                keyboardType="default"
                onBlur={handleBlur('password')}
                isPass={true}
                error={errors.password}
              />
              
              <CustomizedButton handlePress={handleSubmit} title={"Log in"} />
            </View>
          )}
        </Formik>
        <View style={styles.footer}>
          <Text style={styles.footer__text}>
            Dont have an account? <Text style={styles.auth__text}>Sign Up</Text>
          </Text>
        </View>
        {/* <DialogComponent dialog="Email has been sent to you. Please confirm it...." onDone={() => navigation.navigate("Login")} title={"Email Confirmation"} toggleDialog={toggleDialog} visible={visible} /> */}
      </View>
    </View>
    :
    <LoadingAPIS dialog="Please wait, while we redirect you to your dashboard :)"/>
  );
};

export default Login;

const styles =  StyleSheet.create({
  main__container: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  header__style: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  login__text: {
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 10,
  },
  image__container: {
    width: "100%",
    marginHorizontal: 20,
    marginVertical: 20,
  },
  secondaryContainer: {
    width: "100%",
    heigth: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  inputs__wrapper: {
    width: "100%",
    paddingHorizontal: 10,
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
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  footer__text: {
    textAlign: "center",
    color: "#999EA1",
  },
  auth__text: {
    color: "#4E0189",
  },
});
