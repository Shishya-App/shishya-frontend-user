import React from "react";
import {View, TextInput, Text, StyleSheet} from "react-native";

interface propTypes  {
    setVal: any,
    placeholder: string,
    label: string,
    keyboardType: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'visible-password' | 'ascii-capable' | 'numbers-and-punctuation' | 'url' | 'number-pad' | 'name-phone-pad' | 'decimal-pad' | 'twitter' | 'web-search' | undefined;
    onBlur: any,
    isPass: boolean,
    error: string | undefined
}
const CustomInput = ({setVal, placeholder, label, onBlur, keyboardType, isPass, error}: propTypes) => {
    return (
        <View style={styles(error).input__wrapper}>
            <Text style={styles(error).label__style}>{label}</Text>
            
            <TextInput 
                style={styles(error).input__style} 
                placeholder={placeholder}
                onChangeText={setVal}
                placeholderTextColor={"#9E9E9E"} 
                keyboardType={keyboardType}
                onBlur={onBlur}
                secureTextEntry={isPass}
            />
            {
                error && <Text style={styles(error).error__text}>{error}</Text>
            }
        </View>      
    )
};

export default CustomInput;


const styles = (error: any) => StyleSheet.create({
    input__wrapper: {
        width: "100%",
        marginBottom: 5,
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
        borderColor: error ? "#FF7777" : "#C6C6C6",
        borderRadius: 10,
    },
    error__text: {
        fontSize: 12,
        fontWeight: '300',
        color: "#FF0000",
        marginTop: 5,
        paddingHorizontal: 5,
    }
});