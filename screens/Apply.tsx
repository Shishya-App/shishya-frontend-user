import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, FlatList, Pressable } from "react-native";
import FormComponent from "../components/FormComponent";
import { AppRoutes, StackNavigationProps } from "../constants/AppRoutes";
import {
  BottomTabNavigationProps,
  DashboardRoutes,
} from "../constants/DashboardRoutes";
import ArcBackground from "../components/ArcBackground";
import { FormData } from "../types/Form";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchBar as SearchBarRNEUI } from "@rneui/base";
import DialogComponent from "../components/DialogComponent";
import { CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAxios from "../hooks/useAxios";
import LoadingAPIS from "../components/LoadingApis";
import { TouchableOpacity } from "react-native-gesture-handler";


const Apply = ({
  navigation,
}: BottomTabNavigationProps<DashboardRoutes, "Apply">) => {
  const [data, setData] = React.useState<FormData[]>([]);
  const [searchResult, setSearchResult] = React.useState<FormData[]>([]);
  const [visible, setVisible] = React.useState(false);
  const [selectedForm, setSelectedForm] = React.useState<FormData>();
  const { execute } = useAxios();
  const [loading, setLoading] = React.useState(false);
  const [verifiedDocs, setVerifiedDocs] = React.useState();

  const getVerifiedDocs = async () => {
    const res = await execute({
      url: "adminpanel/bool-docs/",
      method: "GET",
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("@token")}`,
      },
    });
    // @ts-ignore
    // var data = [];
    // Object.entries(res.res).forEach(([key, value]) => {
    //   data.push({ status: value, title: key });
    // });
    // @ts-ignore 
    setVerifiedDocs(res.res);
  };
  const getData = async () => {
    const token = await AsyncStorage.getItem("@token");
    const res = await execute({
      url: "adminpanel/form/",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    setData(res?.res);
    setSearchResult(res?.res);

  };
  useEffect(() => {
    setLoading(true);
    getVerifiedDocs();
    getData();
    setLoading(false);

  }, []);

  const showDialog = (item: any) => {
    setVisible(true);
    setSelectedForm(item);
  };

  const hideDialog = () => {
    setVisible(false);
  };

  const handleSearch = (text: string) => {
    const result = data.filter((form) =>
      form.title.toLowerCase().includes(text.toLowerCase())
    );
    setSearchResult(result);
  };

  return (
    !loading ?
    <ArcBackground>
      <SafeAreaView>
        <View style={{ marginTop: 10 }}>
          <SearchBarRNEUI
            platform="android"
            placeholder="Search"
            placeholderTextColor="#757171"
            inputStyle={{ color: "black" }}
            containerStyle={{
              backgroundColor: "white",
              marginHorizontal: 20,
              borderRadius: 20,
            }}
            searchIcon={{
              type: "material-community",
              name: "magnify",
              color: "#5D5AFF",
            }}
            cancelIcon={{
              type: "material-community",
              name: "keyboard-backspace",
              color: "#5D5AFF",
            }}
            clearIcon={{
              type: "material-community",
              name: "close",
              color: "#5D5AFF",
            }}
            inputContainerStyle={{
              backgroundColor: "white",
              borderRadius: 20,
            }}
            onChangeText={(text) => handleSearch(text)}
          />
        </View>
        <TouchableOpacity onPress={getData} style={{backgroundColor:'white', borderRadius: 50, padding: 5, width: '50%', display:'flex', alignSelf:'center', marginVertical: 10}}>
          <Text style={{color: 'black', fontSize: 18,textAlign:'center'}}>Refresh</Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "white",
            opacity: 0.9,
            marginLeft: 25,
            marginTop: 6,
          }}
        >
          {searchResult.length} relevant forms found
        </Text>

        <FlatList
          style={{ marginVertical: 60 }}
          showsVerticalScrollIndicator={false}
          data={searchResult}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <FormComponent
              form={item}
              navigation={navigation}
              onPress={
                item?.private
                  ? () => showDialog(item)
                  : () =>
                      navigation.dispatch(
                        CommonActions.navigate("ApplyNow", { form: item, verifiedDocs : verifiedDocs })
                      )
              }
            />
          )}
        />
      </SafeAreaView>
      <>
        {visible && selectedForm?.private ? (
          <DialogComponent
            visible={visible}
            toggleDialog={hideDialog}
            dialog="This is a private organization are you sure you want to proceed?"
            onDone={() => {
              hideDialog();
              return navigation.dispatch(
                CommonActions.navigate("ApplyNow", { form: selectedForm })
              );
            }}
            title="Confirmation"
          />
        ) : null}
      </>
    </ArcBackground> : <LoadingAPIS dialog="Please wait while we fetch forms.."/>
  );
};

export default Apply;
