import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CommonActions } from "@react-navigation/native";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  BottomTabNavigationProps,
  DashboardRoutes,
} from "../constants/DashboardRoutes";
import { Entypo } from "@expo/vector-icons";
import {FormData} from "../types/Form";
interface IProps {
  form: FormData;
  navigation: BottomTabNavigationProp<DashboardRoutes, "Apply">;
  onPress: () => void;
}
const FormComponent = ({ form, navigation, onPress }: IProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <View style={styles.main__upper__wrapper}>
      <View style={styles.main_wrapper}>
        <Text style={styles.form_name}>
          {form.title.length > 25
            ? `${form.title.slice(0, 25)}...`
            : form.title}
        </Text>
        <View style={styles.button_wrapper}>
          <Pressable
            style={styles.button_cont}
            onPress={onPress}
          >
            <Text style={styles.button_style}>Apply Now</Text>
          </Pressable>
        </View>
        <View style={{ marginHorizontal: 10 }}>
          <Entypo
            name={!open ? "chevron-down" : "chevron-up"}
            size={20}
            color={"#5D5AFF"}
            onPress={() => setOpen(!open)}
          />
        </View>
      </View>
      {open ? (
        <View style={{marginTop: 10}}>
          <Text style={{fontSize: 14, fontWeight: '500'}}>
            Deadline - {form.deadline}
          </Text>
          <Text style={{fontSize: 14, fontWeight: '500'}}>
            Owner - {form.owner}
          </Text>
          <Text style={{fontSize: 14, marginTop: 5, fontWeight: '400'}}>
            {form.description}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default FormComponent;

const styles = StyleSheet.create({
  main__upper__wrapper: {
    marginBottom: 20,
    backgroundColor: "white",
    elevation: 5,
    width: "95%",
    paddingHorizontal: 10,
    paddingVertical: 18,
    borderRadius: 10,
    display: "flex",
    justifySelf: "center",
    alignSelf: "center",
  },
  main_wrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  form_name: {
    fontSize: 16,
    fontWeight: "600",
    width: "60%",
  },
  button_wrapper: {
    width: "30%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  button_cont: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 10,
    backgroundColor: "#5D5AFF",
  },
  button_style: {
    fontSize: 14,
    color: "white",
    fontWeight: "500",
    textAlign: "center",
  },
});
