import React, { useEffect, useContext, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
  TextInput
} from "react-native";
import {
  AuthenticationRoutes,
  StackNavigationProps,
} from "../constants/AuthenticationRoutes";
import CustomizedButton from "../components/customizedButton";
import LoadingAPIS from "../components/LoadingApis";
import DialogComponent from "../components/DialogComponent";
import { AuthContext } from "../store/AuthContext";
// import CustomInput from "../components/input";
import CustomTextInput from "../components/CustomTextInput";
import { signUpValidationSchema } from "../utils/validations/AuthValidations";
import { Formik } from "formik";

const Signup = ({
  navigation,
}: StackNavigationProps<AuthenticationRoutes, "Signup">) => {
  const lastName = useRef<TextInput>(null);
  const username = useRef<TextInput>(null);
  const email = useRef<TextInput>(null);
  const adhaar = useRef<TextInput>(null);
  const password = useRef<TextInput>(null);
  const confirmPassword = useRef<TextInput>(null);

  const { signupAPI } = useContext(AuthContext);

  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState(false);

  const toggleDialog = () => {
    setVisible(!visible);
  };

  return !loading ? (
    <ScrollView style={styles.main__container}>
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
              firstName: "",
              lastName: "",
              adhaarNo: ""
            }}
            onSubmit={async (values) => {
              setLoading(true);
              const res = await signupAPI(
                values.username,
                values.password,
                values.email,
                values.firstName,
                values.lastName,
                values.adhaarNo
              );
              if (!res.isErr) {
                console.log("SIGNUP RES: ", res);
                setLoading(false);
                // toggleDialog();
                navigation.navigate('VerifyOTP', {res: res});
              } else {
                console.log("RES ERR: ", res.res);
                setLoading(false);
                setErr(true);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View style={styles.inputs__wrapper}>
                <CustomTextInput
                  label="First Name"
                  keyboardType="default"
                  placeholder="First Name"
                  onChangeText={handleChange("firstName")}
                  onBlur={handleBlur("firstName")}
                  error={errors.firstName}
                  touched={touched.firstName}
                  autoComplete="name"
                  autoCapitalize="words"
                  returnKeyType="next"
                  returnKeyLabel="Next"
                  onSubmitEditing={() => lastName.current?.focus()}
                  blurOnSubmit={false}
                />
                <CustomTextInput
                  label="Last Name"
                  keyboardType="default"
                  placeholder="Last Name"
                  onChangeText={handleChange("lastName")}
                  onBlur={handleBlur("lastName")}
                  error={errors.lastName}
                  touched={touched.lastName}
                  autoComplete="name-family"
                  autoCapitalize="words"
                  returnKeyType="next"
                  returnKeyLabel="Next"
                  onSubmitEditing={() => username.current?.focus()}
                  blurOnSubmit={false}
                  ref={lastName}
                />
                <CustomTextInput
                  label="Username"
                  keyboardType="default"
                  placeholder="Username"
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  error={errors.username}
                  touched={touched.username}
                  autoComplete="name"
                  autoCapitalize="words"
                  returnKeyType="next"
                  returnKeyLabel="Next"
                  onSubmitEditing={() => email.current?.focus()}
                  blurOnSubmit={false}
                  ref={username}
                />
                <CustomTextInput
                  label="Email ID"
                  keyboardType="email-address"
                  placeholder="Email ID"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  error={errors.email}
                  touched={touched.email}
                  autoComplete="email"
                  autoCapitalize="none"
                  returnKeyType="next"
                  returnKeyLabel="Next"
                  onSubmitEditing={() => adhaar.current?.focus()}
                  blurOnSubmit={false}
                  ref={email}
                />
                <CustomTextInput
                 label="Adhaar Number"
                 keyboardType="numeric"
                 placeholder="Adhaar Number"
                 onChangeText={handleChange("adhaarNo")}
                 onBlur={handleBlur("adhaarNo")}
                 error={errors.adhaarNo}
                 touched={touched.adhaarNo}
                 autoComplete="off"
                 autoCapitalize="none"
                 returnKeyType="next"
                 returnKeyLabel="Next"
                 onSubmitEditing={() => password.current?.focus()}
                 blurOnSubmit={false}
                 ref={adhaar}
                />
                
                {/* <View style={miniButtonstyles.mainBody}>
                    <TouchableOpacity onPress={handleVerifyAadhar} activeOpacity={0.6} style={miniButtonstyles.buttonBG}>
                        <Text style={miniButtonstyles.textStyle}>Get OTP</Text>
                    </TouchableOpacity>
                </View> */}


                <CustomTextInput
                  label="Password"
                  keyboardType="default"
                  placeholder="Password"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  error={errors.password}
                  touched={touched.password}
                  autoComplete="off"
                  autoCapitalize="none"
                  returnKeyType="next"
                  returnKeyLabel="Next"
                  onSubmitEditing={() => confirmPassword.current?.focus()}
                  blurOnSubmit={false}
                  ref={password}
                  secureTextEntry
                />
                <CustomTextInput
                  label="Confirm Password"
                  keyboardType="default"
                  placeholder="Confirm Password"
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  error={errors.confirmPassword}
                  touched={touched.confirmPassword}
                  autoComplete="off"
                  autoCapitalize="none"
                  returnKeyType="go"
                  returnKeyLabel="Submit"
                  onSubmitEditing={() => handleSubmit()}
                  blurOnSubmit={false}
                  ref={confirmPassword}
                  secureTextEntry
                />

                {err ? (
                  <Text style={styles.error__text}>
                    Something went wrong. Please try again
                  </Text>
                ) : null}
                <CustomizedButton
                  handlePress={handleSubmit}
                  title={"Get OTP"}
                />
              </View>
            )}
          </Formik>
          <View style={styles.footer}>
            <Text style={styles.footer__text}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.auth__text}>Login</Text>
            </TouchableOpacity>
          </View>

          {/* <DialogComponent
            dialog="An email has been sent to your email address. Please follow the link to confirm your account."
            onDone={() => navigation.navigate("Login")}
            title={"Confirm Email..."}
            toggleDialog={toggleDialog}
            visible={visible}
          /> */}
        </View>
      </View>
    </ScrollView>
  ) : (
    <LoadingAPIS dialog="Please Wait while we fetch data your data." />
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
  getOTP: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
  }
});


// const miniButtonstyles = StyleSheet.create({
//   mainBody: {
//       width: '100%',
//       display:'flex',
//       justifyContent:'center',
//       // alignItems:'center',
//       marginBottom: 10,
//   },
//   buttonBG: {
//       width: '50%',
//       backgroundColor: "#0063F5",
//       display: "flex",
//       justifyContent:'center',
//       alignItems:'center',
//       borderRadius: 8,
//       paddingHorizontal: 15,
//       paddingVertical: 5,
//       marginVertical: 2
//   },
//   textStyle: {
//       color: 'white',
//       fontSize: 14,
//       fontWeight: '700'
//   }
// });