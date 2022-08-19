import React from "react";
import {View, TextInput, Text, StyleSheet} from "react-native";

type propTypes = {
    setVal: any,
    placeholder: string,
    label: string,
}
const CustomInput = ({setVal, placeholder, label}: propTypes) => {
    return (
        <View style={styles.input__wrapper}>
            <Text style={styles.label__style}>{label}</Text>
            <TextInput style={styles.input__style} 
            placeholder={placeholder}
            onChangeText={(text) => setVal(text)}
            placeholderTextColor={"#9E9E9E"} 
            />
        </View>      
    )
};

export default CustomInput;


const styles = StyleSheet.create({
    input__wrapper: {
        width: "100%",
        marginBottom: 10,
    },
    label__style: {
        color: "#4E0189",
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 5,
    },
    input__style: {
        width: "100%",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: "#C6C6C6",
        borderRadius: 10,
    }
});