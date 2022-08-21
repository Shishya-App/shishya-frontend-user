import { StyleSheet, Text, View } from "react-native";
import React, { PropsWithChildren } from "react";
import { WIDTH } from "../constants/ItemData";
import { WebView } from "react-native-webview";
import Carousel from "react-native-reanimated-carousel";
import { FadeInRight } from "react-native-reanimated";
import {
  GestureHandlerRootView,
  LongPressGestureHandler,
} from "react-native-gesture-handler";
import Animated, { AnimateProps } from "react-native-reanimated";
import type { StyleProp, ViewStyle } from "react-native";
import type { ViewProps } from "react-native";

const ITEM_WIDTH = WIDTH * 0.75;
const ITEM_HEIGHT = ITEM_WIDTH * 0.6;

interface CarouselData {
  id: number;
  title: string;
  pageCount: number;
  uri: string;
}

interface Props extends AnimateProps<ViewProps> {
  style?: StyleProp<ViewStyle>;
  index: number;
  pretty?: boolean;
}

type Direction = "left" | "right";

const data: CarouselData[] = [
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
    title: "14th Gradesheet",
    pageCount: 2,
    uri: "https://docs.google.com/gview?embedded=true&url=http://www.africau.edu/images/default/sample.pdf",
  },
];

const CarouselItem: React.FC<CarouselData> = ({ title, pageCount, uri }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        backgroundColor: "white",
        overflow: "hidden",
      }}
    >
      <WebView
        source={{ uri }}
        style={{
          flex: 1,
          height: ITEM_HEIGHT,
          width: ITEM_WIDTH,
        }}
      />
      <View style={{ width: "95%" }}>
        <Text style={{ fontSize: 16 }} numberOfLines={1}>
          {title}
        </Text>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={{ color: "#ADADAD" }}>
            {pageCount == 1 ? `1 Page` : `${pageCount} Pages`}
          </Text>
        </View>
      </View>
    </View>
  );
};

const StackItem: React.FC<Props> = (props) => {
  const { style, index, pretty, ...animatedViewProps } = props;
  return (
    <LongPressGestureHandler>
      <Animated.View style={{ flex: 1 }} {...animatedViewProps}>
        <CarouselItem {...data[index]} />
      </Animated.View>
    </LongPressGestureHandler>
  );
};

const Stack: React.FC = () => {
  const mode = "horizontal-stack";
  const snapDirection: Direction = "left";
  const viewCount = 5;
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Carousel
        style={{
          width: "100%",
          height: 240,
          alignItems: "center",
          justifyContent: "center",
        }}
        width={ITEM_WIDTH}
        height={ITEM_HEIGHT}
        pagingEnabled={true}
        snapEnabled={true}
        mode={mode}
        loop={true}
        autoPlay={false}
        autoPlayReverse={false}
        data={data}
        modeConfig={{
          snapDirection,
          stackInterval: 18,
        }}
        customConfig={() => ({ type: "positive", viewCount })}
        renderItem={({ index }) => (
          <StackItem
            index={index}
            key={index}
            entering={FadeInRight.delay((viewCount - index) * 100).duration(
              200
            )}
          />
        )}
      />
    </GestureHandlerRootView>
  );
};

const PdfCarousel: React.FC = () => {
  return (
    <>
      <Text style={styles.text}>Recents</Text>
      <Stack />
    </>
  );
};

export default PdfCarousel;

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 18,
    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 40,
  },
});
