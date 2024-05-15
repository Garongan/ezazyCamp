import { MaterialIcons } from "@expo/vector-icons";
import { CommonActions, useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import UserAvatar from "react-native-user-avatar";
import { useTheme } from "../../context/ThemeContext";
import { borders } from "../../shared/constant/borders";
import { typography } from "../../shared/constant/typography";
import useLocalStorage from "../../utils/useLocalStorage";

const ACTIVEORDERS = [
    {
        id: "1",
        date: "2024-05-07",
        lokasi: "Gunung Merapi",
    },
    {
        id: "2",
        date: "2024-05-08",
        lokasi: "Gunung Bromo",
    },
    {
        id: "3",
        date: "2024-05-09",
        lokasi: "Gunung Rinjani",
    },
];

const ORDERSHISTORY = [
    {
        id: "101",
        date: "2024-04-01",
        lokasi: "Gunung Semeru",
    },
    {
        id: "102",
        date: "2024-04-10",
        lokasi: "Gunung Slamet",
    },
    {
        id: "103",
        date: "2024-04-15",
        lokasi: "Gunung Kerinci",
    },
];

const ProfileScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const localStorage = useLocalStorage();
    const [user, setUser] = useState({ id: "", name: "", phone: "", username: "" });
    const handleLogout = async () => {
        const resultAction = CommonActions.reset({
            index: 0,
            routes: [{ name: "Welcome" }],
        });
        await localStorage.removeData("token");
        await localStorage.removeData("user");
        navigation.dispatch(resultAction);
    };

    const getUser = useCallback(async () => {
        try {
            const user = await localStorage.getData("user");
            if (user) {
                setUser(JSON.parse(user));
            }
        } catch (error) {
            console.error("Failed to load user:", error);
        }
    }, [localStorage]);

    useFocusEffect(
        useCallback(() => {
            getUser();
        }, [getUser])
    );

    return (
        <View style={[{ backgroundColor: theme.colors.background, flex: 1 }, theme.padding]}>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingVertical: 20,
                }}
            >
                <Text style={[typography.header, { color: theme.colors.text }]}>Profile</Text>
            </View>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                    marginVertical: 50,
                }}
            >
                <UserAvatar size={100} name={user.name} bgColor={theme.colors.primary} />
                <View style={{ flexDirection: "column" }}>
                    <Text style={[{ color: theme.colors.text }, typography.title]}>{user.name} </Text>
                    <Text style={[{ color: theme.colors.text }, typography.body]}>{user.phone} </Text>
                    <Text style={[{ color: theme.colors.text, opacity: 0.7 }, typography.body]}>{user.username}</Text>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("EditProfile", {
                                id: user.id,
                                name: user.name,
                                phone: user.phone,
                                username: user.username,
                            })
                        }
                        style={{ marginTop: 10 }}
                    >
                        <View style={{ alignItems: "baseline" }}>
                            <View
                                style={{
                                    backgroundColor: theme.colors.primary,
                                    padding: 10,
                                    borderRadius: borders.radiusSmall,
                                }}
                            >
                                <Text style={{ color: "#fff8ee" }}>Edit Profile</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View
                style={{
                    marginTop: 10,
                    flex: 1,
                    borderTopWidth: 1,
                    borderTopColor: theme.colors.primary,
                    paddingVertical: 10,
                }}
            >
                <FlatList
                    key={(item) => item.id}
                    data={ACTIVEORDERS}
                    ListHeaderComponent={() => (
                        <Text style={[{ color: theme.colors.text }, typography.title]}>Pesanan Aktif</Text>
                    )}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 10 }}>
                            <Text style={{ color: theme.colors.text }}>{item.date}</Text>
                            <Text style={{ color: theme.colors.text }}>{item.lokasi}</Text>
                        </View>
                    )}
                />
            </View>
            <View
                style={{
                    marginTop: 10,
                    flex: 1,
                    borderTopWidth: 1,
                    borderTopColor: theme.colors.primary,
                    paddingVertical: 10,
                }}
            >
                <FlatList
                    key={(item) => item.id}
                    data={ORDERSHISTORY}
                    ListHeaderComponent={() => (
                        <Text style={[{ color: theme.colors.text }, typography.title]}>Riwayat Pesanan</Text>
                    )}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 10 }}>
                            <Text style={{ color: theme.colors.text }}>{item.date}</Text>
                            <Text style={{ color: theme.colors.text }}>{item.lokasi}</Text>
                        </View>
                    )}
                />
            </View>
            <TouchableOpacity
                style={{
                    backgroundColor: theme.colors.primary,
                    borderRadius: borders.radiusLarge,
                    marginTop: 10,
                    paddingHorizontal: 20,
                    flexDirection: "row",
                    paddingVertical: 10,
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
                onPress={handleLogout}
            >
                <Text style={{ color: "#fff8ee", marginRight: 20 }}>Logout</Text>
                <MaterialIcons name="logout" size={24} color="#fff8ee" />
            </TouchableOpacity>
        </View>
    );
};

export default ProfileScreen;
