import React from "react";
import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
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

const formData: FormData[] = [
  {
    id: 1,
    title: "ISRO Fellowship Programme",
    private: true,
  },
  {
    id: 2,
    title: "Form 2",
    private: true,
  },
  {
    id: 3,
    title: "Form 3",
    private: false,
  },
  {
    id: 4,
    title: "Form 4",
    private: false,
  },
  {
    id: 5,
    title: "Form 5",
    private: true,
  },
  {
    id: 6,
    title: "Form 6",
    private: false,
  },
  {
    id: 7,
    title: "Form 7",
    private: false,
  },
  {
    id: 8,
    title: "Form 8",
    private: false,
  },
];
const Apply = ({
  navigation,
}: BottomTabNavigationProps<DashboardRoutes, "Apply">) => {
  const [data, setData] = React.useState<FormData[]>(formData);
  const [searchResult, setSearchResult] = React.useState<FormData[]>([]);
  const [visible, setVisible] = React.useState(false);
  const [selectedForm, setSelectedForm] = React.useState<FormData>();

  const showDialog = (item: any) => {
    setVisible(true);
    setSelectedForm(item);
  }
  
  const hideDialog = () => {
    setVisible(false);
  }

  React.useEffect(() => {
    setData(formData);
    setSearchResult(formData);
  }, []);

  const handleSearch = (text: string) => {
    const result = formData.filter((form) =>
      form.title.toLowerCase().includes(text.toLowerCase())
    );
    setSearchResult(result);
  };

  return (
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
          style={{marginTop: 20}}
            showsVerticalScrollIndicator={false}
            data={searchResult}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <FormComponent form={item} navigation={navigation} onPress={item?.private ? () => showDialog(item) : () => navigation.dispatch(CommonActions.navigate('ApplyNow', {form: item}))}/>
            )}
          />
      </SafeAreaView>
      <>
          {
            visible && selectedForm?.private ? (
              <DialogComponent
                visible={visible}
                toggleDialog={hideDialog}
                dialog="This is a private organization are you sure you want to proceed?"
                onDone={() => {hideDialog(); return navigation.dispatch(CommonActions.navigate("ApplyNow", { form: selectedForm }))}}
                title="Confirmation"
              />
            ) : null
          }
      </>
    </ArcBackground>
  );
};

export default Apply;
