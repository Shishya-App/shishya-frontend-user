import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Login = () => {

    return (
        <View>
            <Text style={styles.textStyle}>Welcome to Login!!</Text>
        </View>
    )
}

export default Login;

const styles = StyleSheet.create({
    textStyle: {
        marginTop: 50,
        color:'black',
        fontSize:24,
        fontWeight: '700',
        textAlign: 'center'
    }
});