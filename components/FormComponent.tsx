import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import CustomizedButton from "./customizedButton";

interface IProps {
    form: any
}
const FormComponent = ({form}: IProps) => {
    return (
        <View style={styles.main_wrapper}>
            <Text style={styles.form_name}>{form.name}</Text>
            <View style={styles.button_wrapper}>
                <Pressable style={styles.button_cont}>
                    <Text style={styles.button_style}>Apply Now</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default FormComponent;

const styles = StyleSheet.create({
    main_wrapper: {
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#C6C6C6',
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems:'center',
        marginVertical: 20,
        backgroundColor:'white',
    },
    form_name: {
        fontSize: 18,
        fontWeight: '400',
    },
    button_wrapper: {
        width: '40%',
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    button_cont: {
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderRadius: 10,
        backgroundColor: '#547AFF',
    },
    button_style: {
        fontSize: 15,
        color: 'white',
        fontWeight: '600',
        textAlign: 'center'
    },
});