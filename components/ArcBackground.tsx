import { ReactElement } from "react";
import { ImageBackground, View } from "react-native";

const ArcBackground = ({
  children,
}: {
  children: ReactElement | ReactElement[] | never;
}) => {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/images/ellipsebg.png")}
        resizeMode="stretch"
        style={{
          width: "100%",
          height: "100%",
        }}
        imageStyle={{
          width: "100%",
          height: "40%",
        }}
      >
        {children}
      </ImageBackground>
    </View>
  );
};

export default ArcBackground;
