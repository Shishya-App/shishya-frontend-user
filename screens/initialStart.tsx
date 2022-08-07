import React, { useEffect } from "react";
import { AuthenticationRoutes, StackNavigationProps } from "../constants/AuthenticationRoutes";
import {View, Text, Image, StyleSheet} from "react-native";

const InitialStartScreen = ({navigation}: StackNavigationProps<AuthenticationRoutes, "Initial">) => {
    useEffect(() => {
        // todo -> change this to as many seconds as needed
        setTimeout(() => {
            navigation.navigate('Onboard');
        }, 4000);
    }, []);

    return (
        <View style={styles.firstContainer}>
      <Image source={require("../assets/images/back.png")} />
      <View
        style={styles.secondartContainer}
      >
        <View>
            <Image source={require("../assets/images/logo.png")} />
            <Text style={styles.textStyle}>SHISHYA</Text>
        </View>
      </View>
      <Text style={styles.footerText}>Your one stop destination for all docs</Text>
    </View>
    )
}

export default InitialStartScreen;

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
        marginVertical: 100
      },
      textStyle: {
        marginVertical: 10,
        color: "#547AFF",
        fontSize: 32,
        fontWeight: "700",
        textAlign: "center",
      },
      footerText: {
        textAlign:'center',
        fontSize: 16,
        position:"absolute",
        bottom:'5%',
        left: 0,
        right: 0,
      }
});
