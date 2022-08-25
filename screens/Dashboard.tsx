import AsyncStorage from "@react-native-async-storage/async-storage";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CommonActions } from "@react-navigation/native";
import React from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ApplicationRequests from "../components/ApplicationRequests";
import ArcBackground from "../components/ArcBackground";
import JobOpeningsCarousel from "../components/JobOpeningsCarousel";
import {
  BottomTabNavigationProps,
  DashboardRoutes,
} from "../constants/DashboardRoutes";

const width = Dimensions.get("window").width / 2.75;

const jobsdata = [
  {
    company: "Paypal",
    position: "Software Engineer",
    image: "https://picsum.photos/seed/picsum/200/300",
  },
  {
    company: "Google INC",
    position: "Product Designer",
    image: "https://picsum.photos/seed/picsum/200/300",
  },
];

const FellowShips = [
  {
    company: "IIIT Vadodara",
    position: "Reseach Fellow",
    image: "https://picsum.photos/200",
  },
  {
    company: "IIIT Surat",
    position: "Research Intern",
    image: "https://picsum.photos/200",
  },
];

const Intro = () => {
  return (
    <View style={{ marginHorizontal: 20, marginTop: 50, marginBottom: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", color: "#FFFFFF" }}>
        Hi, <Text style={{ color: "#FDB7B7" }}>John Doe</Text>
      </Text>
      <Text style={{ fontSize: 12, color: "#FFFFFF" }}>Welcome to Shishya</Text>
    </View>
  );
};

const JobStats = () => {
  return (
    <View
      style={{
        marginHorizontal: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <View
        style={{
          width,
          backgroundColor: "#BAE8CC",
          padding: 10,
          borderRadius: 10,
        }}
      >
        <View
          style={{ height: 5, backgroundColor: "#298D51", borderRadius: 10 }}
        />
        <Text style={{ fontSize: 32, color: "#298D51", fontWeight: "bold" }}>
          5
        </Text>
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#298D51" }}>
          Job Applications Accepted
        </Text>
      </View>
      <View
        style={{
          width,
          backgroundColor: "#FDDCDA",
          padding: 10,
          borderRadius: 10,
        }}
      >
        <View
          style={{ height: 5, backgroundColor: "#9C2B23", borderRadius: 10 }}
        />
        <Text style={{ fontSize: 32, color: "#9C2B23", fontWeight: "bold" }}>
          5
        </Text>
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#9C2B23" }}>
          Job Applications Rejected
        </Text>
      </View>
    </View>
  );
};

const DashboardTitle = ({ text }: { text: string }) => {
  return (
    <View
      style={{
        marginHorizontal: 20,
        marginVertical: 15,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
        }}
      >
        {text}
      </Text>
    </View>
  );
};

interface ViewAllButtonProps {
  navigation: BottomTabNavigationProp<DashboardRoutes, "Dashboard">;
  type: "Job" | "Fellowship";
}

const ViewAllButton: React.FC<ViewAllButtonProps> = ({ navigation, type }) => {
  return (
    <Pressable
      onPress={() => {
        navigation.dispatch(
          CommonActions.navigate({
            name: "Jobs",
            params: { type },
          })
        );
      }}
    >
      <Text
        style={{
          fontSize: 14,
          color: "#5D5AFF",
          marginRight: 10,
        }}
      >
        View All
      </Text>
    </Pressable>
  );
};

const Dashboard = ({
  navigation,
}: BottomTabNavigationProps<DashboardRoutes, "Dashboard">) => {
  return (
    <ArcBackground>
      <Intro />
      <JobStats />
      <DashboardTitle text="Application Requests" />
      <GestureHandlerRootView>
        <ApplicationRequests navigation={navigation} />
      </GestureHandlerRootView>
      <View style={styles.jobWrapper}>
        <DashboardTitle text="Job Openings" />
        <ViewAllButton navigation={navigation} type="Job" />
      </View>
      <GestureHandlerRootView style={{ paddingVertical: 10 }}>
        <JobOpeningsCarousel navigation={navigation} data={jobsdata} />
      </GestureHandlerRootView>
      <View style={styles.jobWrapper}>
        <DashboardTitle text="Fellowships/Grants" />
        <ViewAllButton navigation={navigation} type="Fellowship" />
      </View>
      <GestureHandlerRootView style={{ paddingVertical: 10 }}>
        <JobOpeningsCarousel navigation={navigation} data={FellowShips} />
      </GestureHandlerRootView>
    </ArcBackground>
  );
};

Dashboard.defaultProps = {
  modal: false,
};

export default Dashboard;

const styles = StyleSheet.create({
  jobWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
