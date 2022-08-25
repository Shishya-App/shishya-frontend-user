import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { DashboardRoutes } from "../constants/DashboardRoutes";
import Carousel from "react-native-reanimated-carousel";

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
      data={data}
      pagingEnabled={true}
      renderItem={({ item }) => (
        <View
          style={{
            flex: 1,
            marginLeft: 20,
            backgroundColor: "white",
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
          <View style={{ marginHorizontal: 10 }}>
            <Text style={{ fontSize: 16 }} numberOfLines={1}>
              {item.company}
            </Text>
            <Text style={{ fontSize: 12, opacity: 0.5 }} numberOfLines={1}>
              {item.position}
            </Text>
          </View>
        </View>
      )}
    />
  );
};

export default JobOpeningsCarousel;

const styles = StyleSheet.create({});
