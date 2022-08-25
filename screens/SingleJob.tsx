import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import { AppRoutes, StackNavigationProps } from "../constants/AppRoutes";
import { Card } from "@rneui/base";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import CustomizedButton from "../components/customizedButton";

const SingleJob = ({
  navigation,
  route,
}: StackNavigationProps<AppRoutes, "Single Job">) => {
  const { job } = route.params;
  const [isHidden, setIsHidden] = React.useState(true);
  const JOB_TEXT =
    "Can you bring creative human-centered ideas to life and make great things happen beyond what meets the eye? We believe in teamwork, fun, complex projects, diverse perspectives, and simple solutions. How about you? We're looking for a like-minded";
  const ROLES_TEXT = 
  "- Someone who has ample work experience with synthesizing primary research, developing insight-driven product strategy, and extending that strategy into artefacts in a creative, systematic and logical fashion -Adapt and meticulous with creating user "
  return (
    <SafeAreaView>
      <ScrollView>

        {/* @ts-ignore */}
        <Card
          containerStyle={{
            // marginHorizontal: 20,
            borderRadius: 20,
            marginVertical: 50,
            padding: 20,
            width: "90%",
          }}
        >
          <View style={styles.upper__icons}>
            <AntDesign name={"hearto"} size={25} />
            <AntDesign name={"arrowleft"} size={25} onPress={() => navigation.goBack()}/>
          </View>
          <Image
            source={require("../assets/images/companyLogo.png")}
            style={{ marginVertical: 8 }}
          />
          <Text style={styles.job__title}>{job.title}</Text>
          <Text style={styles.job__company}>{job.company}</Text>
          <Text style={styles.posted__on}>Posted on 20 July</Text>
        </Card>

        <View style={styles.second__container}>
          <View style={styles.second__left__container}>
            <View style={styles.particular__container1}>
              <Text style={styles.header__text}>Apply Before</Text>
              <Text style={styles.val__text}>30 July, 2021</Text>
            </View>

            <View style={styles.particular__container2}>
              <Text style={styles.header__text}>Job Nature</Text>
              <Text style={styles.val__text}>Contractual</Text>
            </View>
          </View>

          <View style={styles.second__right__container}>
            <View style={styles.particular__container1}>
              <Text style={styles.header__text}>Salary Range</Text>
              <Text style={styles.val__text}>12L - 15L/yearly</Text>
            </View>

            <View style={styles.particular__container2}>
              <Text style={styles.header__text}>Job Location</Text>
              <Text style={styles.val__text}>Work from anywhere</Text>
            </View>
          </View>
        </View>

        <View style={styles.third__container}>
          <Text style={styles.job__desc__header}>Job Description and Eligibility</Text>
          {JOB_TEXT.length > 100 ? (
            <View>
              <Text style={styles.job__desc__text}>
                {isHidden ? JOB_TEXT.substring(0, 100) + "..." : JOB_TEXT}
              </Text>

              <Pressable
                style={styles.see__more}
                onPress={() => setIsHidden(!isHidden)}
              >
                <Text style={styles.see__more__header}>
                  {isHidden ? "See More" : "See Less"}
                </Text>
                <Entypo
                  name={isHidden ? "triangle-down" : "triangle-up"}
                  size={15}
                  color={"#1C58F2"}
                />
              </Pressable>
            </View>
          ) : (
            <Text style={styles.job__desc__text}>{JOB_TEXT}</Text>
          )}
        </View>

        <View style={styles.fourth__container}>
          <Text style={styles.roles__header}>Roles and Responsibilites</Text>
          <Text style={styles.roles__text}>
              {ROLES_TEXT}
          </Text>
        </View>
          
          <View style={styles.button__outer__wrapper}>
            <View style={styles.button__wrapper}>
              <CustomizedButton handlePress={() => {}} title={"Apply Now"}/>
            </View>
          </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SingleJob;

const styles = StyleSheet.create({
  upper__icons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  job__title: {
    fontSize: 26,
    fontWeight: "600",
    marginTop: 5,
  },
  job__company: {
    fontSize: 14,
    fontWeight: "500",
    marginVertical: 4,
  },
  posted__on: {},
  second__container: {
    marginVertical: 10,
    width: "99%",
    display: "flex",
    justifySelf: "center",
    borderRadius: 10,
    backgroundColor: "white",
    flexDirection: "column",
    padding: 20,
  },
  second__left__container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  particular__container1: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    marginRight: 10,
  },
  particular__container2: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
  },
  header__text: {
    fontWeight: "700",
    fontSize: 14.5,
    color: "#181A1F",
  },
  val__text: {
    fontSize: 14,
    fontWeight: "400",
    color: "#181A1F",
    marginTop: 6,
  },
  second__right__container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  see__more: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  third__container: {
    marginVertical: 10,
    width: "99%",
    display: "flex",
    justifySelf: "center",
    borderRadius: 10,
    backgroundColor: "white",
    // display: 'flex',/
    flexDirection: "column",
    padding: 20,
  },
  job__desc__header: {
    color: "#181A1F",
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 10,
  },
  job__desc__text: {
    lineHeight: 20,
    fontSize: 14,
  },
  see__more__header: {
    color: "#1C58F2",
    fontWeight: "700",
  },
  fourth__container: {
    marginVertical: 10,
    width: "99%",
    display: "flex",
    justifySelf: "center",
    borderRadius: 10,
    backgroundColor: "white",
    // display: 'flex',/
    flexDirection: "column",
    padding: 20,
  },
  roles__header: {
    color: "#181A1F",
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 10,
  },
  roles__text: {
    lineHeight: 20,
    fontSize: 14,
  },
  button__outer__wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection:'row',
    justifyContent: 'center',
  },
  button__wrapper: {
    width: '50%'
  }
});
