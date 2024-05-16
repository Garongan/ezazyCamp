import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useFocusEffect } from "@react-navigation/native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import React, { useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import UserAvatar from "react-native-user-avatar";
import { useTheme } from "../../context/ThemeContext";
import useCartService from "../../service/useCartService";
import useGetGuideService from "../../service/useGetGuideService";
import CustomHeader from "../../shared/components/CustomHeader";
import { borders } from "../../shared/constant/borders";
import { typography } from "../../shared/constant/typography";
import { useCurrency } from "../../utils/useCurrency";
import useLocalStorage from "../../utils/useLocalStorage";
import useOrderService from "../../service/useOrderService";

const paymentMethods = [
    { value: "TRANSFER", label: "Kartu Kredit" },
    { value: "TRANSFER", label: "CIMB Clicks" },
    { value: "TRANSFER", label: "BCA KlikBCA" },
    { value: "TRANSFER", label: "BCA KlikPay" },
    { value: "TRANSFER", label: "BRI Epay" },
    { value: "TRANSFER", label: "E-channel" },
    { value: "TRANSFER", label: "Permata Virtual Account" },
    { value: "TRANSFER", label: "BCA Virtual Account" },
    { value: "TRANSFER", label: "BNI Virtual Account" },
    { value: "TRANSFER", label: "BRI Virtual Account" },
    { value: "TRANSFER", label: "CIMB Virtual Account" },
    { value: "TRANSFER", label: "Virtual Account Lainnya" },
    { value: "TRANSFER", label: "GoPay" },
    { value: "TRANSFER", label: "Indomaret" },
    { value: "TRANSFER", label: "Danamon Online" },
    { value: "TRANSFER", label: "Akulaku" },
    { value: "TRANSFER", label: "ShopeePay" },
    { value: "TRANSFER", label: "Kredivo" },
    { value: "TRANSFER", label: "UOB EZPay" },
];

const CartScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const queryClient = useQueryClient();
    const localStorage = useLocalStorage();
    const [user, setUser] = useState({ id: "", name: "", phone: "", username: "" });
    const cartService = useCartService();
    const [subTotal, setSubTotal] = useState(0);
    const [location, setLocation] = useState({ id: "", name: "" });
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [guides, setGuides] = useState([]);
    const guidesService = useGetGuideService();
    const [selectedPaymentType, setSelectedPaymentType] = useState("CASH");
    const [selectedGuide, setSelectedGuide] = useState("");
    const [guaranteeImage, setGuaranteeImage] = useState({ uri: "", name: "", type: "" });
    const [selectedOrderType, setSelectedOrderType] = useState("PICKUP");
    const [day, setDay] = useState(1);
    const orderService = useOrderService();
    const [address, setAddress] = useState("");

    const cart = useQuery({
        queryKey: ["carts"],
        queryFn: async () => await cartService.getAll(user.id),
    });

    const handleAddQty = async (id, qty) => {
        const payload = {
            equipmentId: id,
            quantity: qty + 1,
        };
        await cartService
            .updateQty(user.id, payload)
            .then(() => queryClient.invalidateQueries({ queryKey: ["carts"] }));
    };

    const handleDecreaseQty = async (id, qty) => {
        const payload = {
            equipmentId: id,
            quantity: qty - 1,
        };
        await cartService
            .updateQty(user.id, payload)
            .then(() => queryClient.invalidateQueries({ queryKey: ["carts"] }));
    };

    const handleOrder = async () => {
        if (user.id !== "" && location.id !== "" && cart.data.data !== undefined && guaranteeImage.uri !== "") {
            const order = {
                customerId: user.id,
                locationId: location.id,
                date: date.toISOString().split("T")[0],
                day: parseInt(day),
                orderEquipmentRequests: cart.data.data.map((item) => {
                    return {
                        equipmentId: item.equipment.id,
                        quantity: item.quantity,
                    };
                }),
                orderType: selectedOrderType,
                paymentType: selectedPaymentType,
            };
            if (selectedGuide !== "") {
                order["guideId"] = selectedGuide;
            }
            const formData = new FormData();
            formData.append("order", JSON.stringify(order));
            formData.append("guarantee", {
                name: guaranteeImage.name,
                type: `image/${guaranteeImage.type}`,
                uri: Platform.OS === "android" ? guaranteeImage.uri : guaranteeImage.uri.replace("file://", ""),
            });

            try {
                await orderService.createNewOrder(formData).then(() => {
                    queryClient.invalidateQueries({ queryKey: ["carts"] });
                    setGuaranteeImage(null);
                    localStorage.removeData("location");
                    cart.data.data.map((item) =>
                        cartService.updateQty(user.id, { equipmentId: item.equipment.id, quantity: 0 })
                    );
                    navigation.jumpTo("Profile", { screen: "ProfileScreen" });
                });
            } catch (error) {
                Alert.alert("Failed to create order:", error.message);
            }
        } else {
            Alert.alert("Validation Error", "Please fill in all required fields.");
        }
    };

    const onChangeDate = (event, selectedDate) => {
        if (selectedDate) {
            setShow(false);
            setShow(Platform.OS === "ios");
            setDate(selectedDate);
        }
    };

    const showDatepicker = () => {
        setShow(true);
    };

    const getGuides = async (name) => {
        try {
            const data = await guidesService.getGuideByLocationId({ location: name });
            setGuides(data);
        } catch (error) {
            Alert.alert("Failed to load guides:", error.message);
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            let uriParts = result.assets[0].uri.split(".");
            let fileType = uriParts[uriParts.length - 1];
            setGuaranteeImage({
                uri: result.assets[0].uri,
                name: result.assets[0].uri.split("/").pop(),
                type: fileType,
            });
        }
    };

    const getLocation = useCallback(async () => {
        try {
            const location = await localStorage.getData("location");
            if (location) {
                setLocation(JSON.parse(location));
                getGuides(JSON.parse(location).name);
            }
        } catch (error) {
            Alert.alert("Failed to load location:", error.message);
        }
    });

    useEffect(() => {
        const getUser = async () => {
            try {
                const user = await localStorage.getData("user");
                if (user) {
                    setUser(JSON.parse(user));
                }
            } catch (error) {
                console.error("Failed to load user:", error);
            }
        };
        getUser();
    }, []);

    useEffect(() => {
        if (cart.isSuccess) {
            const reduceArray = cart.data?.data.reduce((acc, item) => acc + item.equipment.price * item.quantity, 0);
            const guidePrice = guides?.data?.filter((item) => item.id === selectedGuide)[0]?.price;
            if (guidePrice) {
                setSubTotal((reduceArray + guidePrice) * day);
            } else {
                setSubTotal(reduceArray * day);
            }
        }
    }, [cart.isSuccess, selectedGuide, day]);

    useFocusEffect(
        useCallback(() => {
            getLocation();
        }, [])
    );

    return (
        <ScrollView style={[{ backgroundColor: theme.colors.background, flex: 1 }, theme.padding]}>
            <CustomHeader title="Keranjang">
                <UserAvatar size={35} name={user.name} bgColor={theme.colors.primary} />
            </CustomHeader>
            {location && (
                <View>
                    <Text style={[typography.title, { color: theme.colors.text, marginBottom: 10 }]}>
                        Lokasi: {location.name ? location.name : "Silahkan pilih lokasi"}
                    </Text>
                </View>
            )}
            {cart.isSuccess ? (
                <>
                    <Text style={{ color: theme.colors.text }}>{cart.data.data.length} items</Text>
                    {cart.data?.data.map((item) => (
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginVertical: 10,
                            }}
                            key={item.id}
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
                                                onPress={async () =>
                                                    await handleDecreaseQty(item.equipment.id, item.quantity)
                                                }
                                            >
                                                <AntDesign name="minuscircle" size={24} color={theme.colors.text} />
                                            </TouchableOpacity>
                                            <Text style={{ color: theme.colors.text }}>{item.quantity}</Text>
                                            <TouchableOpacity
                                                onPress={async () =>
                                                    await handleAddQty(item.equipment.id, item.quantity)
                                                }
                                            >
                                                <AntDesign name="pluscircle" size={24} color={theme.colors.text} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ))}
                    <View>
                        <View>
                            <Text style={[{ color: theme.colors.text, paddingVertical: 10 }, typography.body]}>
                                Tipe Pembayaran
                            </Text>
                            <View
                                style={{
                                    borderRadius: borders.radiusLarge,
                                    overflow: "hidden",
                                }}
                            >
                                <Picker
                                    selectedValue={selectedPaymentType}
                                    style={{
                                        backgroundColor: theme.colors.primary,
                                        color: "#fff8ee",
                                    }}
                                    onValueChange={(itemValue) => setSelectedPaymentType(itemValue)}
                                    dropdownIconColor={"#fff8ee"}
                                >
                                    <Picker.Item label="Cash" value="Cash" />
                                    {paymentMethods.map((item, index) => (
                                        <Picker.Item label={item.label} value={item.value} key={index} />
                                    ))}
                                </Picker>
                            </View>
                        </View>
                        <View>
                            <Text style={[{ color: theme.colors.text, paddingVertical: 10 }, typography.body]}>
                                Tipe Pengambilan Barang
                            </Text>
                            <View
                                style={{
                                    borderRadius: borders.radiusLarge,
                                    overflow: "hidden",
                                }}
                            >
                                <Picker
                                    selectedValue={selectedOrderType}
                                    style={{
                                        backgroundColor: theme.colors.primary,
                                        color: "#fff8ee",
                                    }}
                                    onValueChange={(itemValue) => setSelectedOrderType(itemValue)}
                                    dropdownIconColor={"#fff8ee"}
                                >
                                    <Picker.Item label="PICKUP" value="PICKUP" />
                                    <Picker.Item label="SEND" value="SEND" />
                                </Picker>
                            </View>
                        </View>
                        {selectedOrderType === "SEND" && (
                            <View>
                                <Text style={[{ color: theme.colors.text, paddingVertical: 10 }, typography.body]}>
                                    Dikirim Ke Alamat Mana
                                </Text>
                                <TextInput
                                    style={{
                                        padding: 15,
                                        borderRadius: borders.radiusLarge,
                                        backgroundColor: theme.colors.primary,
                                        color: "#fff8ee",
                                    }}
                                    placeholder="Alamat Kamu..."
                                    placeholderTextColor="#fff8ee"
                                    value={address}
                                    onChangeText={(text) => setAddress(text)}
                                />
                            </View>
                        )}
                        <View>
                            <Text style={[{ color: theme.colors.text, paddingVertical: 10 }, typography.body]}>
                                Tanggal Dipakai
                            </Text>
                            <TouchableOpacity
                                onPress={showDatepicker}
                                style={{
                                    padding: 15,
                                    borderRadius: borders.radiusLarge,
                                    backgroundColor: theme.colors.primary,
                                }}
                            >
                                <Text style={{ color: theme.colors.text, fontSize: 15 }}>{date.toDateString()}</Text>
                            </TouchableOpacity>
                            {show && (
                                <DateTimePicker
                                    value={date}
                                    mode="date"
                                    display="default"
                                    onChange={onChangeDate}
                                    style={{ flex: 1 }}
                                    minimumDate={new Date()}
                                />
                            )}
                        </View>
                        <View>
                            <Text style={[{ color: theme.colors.text, paddingVertical: 10 }, typography.body]}>
                                Berapa Hari Disewa
                            </Text>
                            <TextInput
                                style={{
                                    padding: 15,
                                    borderRadius: borders.radiusLarge,
                                    backgroundColor: theme.colors.primary,
                                    color: "#fff8ee",
                                }}
                                placeholder="1"
                                placeholderTextColor="#fff8ee"
                                value={day.toString()}
                                onChangeText={(text) => setDay(text)}
                                keyboardType="numeric"
                            />
                        </View>
                        <View>
                            <Text style={[{ color: theme.colors.text, paddingVertical: 10 }, typography.body]}>
                                Pilih Guide
                            </Text>
                            <View
                                style={{
                                    borderRadius: borders.radiusLarge,
                                    overflow: "hidden",
                                }}
                            >
                                <Picker
                                    selectedValue={selectedGuide}
                                    style={{
                                        backgroundColor: theme.colors.primary,
                                        color: "#fff8ee",
                                    }}
                                    onValueChange={(itemValue) => setSelectedGuide(itemValue)}
                                    dropdownIconColor={"#fff8ee"}
                                >
                                    <Picker.Item label="No Guide" value={""} />
                                    {guides.data &&
                                        guides.data.map((item) => (
                                            <Picker.Item label={item.name} value={item.id} key={item.id} />
                                        ))}
                                </Picker>
                            </View>
                        </View>
                        <View>
                            <Text style={[{ color: theme.colors.text, paddingVertical: 10 }, typography.body]}>
                                Pilih Guarantee Image
                            </Text>
                            <View
                                style={{
                                    borderRadius: borders.radiusLarge,
                                    overflow: "hidden",
                                }}
                            >
                                <TouchableOpacity
                                    style={{
                                        padding: 15,
                                        borderRadius: borders.radiusLarge,
                                        backgroundColor: theme.colors.primary,
                                        marginBottom: 10,
                                    }}
                                    onPress={pickImage}
                                >
                                    <Text style={{ color: "#fff8ee" }}>Silahkan Pilih KTP, SIM, atau ID Card</Text>
                                </TouchableOpacity>
                                {guaranteeImage.uri !== "" && (
                                    <Image
                                        source={{ uri: guaranteeImage.uri }}
                                        style={{
                                            height: 400,
                                            width: "100%",
                                            borderRadius: borders.radiusLarge,
                                        }}
                                    />
                                )}
                            </View>
                        </View>
                    </View>
                    {cart.data?.data && (
                        <View>
                            <Text style={[typography.body, { color: "#fff8ee", paddingVertical: 10 }]}>
                                Rincian Pembayaran
                            </Text>
                            <View
                                style={{
                                    borderRadius: borders.radiusLarge,
                                    overflow: "hidden",
                                    padding: 20,
                                    backgroundColor: theme.colors.primary,
                                }}
                            >
                                <View
                                    style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}
                                >
                                    <Text style={[{ color: "#fff8ee" }, typography.body]}>Subtotal</Text>
                                    <Text style={[{ color: "#fff8ee" }]}>{useCurrency(subTotal)}</Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        marginBottom: 10,
                                    }}
                                >
                                    <Text style={[{ color: "#fff8ee" }, typography.body]}>Shipping</Text>
                                    <Text style={{ color: "#fff8ee" }}>Free</Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        marginBottom: 10,
                                    }}
                                >
                                    <Text style={[{ color: "#fff8ee" }, typography.body]}>PPN</Text>
                                    <Text style={{ color: "#fff8ee" }}>10%</Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Text style={[{ color: "#fff8ee" }, typography.body]}>Total</Text>
                                    <Text style={{ color: "#fff8ee" }}>
                                        {useCurrency(subTotal + 10000 + subTotal * 0.1)}
                                    </Text>
                                </View>
                            </View>
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
                                    marginBottom: 20,
                                }}
                                onPress={handleOrder}
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
        </ScrollView>
    );
};
export default CartScreen;
