import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { WIDTH } from "../constants/ItemData";
import { LinearGradient } from "expo-linear-gradient";
import { DashboardRoutes } from "../constants/DashboardRoutes";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { CommonActions } from "@react-navigation/native";

const ITEM_WIDTH = WIDTH * 0.8;

interface NavigationProp {
  navigation: BottomTabNavigationProp<DashboardRoutes, "Profile", undefined>;
}

interface LinkData {
  name: string;
  route: keyof DashboardRoutes;
  icon: any;
}

const ProfileCard: React.FC = () => {
  return (
    <LinearGradient
      colors={["#413DFF", "#547AFF"]}
      style={{
        width: ITEM_WIDTH,
        backgroundColor: "#547AFF",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        alignSelf: "center",
        margin: 20,
        borderRadius: 20,
      }}
    >
      <View style={{ marginVertical: 40 }}>
        <Text style={styles.cardText}>Name</Text>
        <Text style={styles.cardText}>Date of Birth</Text>
        <Text style={styles.cardText}>Aadhaar No.</Text>
      </View>
      <View style={{ marginVertical: 40 }}>
        <Text style={styles.cardText}>Kalash Shah</Text>
        <Text style={styles.cardText}>04/12/2001</Text>
        <Text style={styles.cardText}>12345678910</Text>
      </View>
    </LinearGradient>
  );
};

const profileLinkData: LinkData[] = [
  {
    name: "Dashboard",
    icon: "home-outline",
    route: "Dashboard",
  },
  {
    name: "My Documents",
    icon: "file-document-multiple-outline",
    route: "My Documents",
  },
  {
    name: "My Applications",
    icon: "file-document-edit-outline",
    route: "Apply",
  },
];

const Arrow: React.FC = () => {
  return (
    <MaterialIcons
      name="arrow-forward-ios"
      size={24}
      color="black"
      style={styles.arrow}
    />
  );
};

const HR: React.FC = () => {
  return <View style={styles.line} />;
};

const ProfileLinks: React.FC<NavigationProp> = ({ navigation }) => {
  return (
    <>
      {profileLinkData.map(({ name, icon, route }, index) => {
        return (
          <View key={index} style={styles.container}>
            <Pressable
              onPress={() => navigation.navigate(route)}
              style={styles.button}
            >
              <MaterialCommunityIcons name={icon} size={30} color="#5D5AFF" />
              <Text style={styles.linkText}>{name}</Text>
              <Arrow />
            </Pressable>
          </View>
        );
      })}
    </>
  );
};

const ExtraLinks: React.FC<NavigationProp> = ({ navigation }) => {
  return (
    <>
      <HR />
      <View style={styles.container}>
        <Pressable
          style={styles.button}
          onPress={() => Linking.openURL("https://github.com/Shishya-App")}
        >
          <MaterialCommunityIcons
            name="help-circle-outline"
            size={30}
            color="#5D5AFF"
          />
          <Text style={styles.linkText}>Help and Support</Text>
          <Arrow />
        </Pressable>
      </View>
      <View style={styles.container}>
        <Pressable
          style={styles.button}
          onPress={() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "Authentication" }],
              })
            );
          }}
        >
          <MaterialIcons name="logout" size={30} color="#D90429" />
          <Text style={styles.linkText}>Logout</Text>
          <Arrow />
        </Pressable>
      </View>
    </>
  );
};

const Profile: React.FC<NavigationProp> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ProfileCard />
      <ProfileLinks navigation={navigation} />
      <ExtraLinks navigation={navigation} />
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  cardText: {
    fontSize: 15,
    fontWeight: "bold",
    paddingVertical: 6,
    color: "#FFFFFF",
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    paddingVertical: 6,
    color: "#000000",
  },
  container: {
    margin: 20,
  },
  linkText: {
    fontSize: 16,
    color: "#000000",
    marginLeft: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
  },
  arrow: {
    marginLeft: "auto",
  },
  line: {
    borderBottomColor: "#C4C4C4",
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
