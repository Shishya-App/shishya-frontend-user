import React from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";

interface IProps {
    setVal: any,
}

const SearchBar = ({setVal}: IProps) => {
    return (
        <View style={styles.text_input_wrapper}>
            <TextInput placeholder="Search" style={styles.text_input} placeholderTextColor={'#C6C6C6'} onChangeText={(text) => setVal(text)}/>
        </View>
    )
}

export default SearchBar;

const styles = StyleSheet.create({
    text_input_wrapper: {
        width: '70%',
        marginVertical: 5,
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    text_input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#C6C6C6',
        borderRadius: 10,
        color: `rgba(31, 31, 31, 0.43)`,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor:'white'
    }
})