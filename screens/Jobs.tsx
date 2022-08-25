import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Card, SearchBar } from "@rneui/base";
import { SafeAreaView } from "react-native-safe-area-context";
import { JobData } from "../types/Job";
import { AppRoutes, StackNavigationProps } from "../constants/AppRoutes";

// job 
// image
// date

const jobData: JobData[] = [
  {
    title: "Software Engineer",
    company: "Paypal",
    tags: ["Intern", "Remote"],
    applicationStatus: "Pending",
    salary: "$135k",
    description: "Please give me this job, pretty please",
  },
  {
    title: "Product Designer",
    company: "Google INC",
    tags: ["Full Time", "In Office"],
    applicationStatus: "Not Applied",
    salary: "$165k",
    description: "Google toh bhai, company out of bounds",
  },
];

const Jobs = ({ navigation }: StackNavigationProps<AppRoutes, "Jobs">) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SearchBar
        placeholder="Search"
        containerStyle={{
          marginHorizontal: 20,
          borderRadius: 20,
          backgroundColor: "#5D5AFF",
        }}
        style={{ color: "red" }}
        inputStyle={{ color: "blue", backgroundColor: "yellow" }}
      />
      <Text>45 relevant jobs found</Text>
      <FlatList
        data={jobData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              navigation.navigate("Single Job", { job: item });
            }}
          >
            {/* @ts-ignore */}
            <Card>
              <Card.Title>
                <Text>{item.title}</Text>
              </Card.Title>
            </Card>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
};

export default Jobs;

const styles = StyleSheet.create({});
