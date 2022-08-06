import React from "react";
import { StyleSheet, Text, View } from "react-native";

const GetStarted = () => {

    return (
        <View>
            <Text style={styles.textStyle}>Hello World!!</Text>
        </View>
    )
}

export default GetStarted;

const styles = StyleSheet.create({
    textStyle: {
        color:'black',
        fontSize:24,
        fontWeight: '700'
    }
});