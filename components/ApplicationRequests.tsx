import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import Carousel from "react-native-reanimated-carousel";
import { AntDesign } from "@expo/vector-icons";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { DashboardRoutes } from "../constants/DashboardRoutes";

const data = [
  {
    company: "IIITV",
    position: "Research Assistant",
    image: "https://picsum.photos/200",
  },
  {
    company: "IIITV",
    position: "Teaching Assistant",
    image: "https://picsum.photos/200/300",
  },
];

const colors: string[] = ["#FBE8CB", "#BAE8CC", "#C6F4F6", "#FFB8B8"];

interface Props {
  navigation: BottomTabNavigationProp<DashboardRoutes, "Dashboard", undefined>;
}

const ApplicationRequests: React.FC<Props> = ({ navigation }) => {
  return (
    <Carousel
      mode="parallax"
      width={Dimensions.get("window").width}
      height={140}
      modeConfig={{
        parallaxScrollingScale: 0.9,
        parallaxScrollingOffset: 50,
      }}
      loop={true}
      data={data}
      renderItem={({ item, index }) => (
        <View
          style={{
            flex: 1,
            backgroundColor: colors[index],
            borderRadius: 10,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              margin: 20,
            }}
          >
            <View>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {item.company}
              </Text>
              <Text style={{ fontSize: 18 }}>{item.position}</Text>
            </View>
            <View>
              <Image
                source={{ uri: item.image }}
                style={{ width: 50, height: 50 }}
              />
            </View>
          </View>
          <View style={{ marginLeft: 20 }}>
            <Pressable
              onPress={() => {
                // navigation.navigate("ApplyNow");
              }}
            >
              <Text style={{ color: "#716EFF", fontSize: 16 }}>
                Procced to Apply <AntDesign name="arrowright" size={16} />
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    />
  );
};

export default ApplicationRequests;

const styles = StyleSheet.create({});
