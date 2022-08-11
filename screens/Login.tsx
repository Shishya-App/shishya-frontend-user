import React, { useEffect, useContext } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import CustomizedButton from "../components/customizedButton";
import { AuthContext } from "../store/AuthContext";
const Login = () => {
    const {loginAPI} = useContext(AuthContext);

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const handlePress = async () => {
        setLoading(true);
        const res = await loginAPI(username, password);
        setLoading(false);
    }
    

    return (
        <View>
          <Text style={styles.textStyle}>Login</Text>

          <TextInput
            placeholder="Username"
            onChangeText={(text) => setUsername(text)}
            style={styles.textInputStyle}
          />

          <TextInput
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            style={styles.textInputStyle}
          />

          <CustomizedButton handlePress={handlePress} title={"Log In"} />
        </View>
    )
}

export default Login;

const styles = StyleSheet.create({
    textStyle: {
      marginTop: 50,
      color: "black",
      fontSize: 24,
      fontWeight: "700",
      textAlign: "center",
    },
    textInputStyle: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: "black",
    },
  });