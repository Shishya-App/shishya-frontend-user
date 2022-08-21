import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import PdfReader from "@bildau/rn-pdf-reader";
import { PREVIEW_ITEM_WIDTH, PREVIEW_ITEM_HEIGHT } from "../constants/ItemData";

interface Props {
  uri: string;
  handleError: () => void;
  hideArrow: boolean;
  hideZoom: boolean;
  width: number;
  height: number;
}

const PdfPreview = ({
  handleError,
  uri,
  hideArrow,
  hideZoom,
  width,
  height,
}: Props) => {
  return (
    <View style={{ height, paddingTop: 10 }}>
      <PdfReader
        onError={handleError}
        source={{ uri }}
        style={{
          flex: 1,
          width,
        }}
        customStyle={{
          readerContainerNavigateArrow: {
            display: hideArrow ? "none" : "inline",
          },
          readerContainerZoomContainer: {
            display: hideZoom ? "none" : "inline",
          },
          readerContainerDocument: {
            zoom: 1.5,
          },
        }}
      />
    </View>
  );
};

PdfPreview.defaultProps = {
  hideArrow: false,
  hideZoom: false,
  handleError: (err: Error) => {
    console.log(err);
  },
  width: PREVIEW_ITEM_WIDTH,
  height: PREVIEW_ITEM_HEIGHT,
};

export default PdfPreview;
