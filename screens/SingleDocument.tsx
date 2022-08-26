import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppRoutes, StackNavigationProps } from "../constants/AppRoutes";
import ArcBackground from "../components/ArcBackground";
import { AntDesign, Entypo } from "@expo/vector-icons";
import WebView from "react-native-webview";

const uri =
  "https://docs.google.com/gview?embedded=true&url=http://www.africau.edu/images/default/sample.pdf";

const SingleDocument = ({
  navigation,
  route,
}: StackNavigationProps<AppRoutes, "Single Document">) => {
  const { document } = route.params;
  console.log(document);
  return (
    <ArcBackground>
      <View
        style={{
          marginTop: 60,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 30,
            color: "white",
          }}
        >
          {document.title}
        </Text>
      </View>
      <View style={{ alignItems: "center", marginTop: 40 }}>
        {document.isVerified === true ? (
          <View style={{ display: "flex", flexDirection: "row" }}>
            <AntDesign name="checkcircle" color="white" size={24} />
            <Text
              style={{ marginHorizontal: 10, fontSize: 20, color: "white" }}
            >
              Verified
            </Text>
          </View>
        ) : (
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Entypo name="circle-with-cross" color="white" size={24} />
            <Text
              style={{ marginHorizontal: 10, fontSize: 20, color: "white" }}
            >
              Not Verified
            </Text>
          </View>
        )}
        <Text style={{ color: "white", fontSize: 16 }}>
          {document.pageCount} Pages
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <WebView
          source={{ uri }}
          style={{
            marginTop: 100,
            maxHeight: 400,
            width: 320,
            flex: 1,
          }}
          options={{
            animationEnabled: false,
          }}
          scrollEnabled={true}
          androidLayerType="software"
        />
      </View>
    </ArcBackground>
  );
};

export default SingleDocument;

const styles = StyleSheet.create({});
