import React from "react";
import { Feather as Icon } from "@expo/vector-icons";
import { Text, View } from "react-native";

export interface RoundedIconProps {
  name: string;
  size: number;
  color: string;
  backgroundColor: string;
}

const RoundedIcon = ({
  name,
  size,
  color,
  backgroundColor,
}: RoundedIconProps) => {
  const iconSize = size * 0.7;
  return (
    <View
      style={{
        height: size,
        width: size,
        borderRadius: size / 2,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor,
      }}
    >
      <Text style={{ color }}>
        <Icon name={name as any} size={iconSize} />
      </Text>
    </View>
  );
};

export default RoundedIcon;
