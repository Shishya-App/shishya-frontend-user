import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Card, CheckBox } from "@rneui/base";
import { Dialog } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { ApplicationStatus, JobData } from "../types/Job";
import { AppRoutes, StackNavigationProps } from "../constants/AppRoutes";
import { Ionicons } from "@expo/vector-icons";
import SearchBar from "../components/SearchBar";

// job
// image
// date

const jobData: JobData[] = [
  {
    title: "Software Engineer",
    company: "Paypal",
    tags: ["Intern", "Remote"],
    applicationStatus: "Pending",
    salary: "$135k",
    description: "Please give me this job, pretty please",
    isFellowship: false,
  },
  {
    title: "Product Designer",
    company: "Google INC",
    tags: ["Full Time", "In Office"],
    applicationStatus: "Not Applied",
    salary: "$165k",
    description: "Google toh bhai, company out of bounds",
    isFellowship: false,
  },
];

const options = ["All", "Not Applied", "Pending", "Accepted", "Rejected"];

interface FilterDialogProps {
  isDialogOpen: boolean;
  toggleDialog: () => void;
  filter: number;
  setFilter: React.Dispatch<React.SetStateAction<number>>;
}

const FilterDialog: React.FC<FilterDialogProps> = ({
  isDialogOpen,
  toggleDialog,
  filter,
  setFilter,
}) => {
  return (
    <Dialog
      isVisible={isDialogOpen}
      onBackdropPress={toggleDialog}
      // for android
    >
      <Dialog.Title title="Select Preference" />
      {options.map((l, i) => (
        <CheckBox
          key={i}
          title={l}
          containerStyle={{ backgroundColor: "white", borderWidth: 0 }}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={filter === i}
          onPress={() => setFilter((_) => i)}
        />
      ))}

      <Dialog.Actions>
        <Dialog.Button
          title="Filter"
          onPress={() => {
            toggleDialog();
          }}
        />
        <Dialog.Button
          title="Close"
          onPress={() => {
            setFilter(0);
            toggleDialog();
          }}
        />
      </Dialog.Actions>
    </Dialog>
  );
};

const Jobs = ({
  navigation,
  route,
}: StackNavigationProps<AppRoutes, "Jobs">) => {
  const [data, setData] = React.useState<JobData[]>([]);
  const [searchResult, setSearchResult] = React.useState<JobData[]>([]);
  const [filter, setFilter] = React.useState<number>(0);
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);
  const { type } = route.params;

  React.useEffect(() => {
    setData(jobData);
  }, []);

  React.useEffect(() => {
    handleSearch("");
  }, [data, filter]);

  const handleSearch = (text: string) => {
    const lower = text.toLowerCase();
    const result = data.filter(
      (job) =>
        (job.title.toLowerCase().includes(lower) ||
          job.company.toLowerCase().includes(lower) ||
          job.tags.join(" ").toLowerCase().includes(lower)) &&
        (options[filter] === "All" || job.applicationStatus === options[filter])
    );
    if (type === "Fellowship") {
      setSearchResult(result.filter((item) => item.isFellowship));
    } else {
      setSearchResult(result.filter((item) => !item.isFellowship));
    }
  };

  const getIconName = (status: ApplicationStatus) => {
    switch (status) {
      case "Pending":
        return "ios-information-circle-sharp";
      case "Applied":
        return "ios-information-circle-sharp";
      case "Accepted":
        return "checkmark-circle-sharp";
      case "Rejected":
        return "close-circle-sharp";
    }
  };

  const getColor = (status: ApplicationStatus) => {
    switch (status) {
      case "Pending":
        return "#ffc107";
      case "Applied":
        return "#ffc107";
      case "Accepted":
        return "#28a745";
      case "Rejected":
        return "#dc3545";
    }
  };

  const toggleDialog = () => {
    setIsDialogOpen((prev) => !prev);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ marginTop: 10, display: "flex", flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <SearchBar handleSearch={handleSearch} />
        </View>
        <Pressable
          onPress={() => toggleDialog()}
          style={{
            backgroundColor: "#5D5AFF",
            marginRight: 20,
            flex: 0.15,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="filter" size={24} color="white" />
        </Pressable>
        <FilterDialog {...{ filter, setFilter, isDialogOpen, toggleDialog }} />
      </View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: "#000000",
          opacity: 0.7,
          marginLeft: 25,
          marginTop: 6,
        }}
      >
        {searchResult.length} relevant{" "}
        {type === "Fellowship" ? "fellowships/grants" : "jobs"} found
      </Text>
      <FlatList
        data={searchResult}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              navigation.navigate("Single Job", { job: item });
            }}
          >
            {/* @ts-ignore */}
            <Card
              containerStyle={{
                borderRadius: 12,
                marginHorizontal: 20,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Image
                    style={{ width: 50, height: 50 }}
                    source={{
                      uri: "https://picsum.photos/seed/picsum/200/300",
                    }}
                  />
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        opacity: 0.8,
                      }}
                    >
                      {item.company}
                    </Text>
                  </View>
                </View>
                {item.applicationStatus !== "Not Applied" && (
                  <View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        backgroundColor: getColor(item.applicationStatus),
                        padding: 4,
                        borderRadius: 5,
                      }}
                    >
                      <Ionicons
                        name={getIconName(item.applicationStatus)}
                        size={16}
                        style={{
                          marginRight: 5,
                          color: "white",
                        }}
                      />
                      <Text style={{ fontSize: 12, color: "white" }}>
                        {item.applicationStatus}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
              <View
                style={{
                  marginTop: 2,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: 5,
                  }}
                >
                  {item.tags.length > 0 &&
                    item.tags.map((tag, index) => (
                      <View
                        key={index}
                        style={{
                          marginRight: 5,
                          backgroundColor: "#F5F7FC",
                          borderRadius: 5,
                          padding: 3,
                        }}
                      >
                        <Text style={{ fontSize: 12 }}>{tag}</Text>
                      </View>
                    ))}
                </View>
                <View>
                  <Text>{item.salary}</Text>
                </View>
              </View>
            </Card>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
};

export default Jobs;

const styles = StyleSheet.create({});
