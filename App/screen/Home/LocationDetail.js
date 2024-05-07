import React, { useRef } from "react";
import { Alert, Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Carousel from "react-native-snap-carousel";
import { useTheme } from "../../context/ThemeContext";
import { BlurView } from "expo-blur";
import { borders } from "../../shared/constant/borders";
import { typography } from "../../shared/constant/typography";

const LocationDetail = ({ route }) => {
    const { theme } = useTheme();
    const isCarousel = useRef(null);
    const { item } = route.params;

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
                        source={{ uri: item.url }}
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
                    intensity={30}
                    experimentalBlurMethod="dimezisBlurView"
                    tint="dark"
                    style={{ borderRadius: borders.radiusLarge, overflow: "hidden" }}
                >
                    <View style={{ flex: 1, width: Dimensions.get("window").width - 40, padding: 20 }}>
                        <Text style={[{ color: theme.colors.text, paddingBottom: 10 }, typography.title]}>
                            {item.name}
                        </Text>
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
                        <Text style={[{ color: theme.colors.text }, typography.title]}>Rekomendasi Aktivitas:</Text>
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
                            {item.recommendedActivity}
                        </Text>
                        <Text style={[{ color: theme.colors.text }, typography.title]}>Safety Tips:</Text>
                        <Text
                            style={[
                                {
                                    color: theme.colors.text,
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
                            onPress={() => Alert.alert("Pilih Lokasi", JSON.stringify(item.id))}
                            style={{
                                borderRadius: borders.radiusLarge,
                                backgroundColor: theme.colors.primary,
                                paddingHorizontal: 30,
                                paddingVertical: 10,
                                marginBottom: 30,
                            }}
                        >
                            <Text style={[{ color: theme.colors.text }, typography.title]}>Pilih Lokasi</Text>
                        </TouchableOpacity>
                    </View>
                </BlurView>
            </View>
        </View>
    );
};

export default LocationDetail;
