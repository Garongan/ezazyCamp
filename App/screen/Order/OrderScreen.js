import React, { useEffect, useState } from "react";
import { Appearance, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import CustomHeader from "../../shared/components/CustomHeader";
import UserAvatar from "react-native-user-avatar";
import useLocalStorage from "../../utils/useLocalStorage";
import { borders } from "../../shared/constant/borders";
import { typography } from "../../shared/constant/typography";
import { useCurrency } from "../../utils/useCurrency";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

const EQUIPMENTS = [
    {
        id: 1,
        equipment: "Helm",
        name: "Helm Sepeda Gunung",
        price: 120000,
        quantity: 10,
        imageURL: "https://via.placeholder.com/150x150?text=Helm%20Sepeda%20Gunung",
    },
    {
        id: 2,
        equipment: "Sepatu",
        name: "Sepatu Sepeda Gunung",
        price: 250000,
        quantity: 5,
        imageURL: "https://via.placeholder.com/150x150?text=Sepatu%20Sepeda%20Gunung",
    },
    {
        id: 3,
        equipment: "Sarung Tangan",
        name: "Sarung Tangan Sepeda Gunung",
        price: 50000,
        quantity: 15,
        imageURL: "https://via.placeholder.com/150x150?text=Sarung%20Tangan%20Sepeda%20Gunung",
    },
    {
        id: 4,
        equipment: "Kacamata",
        name: "Kacamata Sepeda Gunung",
        price: 80000,
        quantity: 8,
        imageURL: "https://via.placeholder.com/150x150?text=Kacamata%20Sepeda%20Gunung",
    },
    {
        id: 5,
        equipment: "Pompa",
        name: "Pompa Sepeda Gunung",
        price: 100000,
        quantity: 12,
        imageURL: "https://via.placeholder.com/150x150?text=Pompa%20Sepeda%20Gunung",
    },
];

const OrderScreen = () => {
    const { theme } = useTheme();
    const localStorage = useLocalStorage();
    const [user, setUser] = useState({ id: "", name: "", phone: "", username: "" });

    useEffect(() => {
        const getUser = async () => {
            try {
                const user = await localStorage.getData("user");
                if (user) {
                    setUser(JSON.parse(user));
                }
            } catch (error) {}
        };
        getUser();
    }, []);

    return (
        <View style={[{ backgroundColor: theme.colors.background, flex: 1 }, theme.padding]}>
            <CustomHeader title="Pesanan">
                <UserAvatar size={35} name={user.name} bgColor={theme.colors.primary} />
            </CustomHeader>
            <Text style={{ color: theme.colors.text }}>{EQUIPMENTS.length} items</Text>
            <FlatList
                data={EQUIPMENTS}
                keyExtractor={(item) => item.id}
                style={{ marginVertical: 10 }}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 10 }}>
                        <View style={{ flexDirection: "row", gap: 15 }}>
                            <Image
                                source={{ uri: item.imageURL }}
                                style={{ width: 100, height: 100, borderRadius: borders.radiusLarge }}
                            />
                            <View style={{ marginLeft: 10, justifyContent: "space-between" }}>
                                <View style={{ gap: 10 }}>
                                    <Text style={[{ color: theme.colors.text }, typography.body]}>{item.name}</Text>
                                    <Text style={{ color: theme.colors.text }}>{useCurrency(item.price)}</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text style={{ marginRight: 30, color: theme.colors.text }}>Qty</Text>
                                    <View style={{ gap: 10, flexDirection: "row", alignItems: "center" }}>
                                        <TouchableOpacity>
                                            <AntDesign name="minuscircle" size={24} color={theme.colors.text} />
                                        </TouchableOpacity>
                                        <Text style={{ color: theme.colors.text }}>{item.quantity}</Text>
                                        <TouchableOpacity>
                                            <AntDesign name="pluscircle" size={24} color={theme.colors.text} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
            />
            <BlurView
                intensity={75}
                experimentalBlurMethod="dimezisBlurView"
                tint={Appearance.getColorScheme() === "light" ? "dark" : "light"}
                style={{ borderRadius: borders.radiusLarge, overflow: "hidden", padding: 20 }}
            >
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ color: theme.colors.background }}>Subtotal</Text>
                    <Text style={{ color: theme.colors.background }}>
                        {useCurrency(EQUIPMENTS.reduce((acc, item) => acc + item.price * item.quantity, 0))}
                    </Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 10 }}>
                    <Text style={{ color: theme.colors.background }}>Shipping</Text>
                    <Text style={{ color: theme.colors.background }}>Free</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 10 }}>
                    <Text style={{ color: theme.colors.background }}>Tax</Text>
                    <Text style={{ color: theme.colors.background }}>10%</Text>
                </View>
                <View
                    style={{
                        marginTop: 10,
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <Text style={{ color: theme.colors.background }}>Total</Text>
                    <Text style={{ color: theme.colors.background }}>
                        {useCurrency(EQUIPMENTS.reduce((acc, item) => acc + item.price * item.quantity, 0))}
                    </Text>
                </View>
            </BlurView>
            <TouchableOpacity
                style={{
                    backgroundColor: theme.colors.primary,
                    borderRadius: borders.radiusLarge,
                    paddingHorizontal: 20,
                    marginTop: 10,
                    flexDirection: "row",
                    paddingVertical: 10,
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Text style={{ color: "#fff8ee", marginRight: 20 }}>Proceed to checkout</Text>
                <MaterialIcons name="shopping-cart-checkout" size={24} color="#fff8ee" />
            </TouchableOpacity>
        </View>
    );
};

export default OrderScreen;
