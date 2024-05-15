import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BlurView } from "expo-blur";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Appearance, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import UserAvatar from "react-native-user-avatar";
import { useTheme } from "../../context/ThemeContext";
import useCartService from "../../service/useCartService";
import CustomHeader from "../../shared/components/CustomHeader";
import { borders } from "../../shared/constant/borders";
import { typography } from "../../shared/constant/typography";
import { useCurrency } from "../../utils/useCurrency";
import useLocalStorage from "../../utils/useLocalStorage";

const CartScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const queryClient = useQueryClient();
    const localStorage = useLocalStorage();
    const [user, setUser] = useState({ id: "", name: "", phone: "", username: "" });
    const cartService = useCartService();
    const [subTotal, setSubTotal] = useState(0);
    const [location, setLocation] = useState({ id: "", name: "" });

    const cart = useQuery({
        queryKey: ["carts"],
        queryFn: async () => await cartService.getAll(user.id),
    });

    const handleAddQty = async (id, qty) => {
        const payload = {
            equipmentId: id,
            quantity: qty + 1,
        };
        await useCartService()
            .updateQty(user.id, payload)
            .then(() => queryClient.invalidateQueries({ queryKey: ["carts"] }));
    };

    const handleDecreaseQty = async (id, qty) => {
        const payload = {
            equipmentId: id,
            quantity: qty - 1,
        };
        await useCartService()
            .updateQty(user.id, payload)
            .then(() => queryClient.invalidateQueries({ queryKey: ["carts"] }));
    };

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
        if (cart.isSuccess) {
            setSubTotal(cart.data?.data.reduce((acc, item) => acc + item.equipment.price * item.quantity, 0));
        }
        const getLocation = async () => {
            try {
                const location = await localStorage.getData("location");
                if (location) {
                    setLocation(JSON.parse(location));
                }
            } catch (error) {}
        };
        getLocation();
    }, [cart.isSuccess, cart.data, localStorage]);

    return (
        <View style={[{ backgroundColor: theme.colors.background, flex: 1 }, theme.padding]}>
            <CustomHeader title="Pesanan">
                <UserAvatar size={35} name={user.name} bgColor={theme.colors.primary} />
            </CustomHeader>
            {location && (
                <View>
                    <Text style={[typography.title, { color: theme.colors.text, marginBottom: 10 }]}>
                        Lokasi: {location.name}
                    </Text>
                </View>
            )}
            {cart.isSuccess ? (
                <>
                    <Text style={{ color: theme.colors.text }}>{cart.data.data.length} items</Text>
                    <FlatList
                        data={cart.data?.data}
                        keyExtractor={(item) => item.id}
                        style={{ marginVertical: 10 }}
                        renderItem={({ item }) => (
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginVertical: 10,
                                }}
                            >
                                <View style={{ flexDirection: "row", gap: 15 }}>
                                    <Image
                                        source={{
                                            uri: process.env.EXPO_PUBLIC_BASE_API_URL + item.equipment.images[0].url,
                                        }}
                                        style={{ width: 100, height: 100, borderRadius: borders.radiusLarge }}
                                    />
                                    <View style={{ marginLeft: 10, justifyContent: "space-between" }}>
                                        <View style={{ gap: 10 }}>
                                            <Text style={[{ color: theme.colors.text }, typography.body]}>
                                                {item.equipment.name}
                                            </Text>
                                            <Text style={{ color: theme.colors.text }}>
                                                {useCurrency(item.equipment.price)}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <Text style={{ marginRight: 30, color: theme.colors.text }}>Qty</Text>
                                            <View style={{ gap: 10, flexDirection: "row", alignItems: "center" }}>
                                                <TouchableOpacity
                                                    onPress={() => handleDecreaseQty(item.equipment.id, item.quantity)}
                                                >
                                                    <AntDesign name="minuscircle" size={24} color={theme.colors.text} />
                                                </TouchableOpacity>
                                                <Text style={{ color: theme.colors.text }}>{item.quantity}</Text>
                                                <TouchableOpacity
                                                    onPress={() => handleAddQty(item.equipment.id, item.quantity)}
                                                >
                                                    <AntDesign name="pluscircle" size={24} color={theme.colors.text} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )}
                    />
                    {cart.data?.data && (
                        <View>
                            <BlurView
                                intensity={75}
                                experimentalBlurMethod="dimezisBlurView"
                                tint={Appearance.getColorScheme() === "light" ? "dark" : "light"}
                                style={{ borderRadius: borders.radiusLarge, overflow: "hidden", padding: 20 }}
                            >
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <Text style={{ color: theme.colors.background }}>Subtotal</Text>
                                    <Text style={{ color: theme.colors.background }}>{useCurrency(subTotal)}</Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        marginVertical: 10,
                                    }}
                                >
                                    <Text style={{ color: theme.colors.background }}>Shipping</Text>
                                    <Text style={{ color: theme.colors.background }}>Free</Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        marginVertical: 10,
                                    }}
                                >
                                    <Text style={{ color: theme.colors.background }}>PPN</Text>
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
                                        {useCurrency(subTotal + 10000 + subTotal * 0.1)}
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
                    )}
                </>
            ) : (
                <ActivityIndicator size="large" color={theme.colors.primary} style={{ padding: 100 }} />
            )}
        </View>
    );
};
export default CartScreen;
