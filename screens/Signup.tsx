import React, { useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable
} from "react-native";
import {
  AuthenticationRoutes,
  StackNavigationProps,
} from "../constants/AuthenticationRoutes";
import CustomizedButton from "../components/customizedButton";
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

  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState(false);

  const toggleDialog = () => {
    setVisible(!visible);
  };

  // const handlePress = async () => {
  //   const res = await signupAPI(username, password, email);
  //   setLoading(loading);
  //   toggleDialog();
  // }; 

  const handleVerifyAadhar = () => {

  }


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
              aadharNo: "",
            }}
            onSubmit={async (values) => {
              // setLoading(true);
              // const res = await signupAPI(
              //   values.username,
              //   values.password,
              //   values.email
              // );
              // if (!res.isErr) {
              //   console.log("SIGNUP RES: ", res);
              //   setLoading(false);
              //   toggleDialog();
              // } else {
              //   setLoading(false);
              //   setErr(true);
              // }
              navigation.navigate('VerifyOTP');
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
                  placeholder="Aadhar Number"
                  setVal={handleChange("aadharNo")}
                  label={"Aadhar Number"}
                  error={errors.aadharNo}
                  isPass={false}
                  keyboardType={"numeric"}
                  onBlur={handleBlur("aadharNo")}
                />
                
                {/* <View style={miniButtonstyles.mainBody}>
                    <TouchableOpacity onPress={handleVerifyAadhar} activeOpacity={0.6} style={miniButtonstyles.buttonBG}>
                        <Text style={miniButtonstyles.textStyle}>Get OTP</Text>
                    </TouchableOpacity>
                </View> */}


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

          <DialogComponent
            dialog="An email has been sent to your email address. Please follow the link to confirm your account."
            onDone={() => navigation.navigate("Login")}
            title={"Confirm Email..."}
            toggleDialog={toggleDialog}
            visible={visible}
          />
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