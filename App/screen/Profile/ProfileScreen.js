import { MaterialIcons } from "@expo/vector-icons";
import { CommonActions, useFocusEffect } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Alert, RefreshControl, ScrollView, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import UserAvatar from "react-native-user-avatar";
import { useTheme } from "../../context/ThemeContext";
import useOrderService from "../../service/useOrderService";
import { borders } from "../../shared/constant/borders";
import { typography } from "../../shared/constant/typography";
import useLocalStorage from "../../utils/useLocalStorage";
import OrderList from "./OrderList";

const ProfileScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const localStorage = useLocalStorage();
    const [user, setUser] = useState({ id: "", name: "", phone: "", username: "" });
    const [activeOrders, setActiveOrders] = useState([]);
    const [ordersHistory, setOrdersHistory] = useState([]);
    const orderService = useOrderService();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch();
    }, []);

    const handleLogout = async () => {
        const resultAction = CommonActions.reset({
            index: 0,
            routes: [{ name: "Welcome" }],
        });
        await localStorage.removeData("token");
        await localStorage.removeData("user");
        navigation.dispatch(resultAction);
    };

    const { data, isSuccess, refetch } = useQuery({
        queryKey: ["orders"],
        queryFn: async () => await orderService.getOrders(),
    });

    const getUser = useCallback(async () => {
        try {
            const user = await localStorage.getData("user");
            if (user) {
                setUser(JSON.parse(user));
            }
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    }, [localStorage]);

    useEffect(() => {
        try {
            if (isSuccess) {
                setActiveOrders(
                    data.data
                        ?.filter((order) => order.orderStatus === "PENDING" || order.orderStatus === "ACTIVE")
                        .reverse()
                );
                setOrdersHistory(data.data?.filter((order) => order.orderStatus === "FINISHED").reverse());
            }
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    }, [isSuccess]);

    useFocusEffect(
        useCallback(() => {
            getUser();
        }, [])
    );

    return (
        <ScrollView
            style={[{ backgroundColor: theme.colors.background, flex: 1 }, theme.padding]}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
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
                <Text style={[{ color: theme.colors.text }, typography.title]}>Pesanan Aktif</Text>
                {isSuccess ? (
                    <OrderList orders={activeOrders} />
                ) : (
                    <ActivityIndicator size="large" color={theme.colors.primary} style={{ padding: 100 }} />
                )}
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
                <Text style={[{ color: theme.colors.text }, typography.title]}>Riwayat Pesanan</Text>
                {isSuccess ? (
                    <OrderList orders={ordersHistory} />
                ) : (
                    <ActivityIndicator size="large" color={theme.colors.primary} style={{ padding: 100 }} />
                )}
            </View>
            <TouchableOpacity
                style={{
                    backgroundColor: theme.colors.primary,
                    borderRadius: borders.radiusLarge,
                    marginTop: 10,
                    marginBottom: 20,
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
        </ScrollView>
    );
};

export default ProfileScreen;
