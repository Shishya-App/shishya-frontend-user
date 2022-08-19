import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Pressable} from "react-native";

type propTypes = {
    title: string,
    handlePress: () => void
};

const CustomizedButton = ({title, handlePress}: propTypes) => {
    return (
        <View style={styles.mainBody}>
            <TouchableOpacity onPress={handlePress} activeOpacity={0.6} style={styles.buttonBG}>
                <Text style={styles.textStyle}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    mainBody: {
        width: '100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    buttonBG: {
        width: '100%',
        backgroundColor: "#0063F5",
        display: "flex",
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 12,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 10
    },
    textStyle: {
        color: 'white',
        fontSize: 20,
        fontWeight: '700'
    }
});

export default CustomizedButton;