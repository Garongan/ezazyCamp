import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";

const ProfileScreen = () => {
    const { theme } = useTheme();
    return (
        <View style={[{ backgroundColor: theme.colors.background, flex: 1 }, theme.padding]}>
            <Text style={{ color: theme.colors.text }}>Profile Screen</Text>
        </View>
    );
};

export default ProfileScreen;
