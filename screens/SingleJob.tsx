import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppRoutes, StackNavigationProps } from "../constants/AppRoutes";
import { Card } from "@rneui/base";

const SingleJob = ({
  navigation,
  route,
}: StackNavigationProps<AppRoutes, "Single Job">) => {
  const { job } = route.params;

  return (
    <SafeAreaView>
      {/* @ts-ignore */}
      <Card
        containerStyle={{
          marginHorizontal: 20,
          borderRadius: 20,
        }}
      >
        <Card.Title>
          <Text>{job.title}</Text>
        </Card.Title>
        <Text>{job.company}</Text>
      </Card>
    </SafeAreaView>
  );
};

export default SingleJob;

const styles = StyleSheet.create({});
