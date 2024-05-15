import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { Dimensions, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import Carousel from "react-native-snap-carousel";
import { useTheme } from "../../context/ThemeContext";
import useCartService from "../../service/useCartService";
import { borders } from "../../shared/constant/borders";
import { typography } from "../../shared/constant/typography";
import { useCurrency } from "../../utils/useCurrency";
import useLocalStorage from "../../utils/useLocalStorage";
import { useQueryClient } from "@tanstack/react-query";

const EquipmentDetail = ({ navigation, route }) => {
    const { theme } = useTheme();
    const isCarousel = useRef(null);
    const { item } = route.params;
    const cartService = useCartService();
    const localStorage = useLocalStorage();
    const [user, setUser] = useState({ id: "", name: "", phone: "", username: "" });
    const queryClient = useQueryClient()

    const handleAddChart = async () => {
        const payload = {
            equipmentId: item.id,
            quantity: 1,
        };
        await cartService.updateQty(user.id, payload).then(() => {
            queryClient.invalidateQueries("carts")
            navigation.navigate("Cart")
        });
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
    }, []);

    return (
        <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
            <View>
                <Carousel
                    ref={isCarousel}
                    data={item.images}
                    sliderWidth={Dimensions.get("window").width}
                    itemWidth={Dimensions.get("window").width}
                    autoplay
                    autoplayInterval={3000}
                    renderItem={({ item }) => (
                        <ImageBackground
                            source={{ uri: process.env.EXPO_PUBLIC_BASE_API_URL + item.url }}
                            resizeMode="cover"
                            style={{ width: "100%", height: 400 }}
                        />
                    )}
                />
            </View>
            <View style={[theme.padding, { paddingVertical: 10, flex: 1 }]}>
                <Text style={[{ color: theme.colors.text, paddingBottom: 10 }, typography.header]}>{item.name}</Text>
                <Text style={[{ color: theme.colors.text }, typography.title]}>Description:</Text>
                <Text
                    style={[
                        {
                            color: theme.colors.text,
                            borderBottomWidth: 0.5,
                            borderBottomColor: theme.colors.text,
                            paddingBottom: 10,
                            marginBottom: 10,
                        },
                        typography.body,
                    ]}
                >
                    {item.description}
                </Text>
                <Text style={[{ color: theme.colors.text }, typography.title]}>Price:</Text>
                <Text
                    style={[
                        {
                            color: theme.colors.text,
                            borderBottomWidth: 0.5,
                            borderBottomColor: theme.colors.text,
                            paddingBottom: 10,
                            marginBottom: 10,
                        },
                        typography.body,
                    ]}
                >
                    {useCurrency(item.price)}
                </Text>
                <Text style={[{ color: theme.colors.text }, typography.title]}>Stock:</Text>
                <Text
                    style={[
                        {
                            color: theme.colors.text,
                            paddingBottom: 10,
                        },
                        typography.body,
                    ]}
                >
                    {item.stock}
                </Text>
                <TouchableOpacity
                    style={{
                        backgroundColor: theme.colors.primary,
                        borderRadius: borders.radiusLarge,
                        position: "absolute",
                        bottom: 20,
                        paddingHorizontal: 20,
                        marginHorizontal: 20,
                        width: "100%",
                        flexDirection: "row",
                        paddingVertical: 10,
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                    onPress={() => handleAddChart()}
                >
                    <Text style={{ color: "#fff8ee", marginRight: 20 }}>Add to chart</Text>
                    <MaterialIcons name="add-shopping-cart" size={24} color="#fff8ee" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default EquipmentDetail;
