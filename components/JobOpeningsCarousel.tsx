import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { DashboardRoutes } from "../constants/DashboardRoutes";
import Carousel from "react-native-reanimated-carousel";

const color = ["#FFD1D1", "#FBE8CB"];
interface Props {
  navigation: BottomTabNavigationProp<DashboardRoutes, "Dashboard", undefined>;
  data: {
    company: string;
    position: string;
    image: string;
  }[];
}

const JobOpeningsCarousel: React.FC<Props> = ({ navigation, data }) => {
  return (
    <Carousel
      width={Dimensions.get("window").width * 0.5}
      height={75}
      loop={true}
      style={{ width: "100%" }}
      autoPlay={true}
      autoPlayInterval={1000}
      data={data}
      pagingEnabled={true}
      renderItem={({ item, index }) => (
        <View
          style={{
            flex: 1,
            marginLeft: "5%",
            backgroundColor: color[index % 2],
            borderRadius: 10,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
            borderColor: "#000",
            borderWidth: StyleSheet.hairlineWidth,
          }}
        >
          <Image
            source={{ uri: item.image }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 10,
            }}
          />
          <Text
            style={{
              fontSize: 16,
              marginLeft: 10,
            }}
          >
            {item.company}
          </Text>
        </View>
      )}
    />
  );
};

export default JobOpeningsCarousel;

const styles = StyleSheet.create({});
