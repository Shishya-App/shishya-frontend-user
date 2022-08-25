import React from "react";
import { StyleSheet } from "react-native";
import { SearchBar as SearchBarRNEUI } from "@rneui/base";

interface IProps {
  handleSearch: (text: string) => void;
}

const SearchBar = ({ handleSearch }: IProps) => {
  return (
    <SearchBarRNEUI
      platform="android"
      placeholder="Search"
      placeholderTextColor="white"
      inputStyle={{ color: "white" }}
      containerStyle={{
        backgroundColor: "#5D5AFF",
        marginHorizontal: 20,
        borderRadius: 20,
      }}
      searchIcon={{
        type: "material-community",
        name: "magnify",
        color: "white",
      }}
      cancelIcon={{
        type: "material-community",
        name: "keyboard-backspace",
        color: "white",
      }}
      clearIcon={{
        type: "material-community",
        name: "close",
        color: "white",
      }}
      inputContainerStyle={{
        backgroundColor: "#5D5AFF",
        borderRadius: 20,
      }}
      onChangeText={(text) => handleSearch(text)}
    />
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  text_input_wrapper: {
    width: "70%",
    marginVertical: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  text_input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#C6C6C6",
    borderRadius: 10,
    color: `rgba(31, 31, 31, 0.43)`,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
});
