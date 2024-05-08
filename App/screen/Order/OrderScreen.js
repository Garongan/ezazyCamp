import React from "react";
import { View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import CustomHeader from "../../shared/components/CustomHeader";

const OrderScreen = () => {
    const { theme } = useTheme();
    return (
        <View style={[{ backgroundColor: theme.colors.background, flex: 1 }, theme.padding]}>
            <CustomHeader title="Pesanan" />
        </View>
    );
};

export default OrderScreen;
