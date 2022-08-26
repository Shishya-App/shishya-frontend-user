import React, { useEffect, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import { LinearProgress } from "@rneui/base";
import { AntDesign } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { FlatList } from "react-native-gesture-handler";
interface IProps {
  docArr: any;
}

interface IDOCProps {
  title: string;
  id: number;
  status: boolean;
}
const CompleteDocs = ({ docArr }: IProps) => {

    const [index, setIndex] = useState(0);

  return (
    <View>
      {docArr.map((document: IDOCProps, idx: number) => (
        index >= idx &&
        <View key={idx} style={{ marginBottom: 5, marginVertical: 20 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            //   marginBottom: 5,
              width: "100%",
              marginLeft: 15,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "400", marginRight: 10 }}>
              {document.title}
            </Text>
            
            <AntDesign name={"checkcircle"} color={"#52C41A"} size={16} />
          </View>

          <View style={{ width: "80%" }}>
            <LottieView
              source={require("../assets/lottie/91937-progress-bar-fast.json")}
              style={{ width: Dimensions.get('window').width, height: 50 }}
              autoPlay
              speed={1}
              loop={false}
              onAnimationFinish={() => setIndex((i) => i + 1)}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

export default CompleteDocs;
