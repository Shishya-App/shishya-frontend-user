import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AppRoutes, StackNavigationProps } from "../constants/AppRoutes";
import CompleteDocs from "../components/completedDocs";
import UncompleteDocs from "../components/uncompleteDocs";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomizedButton from "../components/customizedButton";
import { ScrollView } from "react-native-gesture-handler";

const ApplyNow = ({
  navigation,
  route
}: StackNavigationProps<AppRoutes, "ApplyNow">) => {
  const [index, setIndex] = React.useState(0);
  const {form} = route.params;
  useEffect(() => {
    if (index < completeData.length - 1) {
      const tick = () => setIndex((i) => i + 1);

      const id = setInterval(tick, 1000);
      return () => clearInterval(id);
    }
  }, []);

  // todo -> EXPECT THIS DATA TO COME FROM THE API
  const data = [
    {
      title: "Death Certificate",
      status: true,
    },
    {
      title: "Marksheet",
      status: true,
    },
    {
      title: "ID Card",
      status: true,
    },
    {
      title: "PAN",
      status: false,
    },
    {
      title: "LOR",
      status: false,
    },
  ];
  const incompleteData = data.filter((item, idx) => item.status === false);

  const completeData = data.filter((item, idx) => item.status === true);

  return (
    <SafeAreaView>
      <ScrollView style={{padding: 20}}>
        <View>
          <Text style={{ fontSize: 24, fontWeight: "600" }}>
            Submitting Application..
          </Text>
          <Text style={{fontSize: 20, fontWeight: '400', color: '#6C757D', marginTop: 8}}>{form.title}</Text>
        </View>
        <View style={{ width: "100%" }}>
            {completeData
            .filter((item, idx) => idx < index)
            .map((item) => (
                <CompleteDocs document={item} />
            ))}
            <Text>
            {index < completeData.length ? (
                <CompleteDocs document={completeData[index]} />
            ) : null}
            </Text>
            <Text style={{marginVertical: 10, fontSize: 20, fontWeight: '500', marginBottom: 20, color: 'grey'}}>Following documents need to be uploaded</Text>
            {index >= completeData.length ? (
            <View>
                {incompleteData.map((item) => (
                <UncompleteDocs  document={item}/>
                ))}
            </View>
            ) : null}
        </View>

        <View style={{marginVertical: 20}}>
            <CustomizedButton handlePress={() => {}} title={"Submit"}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ApplyNow;

const styles = StyleSheet.create({});
