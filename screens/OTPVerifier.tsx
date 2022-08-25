import React, { useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ImageBackground,
  Pressable,
} from "react-native";
import {
  AuthenticationRoutes,
  StackNavigationProps,
} from "../constants/AuthenticationRoutes";
import CustomizedButton from "../components/customizedButton";
import LoadingAPIS from "../components/LoadingApis";
import CustomInput from "../components/input";
import { OTPValidationSchema } from "../utils/validations/AuthValidations";
import { Formik } from "formik";
import { SafeAreaView } from "react-native-safe-area-context";

const VerifyOTP = ({
  navigation,
}: StackNavigationProps<AuthenticationRoutes, "Signup">) => {
  const [err, setErr] = React.useState(false);
  const [timer, setTimer] = React.useState(120);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const TEMP_OTP = "1201";
  const resendOTP = () => {};

  return (
    <ScrollView style={styles.main__container}>
      <View style={styles.main__container}>
        <ImageBackground
          source={require("../assets/images/otpTop.png")}
          resizeMode="stretch"
          style={{
            width: "100%",
            height: "100%",
          }}
          imageStyle={{
            width: "100%",
            height: "40%",
          }}
        >   
        <SafeAreaView>

            <View style={styles.secondaryContainer}>
            <View style={styles.textViews}>
                <View>
                    <Text style={{fontSize: 30, fontWeight: '600', color: '#3D3939', padding:20, marginTop: 20}}>OTP Verification</Text>
                </View>
                <View style={styles.logo__container}>
                <Image source={require("../assets/images/otpVector.png")} />
                </View>
                <View style={{marginTop: '10%', paddingHorizontal: 10 }}>
                    <Text style={styles.textStyle}>
                        We will send you one time password to the Linked mobile number
                    </Text>
                    <Text style={styles.subTextStyle}>{"( +91 98765***** )"}</Text>
                </View>
            </View>
            <Formik
                validationSchema={OTPValidationSchema}
                initialValues={{
                otp: "",
                }}
                onSubmit={async (values) => {
                //   todo -> handle API call here
                console.log(values);
                if (values.otp === TEMP_OTP) {
                    navigation.navigate("Login");
                } else {
                    setErr(true);
                }
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <View style={styles.inputs__wrapper}>
                    <CustomInput
                    placeholder="OTP"
                    setVal={handleChange("otp")}
                    label={"OTP"}
                    isPass={false}
                    keyboardType={"numeric"}
                    onBlur={handleBlur("otp")}
                    error={errors.otp}
                    />

                    {err ? (
                    <Text style={styles.error__text}>
                        Incorrect OTP entered. Please try again.
                    </Text>
                    ) : null}
                    <View
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                    >
                    <View style={{ width: "45%" }}>
                        <CustomizedButton
                        handlePress={handleSubmit}
                        title={"Submit"}
                        />
                    </View>
                    <View style={{ width: "45%" }}>
                        {timer > 0 ? (
                        <Text style={styles.timer__text}>
                            Resend OTP in {timer} seconds
                        </Text>
                        ) : (
                        <Pressable style={{width: '100%'}}>
                            <Text style={{fontSize: 16, fontWeight: '500', textAlign: 'center'}}>Resend</Text>
                        </Pressable>
                        )}
                    </View>
                    </View>
                </View>
                )}
            </Formik>

            {/* <DialogComponent
                dialog="An email has been sent to your email address. Please follow the link to confirm your account."
                onDone={() => navigation.navigate("Login")}
                title={"Confirm Email..."}
                toggleDialog={toggleDialog}
                visible={visible}
            /> */}
            </View>
        </SafeAreaView>
        
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

export default VerifyOTP;

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
    marginTop: "1%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
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
  textStyle: {
    color: "#575555",
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
  },
  subTextStyle: {
    marginTop: 5,
    color: "black",
    fontSize: 15,
    fontWeight: "600",
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
  },
  timer__text: {
    fontSize: 12,
  },
});
