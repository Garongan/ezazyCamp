import { Dimensions } from "react-native";

export const borders = {
    radiusSmall: 4,
    radiusMedium: 8,
    radiusLarge: 16,
    borderStyle: "solid",
    circle: Math.round(Dimensions.get("window").width + Dimensions.get("window").height) / 2,
    borderWidth: 1,
};
