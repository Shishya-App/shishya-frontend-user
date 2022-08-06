import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Signup = () => {

    return (
        <View>
            <Text style={styles.textStyle}>Welcome to Sign Up!!</Text>
        </View>
    )
}

export default Signup;

const styles = StyleSheet.create({
    textStyle: {
        marginTop: 50,
        color:'black',
        fontSize:24,
        fontWeight: '700',
        textAlign:'center'
    }
});