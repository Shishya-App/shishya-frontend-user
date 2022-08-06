import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Dashboard = () => {

    return (
        <View>
            <Text style={styles.textStyle}>Welcome to Dashboard</Text>
        </View>
    )
}

export default Dashboard;

const styles = StyleSheet.create({
    textStyle: {
        color:'black',
        fontSize:24,
        fontWeight: '700',
        textAlign: 'center'
    }
});