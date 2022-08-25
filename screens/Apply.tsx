import React from "react";
import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import FormComponent from "../components/FormComponent";
import { SearchBar } from "@rneui/base";
import { AppRoutes, StackNavigationProps } from "../constants/AppRoutes";
import { BottomTabNavigationProps, DashboardRoutes} from "../constants/DashboardRoutes";
const formData = [
  {
    id: 1,
    name: "Form 1",
  },
  {
    id: 2,
    name: "Form 2",
  },
  {
    id: 3,
    name: "Form 3",
  },
  {
    id: 4,
    name: "Form 4",
  },
  {
    id: 5,
    name: "Form 5",
  },
  {
    id: 6,
    name: "Form 6",
  },
  {
    id: 7,
    name: "Form 7",
  },
  {
    id: 8,
    name: "Form 8",
  },
];
const Apply = ({navigation}: BottomTabNavigationProps<DashboardRoutes, "Apply"> ) => {
  const [searchVal, setSearchVal] = React.useState("");
  return (
    <View style={styles.main_wrapper}>
      
      <SearchBar
        platform="android"
        onChangeText={(text) => setSearchVal(text)}
        placeholder="Search"
        placeholderTextColor="#888"
        autoCorrect
        value={searchVal}
        style={styles.search_bar}
        searchIcon={false}
      />

      <View style={styles.content_wrapper}>
        {searchVal != "" ? (
          <Text style={styles.search_text_style}>
            Search Results for : {searchVal}
          </Text>
        ) : null}
        <View style={styles.flat_list_wrapper}>
          {formData.length > 0 ? (
            <FlatList
              data={formData}
              renderItem={({ item }) => <FormComponent form={item} navigation={navigation}/>}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <Text style={styles.no_res_str}>No results found :/</Text>
          )}
          {/* {
                searchVal != "" ? <View style={{height: 120}}></View> : null
            } */}
        </View>
      </View>
    </View>
  );
};

export default Apply;

const styles = StyleSheet.create({
  main_wrapper: {
    flex: 1,
    paddingVertical: 50,
    width: "100%",
    backgroundColor: "white",
    height: "100%",
  },
  search_bar: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#C6C6C6",
    padding: 10,
    borderRadius: 10
  },
  content_wrapper: {
    width: "100%",
    padding: 20,
  },
  search_text_style: {
    fontSize: 20,
    fontWeight: "700",
  },
  content_inner_wrapper: {
    width: "100%",
  },
  flat_list_wrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingBottom: 40,
  },
  no_res_str: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
});
