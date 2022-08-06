import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { StackNavigationProps, AuthenticationRoutes } from "../constants/AuthenticationRoutes";


const Onboard = ({navigation}: StackNavigationProps<AuthenticationRoutes, "Onboard">) => {
    return (
        <View>
            <Text style={styles.textStyle}>Holaa!!</Text>
            <Text style={styles.textStyle}>Welcome to Onboarding!!</Text>
            <Button title="Go to Login" onPress={() => navigation.navigate("Login")} />
            <Button title="Go to Signup" onPress={() => navigation.navigate("Signup")} />
        </View>
    )
}

export default Onboard;

const styles = StyleSheet.create({
    textStyle: {
        marginTop: 50,
        color:'black',
        fontSize:24,
        fontWeight: '700',
        textAlign:'center'
    }
});