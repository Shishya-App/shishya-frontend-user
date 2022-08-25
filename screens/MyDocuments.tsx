import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SearchBar, Card } from "@rneui/base";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { DashboardRoutes } from "../constants/DashboardRoutes";
import { CommonActions } from "@react-navigation/native";
import { CustomDocumentResponse, DocumentData, NADDocumentResponse } from "../types/Document";
import useAxios from "../hooks/useAxios";
import { getToken } from "../services/getToken";
import Loading from "../components/Loading";

interface Props {
  navigation: BottomTabNavigationProp<
    DashboardRoutes,
    "My Documents",
    undefined
  >;
}

interface Response {
  Custom_Document: CustomDocumentResponse[];
  NAD_Document: NADDocumentResponse[];
  user: number;
}

const MyDocuments: React.FC<Props> = ({ navigation }) => {
  const [searchString, setSearchString] = React.useState<string>("");
  const [searchResult, setSearchResult] = React.useState<DocumentData[]>([]);
  const [data, setData] = React.useState<DocumentData[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const { execute } = useAxios();

  useEffect(() => {
    const getDocs = async () => {
      const token = await getToken();
      console.log("Token", token);
      const response = await execute({
        url: `/userpanel/profile-documents`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const res: Response = response.res;
      const newData: DocumentData[] = [];
      const customDocs: CustomDocumentResponse[] = res.Custom_Document;
      const nadDocs: NADDocumentResponse[] = res.NAD_Document;

      // fill NAD data
      for (const doc of nadDocs) {
        for (let [key, value] of Object.entries(doc)) {
          if (key === "user" || key === "id") continue;
          newData.push({
            user: res.user,
            title: key,
            pageCount: 1,
            ID: value,
            custom: false,
            isVerified: true,
          });
        }
      }

      // fill custom data
      for (const doc of customDocs) {
        newData.push({
          user: doc.user,
          title: doc.Title,
          pageCount: doc.PagesNo,
          ID: doc.id,
          custom: true,
          createdAt: doc.upload_time,
          uri: doc.File,
          isVerified: doc.isVerified,
        });
      }
      setData(newData);
      setSearchResult(newData);
    };
    getDocs();
  }, []);

  useEffect(() => {
    if (data.length > 0) setLoading(false);
  }, [data]);

  useEffect(() => {
    setTimeout(() => {
      console.log(data);
      const newData = data
        .filter((item) =>
          item.title.toLowerCase().includes(searchString.toLowerCase())
        )
        .sort((a, b) => a.title.localeCompare(b.title))
        .sort((a, b) => a.pageCount - b.pageCount);
      setSearchResult(newData);
    }, 500);
  }, [searchString]);

  const handlePress = (item: DocumentData) => {
    console.log("handlePress", item);
    navigation.dispatch(
      CommonActions.navigate({
        name: "Single Document",
        params: {
          document: item,
        },
      })
    );
  };

  return (
    <View
      style={{
        flex: 1,
        marginTop: 50,
        marginHorizontal: 20,
      }}
    >
      <SearchBar
        platform="android"
        onChangeText={(text) => setSearchString(text)}
        placeholder="Search"
        placeholderTextColor="#888"
        autoCorrect
        value={searchString}
      />
      <View style={{ flex: 1, marginTop: 20 }}>
        {loading ? (
          <Loading />
        ) : (
          <FlatList
            data={searchResult}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Pressable onPress={() => handlePress(item)}>
                {/*// @ts-ignore */}
                <Card
                  containerStyle={{
                    margin: 20,
                    borderRadius: 20,
                  }}
                >
                  <Card.Title style={{ textAlign: "left" }}>
                    <Text numberOfLines={1}>{item.title}</Text>
                  </Card.Title>
                  <Card.Divider />
                  <Text
                    style={{
                      textAlign: "right",
                      fontSize: 12,
                      color: "#888",
                    }}
                  >
                    {item.pageCount === 1
                      ? `1 Page`
                      : `${item.pageCount} Pages`}
                  </Text>
                </Card>
              </Pressable>
            )}
          />
        )}
      </View>
    </View>
  );
};

export default MyDocuments;

const styles = StyleSheet.create({});
