import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const WIDTH = width;
export const HEIGHT = height;
export const PREVIEW_ITEM_WIDTH = WIDTH / 1.5;
export const PREVIEW_ITEM_HEIGHT = HEIGHT / 1.5;
