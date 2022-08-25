import React, { forwardRef } from "react";
import {
  TextInput,
  TextInputProps,
  View,
  StyleSheet,
  Text,
} from "react-native";
import RoundedIcon from "./RoundedIcon";

interface Props extends TextInputProps {
  error?: string;
  touched?: boolean;
  label: string;
}

const validationColor = "#223e4b";

const CustomTextInput = forwardRef<TextInput, Props>(
  ({ error, touched, label, ...rest }, ref) => {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.text}>{label}</Text>
        <View style={styles.container}>
          <View style={styles.input}>
            <TextInput
              underlineColorAndroid="transparent"
              placeholderTextColor="rgba(34, 62, 75, 0.7)"
              {...{ ref }}
              {...rest}
            />
          </View>
          {touched && (
            <RoundedIcon
              size={16}
              name={error ? "x" : "check"}
              color="white"
              backgroundColor={error ? "#FF0058" : "#2EB872"}
            />
          )}
        </View>
        {touched && error && <Text style={styles.error}>{error}</Text>}
      </View>
    );
  }
);

export default CustomTextInput;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 10,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    borderColor: validationColor,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 8,
  },
  icon: {
    padding: 8,
  },
  input: {
    flex: 1,
  },
  error: {
    color: "#FF0058",
    fontSize: 12,
    textAlign: "center",
  },
  text: {
    color: "#4E0189",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
  },
});
