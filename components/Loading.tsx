import React from "react";
import { StyleSheet, Text, View, ActivityIndicator} from "react-native";

const Loading = () => {
    return (
        <View style={styles.mainBody}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    )
}

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }
});

export default Loading;