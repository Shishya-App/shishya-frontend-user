import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomizedButton from "../components/customizedButton";
import { AuthContext } from "../store/AuthContext";
import { useContext } from "react";

const Dashboard = () => {
    const {logout} = useContext(AuthContext);

    return (
        <View>
            <Text style={styles.textStyle}>Welcome to Dashboard</Text>
            <CustomizedButton handlePress={logout} title={"Logout"}/>
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