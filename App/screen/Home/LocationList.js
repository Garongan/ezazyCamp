import { BlurView } from "expo-blur";
import React from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import Carousel from "react-native-snap-carousel";
import { useTheme } from "../../context/ThemeContext";
import { borders } from "../../shared/constant/borders";
import { typography } from "../../shared/constant/typography";

const LocationList = ({ navigation, locations }) => {
    const { theme } = useTheme();
    const isCarousel = React.useRef(null);
    const handleLocationDetail = (item) => {
        navigation.navigate("LocationDetail", { item: item });
    };
    
    return (
        <Carousel
            ref={isCarousel}
            data={locations.data}
            sliderWidth={Dimensions.get("window").width}
            itemWidth={Dimensions.get("window").width - 80}
            slideStyle={{ flex: 1 }}
            renderItem={({ item }) => (
                <View
                    style={[
                        {
                            flexDirection: "column",
                            backgroundColor: theme.colors.background,
                            marginBottom: 50,
                            borderRadius: borders.radiusLarge,
                        },
                    ]}
                >
                    <Image
                        source={{ uri: process.env.EXPO_PUBLIC_BASE_API_URL + item.images[0].url }}
                        style={{
                            width: "100%",
                            height: 350,
                            borderRadius: borders.radiusLarge,
                            objectFit: "cover",
                        }}
                        alt={item.images[0].name}
                    />
                    <View style={{ width: "100%", position: "absolute", top: 140, alignItems: "center" }}>
                        <BlurView
                            intensity={30}
                            experimentalBlurMethod="dimezisBlurView"
                            tint="dark"
                            style={{
                                borderRadius: borders.radiusLarge,
                                overflow: "hidden",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Text style={[{ flex: 1, padding: 20, color: theme.colors.text }, typography.title]}>
                                {item.name}
                            </Text>
                        </BlurView>
                    </View>
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <TouchableOpacity
                            onPress={() => handleLocationDetail(item)}
                            style={{
                                position: "absolute",
                                bottom: -25,
                                borderRadius: borders.radiusLarge,
                                backgroundColor: theme.colors.primary,
                                paddingHorizontal: 30,
                                paddingVertical: 10,
                                marginTop: 10,
                            }}
                        >
                            <Text style={[{ color: "#fff8ee" }, typography.title]}>Lihat Dulu Gak Sih</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
         />
    );
};

export default LocationList;
