import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ArcBackground from "../components/ArcBackground";
import PdfCarousel from "../components/PdfCarousel";

const Dashboard = () => {
  return (
    <ArcBackground>
      <PdfCarousel />
    </ArcBackground>
  );
};

Dashboard.defaultProps = {
  modal: false,
};

export default Dashboard;

const styles = StyleSheet.create({
  textStyle: {
    color: "black",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },
});
