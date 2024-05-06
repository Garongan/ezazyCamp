import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import useLocalStorage from "../../utils/useLocalStorage";
import { CommonActions } from "@react-navigation/native";

const ProfileScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const localStorage = useLocalStorage();
    const handleLogout = async () => {
        const resultAction = CommonActions.reset({
            index: 0,
            routes: [{ name: "Welcome" }],
        });
        await localStorage.removeData("token");
        navigation.dispatch(resultAction);
    };
    return (
        <View style={[{ backgroundColor: theme.colors.background, flex: 1 }, theme.padding]}>
            <Text style={{ color: theme.colors.text }}>Profile Screen</Text>
            <TouchableOpacity
                style={{
                    borderTopWidth: 1,
                    borderTopColor: theme.colors.primary,
                    marginTop: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingVertical: 10,
                }}
                onPress={handleLogout}
            >
                <Text style={{ color: theme.colors.text }}>Logout</Text>
                <MaterialIcons name="logout" size={24} color={theme.colors.text} />
            </TouchableOpacity>
        </View>
    );
};

export default ProfileScreen;
