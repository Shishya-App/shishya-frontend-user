import React from "react";
import {View, Text, StyleSheet, ActivityIndicator} from "react-native";

type propTypes = {
    text: string
}
const LoadingAPIS = ({text}: propTypes) => {
    return (
        <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Please wait while we register you!!</Text>
            <ActivityIndicator size="large" color="#0000ff"/>
        </View>
    )
}

export default LoadingAPIS;

const styles = StyleSheet.create({
    loadingContainer: {
        display:'flex', 
        justifyContent:'center', 
        alignItems:'center', 
        width: '100%', 
        height: '100%'
      },
      loadingText: {
        color: 'black', 
        fontSize: 20, 
        fontWeight: '600', 
        textAlign:'center'
      }
})
