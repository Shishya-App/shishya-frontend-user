import React, { useContext, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
  TextInput,
  Dimensions,
} from "react-native";
import { AppRoutes, StackNavigationProps } from "../constants/AppRoutes";
import CustomizedButton from "../components/customizedButton";
import { AuthContext } from "../store/AuthContext";
import { loginValidationSchema } from "../utils/validations/AuthValidations";
import { Formik } from "formik";
import LoadingAPIS from "../components/LoadingApis";
import { CommonActions } from "@react-navigation/native";
import CustomTextInput from "../components/CustomTextInput";
import LottieView from "lottie-react-native";

const Login = ({
  navigation,
}: StackNavigationProps<AppRoutes, "Authentication">) => {
  const password = useRef<TextInput>(null);
  const { loginAPI } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  const handlePageChange = () => {
    navigation.dispatch(CommonActions.navigate({ name: "Signup" }));
  };

  return !loading ? (
    <ScrollView style={styles.main__scrollview__container}>
      <View style={styles.main__container}>
        <View style={styles.header__style}>
          <Text style={styles.login__text}>Login</Text>
          <Image source={require("../assets/images/User.png")} />
        </View>
        <View style={styles.image__container}>
          <LottieView
            source={require("../assets/lottie/login.json")}
            style={{ width: Dimensions.get("window").width / 1.25 }}
            autoPlay
            duration={10000}
            loop={false}
          />
        </View>
        <View style={styles.secondaryContainer}>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{ username: "", password: "" }}
            onSubmit={async (values) => {
              setLoading(true);
              const res = await loginAPI(values.username, values.password);
              if (!res.isErr) {
                setLoading(false);
                console.log("LOGIN RES: ", res.res);
                if (res?.res?.tokens) {
                  navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [{ name: "Main" }],
                    })
                  );
                }
              } else {
                setLoading(false);
                setErr(true);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, errors, touched }) => (
              <View style={styles.inputs__wrapper}>
                <CustomTextInput
                  label="Username"
                  keyboardType="default"
                  placeholder="Username"
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  error={errors.username}
                  touched={touched.username}
                  autoComplete="username"
                  autoCapitalize="none"
                  returnKeyType="next"
                  returnKeyLabel="next"
                  onSubmitEditing={() => password.current?.focus()}
                  blurOnSubmit={false}
                />
                <CustomTextInput
                  label="Password"
                  ref={password}
                  placeholder="Password"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  error={errors.password}
                  touched={touched.password}
                  autoComplete="password"
                  autoCapitalize="none"
                  returnKeyType="go"
                  returnKeyLabel="go"
                  onSubmitEditing={() => handleSubmit()}
                  secureTextEntry
                />
                {err ? (
                  <Text style={styles.error__text}>
                    Invalid username or password
                  </Text>
                ) : null}
                <CustomizedButton handlePress={handleSubmit} title={"Log in"} />
              </View>
            )}
          </Formik>
          <View style={styles.footer}>
            <Text style={styles.footer__text}>Dont have an account?</Text>
            <Pressable onPress={handlePageChange}>
              <Text style={styles.auth__text}> Signup</Text>
            </Pressable>
            {/* <Pressable
              onPress={() => {
                navigation.navigate("Main");
              }}
            >
              <Text>Click me</Text>
            </Pressable> */}
          </View>
          {/* <DialogComponent dialog="Email has been sent to you. Please confirm it...." onDone={() => navigation.navigate("Login")} title={"Email Confirmation"} toggleDialog={toggleDialog} visible={visible} /> */}
        </View>
      </View>
    </ScrollView>
  ) : (
    <LoadingAPIS dialog="Please wait, while we confirm your account details :)" />
  );
};

export default Login;

const styles = StyleSheet.create({
  main__scrollview__container: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  },
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
    flexDirection: "row",
  },
  footer__text: {
    textAlign: "center",
    color: "#999EA1",
  },
  auth__text: {
    color: "#4E0189",
  },
  error__text: {
    fontSize: 12,
    fontWeight: "300",
    color: "#FF0000",
    marginTop: 5,
    paddingHorizontal: 5,
    textAlign: "center",
  },
});
