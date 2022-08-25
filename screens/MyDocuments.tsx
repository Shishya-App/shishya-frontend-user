import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Card } from "@rneui/base";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { DashboardRoutes } from "../constants/DashboardRoutes";
import { CommonActions } from "@react-navigation/native";
import {
  CustomDocumentResponse,
  DocumentData,
  NADDocumentResponse,
} from "../types/Document";
import useAxios from "../hooks/useAxios";
import { getToken } from "../services/getToken";
import Loading from "../components/Loading";
import Arrow from "../components/Arrow";
import SearchBar from "../components/SearchBar";

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

  const handleSearch = (text: string) => {
    const newData = data
      .filter((item) => item.title.toLowerCase().includes(text.toLowerCase()))
      .sort((a, b) => a.title.localeCompare(b.title))
      .sort((a, b) => a.pageCount - b.pageCount);
    setSearchResult(newData);
  };

  return (
    <View
      style={{
        flex: 1,
        marginTop: 50,
        marginHorizontal: 10,
      }}
    >
      <SearchBar handleSearch={handleSearch} />
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
                <View
                  style={{
                    backgroundColor: "#EEEEEE",
                    marginHorizontal: 20,
                    marginVertical: 10,
                    borderRadius: 12,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 10,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.1,
                    elevation: 5,
                  }}
                >
                  <View>
                    <Card.Title style={{ textAlign: "left" }}>
                      <Text numberOfLines={1}>{item.title}</Text>
                    </Card.Title>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#888",
                      }}
                    >
                      {item.pageCount === 1
                        ? `1 Page`
                        : `${item.pageCount} Pages`}
                    </Text>
                  </View>
                  <Arrow />
                </View>
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
