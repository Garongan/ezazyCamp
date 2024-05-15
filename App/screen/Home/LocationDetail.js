import { BlurView } from "expo-blur";
import React, { useEffect, useRef } from "react";
import { Dimensions, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import Carousel from "react-native-snap-carousel";
import { useTheme } from "../../context/ThemeContext";
import { borders } from "../../shared/constant/borders";
import { typography } from "../../shared/constant/typography";
import useLocalStorage from "../../utils/useLocalStorage";

const LocationDetail = ({ navigation, route }) => {
    const { theme } = useTheme();
    const isCarousel = useRef(null);
    const { item } = route.params;
    const localStorage = useLocalStorage();

    const handleAddLocation = async () => {
        await localStorage.setData("location", JSON.stringify({ id: item.id, name: item.name }));
        navigation.goBack();
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
        <View style={{ backgroundColor: theme.colors.background }}>
            <Carousel
                ref={isCarousel}
                data={item.images}
                sliderWidth={Dimensions.get("window").width}
                itemWidth={Dimensions.get("window").width}
                slideStyle={{ flex: 1 }}
                autoplay
                autoplayInterval={3000}
                renderItem={({ item }) => (
                    <ImageBackground
                        source={{ uri: process.env.EXPO_PUBLIC_BASE_API_URL + item.url }}
                        resizeMode="cover"
                        style={{ width: "100%", height: Dimensions.get("window").height }}
                    />
                )}
            />
            <View
                style={[
                    {
                        position: "absolute",
                        bottom: 20,
                        flex: 1,
                        alignItems: "center",
                    },
                    theme.padding,
                ]}
            >
                <BlurView
                    intensity={70}
                    experimentalBlurMethod="dimezisBlurView"
                    tint="dark"
                    style={{ borderRadius: borders.radiusLarge, overflow: "hidden" }}
                >
                    <View style={{ flex: 1, width: Dimensions.get("window").width - 40, padding: 20 }}>
                        <Text style={[{ color: "#fff8ee", paddingBottom: 10 }, typography.title]}>{item.name}</Text>
                        <Text style={[{ color: "#fff8ee" }, typography.title]}>Description:</Text>
                        <Text
                            style={[
                                {
                                    color: "#fff8ee",
                                    borderBottomWidth: 0.5,
                                    borderBottomColor: "#fff8ee",
                                    paddingBottom: 10,
                                    marginBottom: 10,
                                },
                                typography.body,
                            ]}
                        >
                            {item.description}
                        </Text>
                        <Text style={[{ color: "#fff8ee" }, typography.title]}>Rekomendasi Aktivitas:</Text>
                        <Text
                            style={[
                                {
                                    color: "#fff8ee",
                                    borderBottomWidth: 0.5,
                                    borderBottomColor: "#fff8ee",
                                    paddingBottom: 10,
                                    marginBottom: 10,
                                },
                                typography.body,
                            ]}
                        >
                            {item.recommendedActivity}
                        </Text>
                        <Text style={[{ color: "#fff8ee" }, typography.title]}>Safety Tips:</Text>
                        <Text
                            style={[
                                {
                                    color: "#fff8ee",
                                    paddingBottom: 10,
                                },
                                typography.body,
                            ]}
                        >
                            {item.safetyTips}
                        </Text>
                    </View>
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <TouchableOpacity
                            onPress={handleAddLocation}
                            style={{
                                borderRadius: borders.radiusLarge,
                                backgroundColor: theme.colors.primary,
                                paddingHorizontal: 30,
                                paddingVertical: 10,
                                marginBottom: 30,
                            }}
                        >
                            <Text style={[{ color: "#fff8ee" }, typography.title]}>Pilih Lokasi</Text>
                        </TouchableOpacity>
                    </View>
                </BlurView>
            </View>
        </View>
    );
};

export default LocationDetail;
