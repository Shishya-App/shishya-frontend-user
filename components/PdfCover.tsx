import React from "react";
import { Dimensions, Text, View } from "react-native";
import {
  PREVIEW_ITEM_HEIGHT,
  PREVIEW_ITEM_WIDTH,
  WIDTH,
} from "../constants/ItemData";
import PdfPreview from "./PdfPreview";

interface Props {
  uri: string;
  width: number;
  height: number;
}

const PdfCover = ({ uri, width, height }: Props) => {
  return (
    <>
      <PdfPreview hideArrow hideZoom uri={uri} width={width} height={height} />
      <View
        style={{
          width: WIDTH * 1.2,
          height: "30%",
          backgroundColor: "#5D5AFF",
          position: "absolute",
          // marginTop: 30,
        }}
      />
    </>
  );
};

PdfCover.defaultProps = {
  width: PREVIEW_ITEM_WIDTH,
  height: PREVIEW_ITEM_HEIGHT,
};

export default PdfCover;
