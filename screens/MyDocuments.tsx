import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SearchBar } from "@rneui/base";

interface DocumentData {
  id: number;
  title: string;
  pageCount: number;
  uri: string;
}

const inititalData: DocumentData[] = [
  {
    id: 1,
    title: "10th Gradesheet",
    pageCount: 2,
    uri: "https://docs.google.com/gview?embedded=true&url=http://www.africau.edu/images/default/sample.pdf",
  },
  {
    id: 2,
    title: "11th Gradesheet",
    pageCount: 1,
    uri: "https://docs.google.com/gview?embedded=true&url=https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: 3,
    title: "12th Gradesheet",
    pageCount: 1,
    uri: "https://docs.google.com/gview?embedded=true&url=https://www.clickdimensions.com/links/TestPDFfile.pdf",
  },
  {
    id: 4,
    title: "13th Gradesheet",
    pageCount: 1,
    uri: "https://docs.google.com/gview?embedded=true&url=https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: 5,
    title: "14th Gradeshexxxxxxxxxxxxxxxet",
    pageCount: 2,
    uri: "https://docs.google.com/gview?embedded=true&url=http://www.africau.edu/images/default/sample.pdf",
  },
];

const MyDocuments = () => {
  const [searchString, setSearchString] = React.useState<string>("");
  const [searchResult, setSearchResult] =
    React.useState<DocumentData[]>(inititalData);
  const [data, setData] = React.useState<DocumentData[]>(inititalData);

  useEffect(() => {
    setTimeout(() => {
      const newData = data.filter((item) => {
        return item.title.includes(searchString);
      });
      setSearchResult(newData);
    }, 1000);
  }, [searchString]);

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
        <FlatList
          data={searchResult}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ marginVertical: 20 }}>
              <Text>{item.title}</Text>
              <Text>
                {item.pageCount === 1 ? `1 Page` : `${item.pageCount} Pages`}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default MyDocuments;

const styles = StyleSheet.create({});
