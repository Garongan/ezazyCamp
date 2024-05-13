import { Text, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { typography } from "../constant/typography";

const CustomHeader = ({ title, children, style }) => {
    const { theme } = useTheme();
    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 20,
            }}
        >
            <Text style={[ typography.header, { color: theme.colors.text }, style ]}>{title}</Text>
            {children}
        </View>
    );
};

export default CustomHeader;
