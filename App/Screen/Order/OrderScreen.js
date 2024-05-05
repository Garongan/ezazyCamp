import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";

const OrderScreen = () => {
    const { theme } = useTheme();
    return (
        <View style={[{ backgroundColor: theme.colors.background, flex: 1 }, theme.padding]}>
            <Text style={{ color: theme.colors.text }}>Order Screen</Text>
        </View>
    );
};

export default OrderScreen;
