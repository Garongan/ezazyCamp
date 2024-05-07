import React from "react";
import { Button, Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { useTheme } from "../../context/ThemeContext";
import { borders } from "../../shared/constant/borders";
import { typography } from "../../shared/constant/typography";
import LocationDetail from "./LocationDetail";
import { BlurView } from "expo-blur";

const LOCATIONS = [
    {
        id: "1",
        name: "Location 1",
        description: "Description of Location 1",
        recommendedActivity: "Activity for Location 1",
        safetyTips: "Safety tips for Location 1",
        images: [
            {
                id: "1",
                name: "Image 1",
                url: "https://via.placeholder.com/600x400?text=Image+1",
                originalName: "image1.jpg",
                size: 1024,
                location: "Location 1",
            },
            {
                id: "2",
                name: "Image 2",
                url: "https://via.placeholder.com/600x400?text=Image+2",
                originalName: "image2.jpg",
                size: 2048,
                location: "Location 1",
            },
        ],
    },
    {
        id: "2",
        name: "Location 2",
        description: "Description of Location 2",
        recommendedActivity: "Activity for Location 2",
        safetyTips: "Safety tips for Location 2",
        images: [
            {
                id: "3",
                name: "Image 3",
                url: "https://via.placeholder.com/600x400?text=Image+3",
                originalName: "image3.jpg",
                size: 1536,
                location: "Location 2",
            },
            {
                id: "4",
                name: "Image 4",
                url: "https://via.placeholder.com/600x400?text=Image+4",
                originalName: "image4.jpg",
                size: 4096,
                location: "Location 2",
            },
        ],
    },
];

const LocationList = ({ navigation }) => {
    const { theme } = useTheme();
    const isCarousel = React.useRef(null);
    const handleLocationDetail = (item) => {
        navigation.navigate("LocationDetail", { item: item });
    };
    return (
        <Carousel
            ref={isCarousel}
            data={LOCATIONS}
            sliderWidth={Dimensions.get("window").width}
            itemWidth={Dimensions.get("window").width - 80}
            slideStyle={{ flex: 1 }}
            contentContainerCustomStyle={{ paddingLeft: 20, paddingRight: 20 }}
            renderItem={({ item }) => (
                <View
                    style={[
                        {
                            flexDirection: "column",
                            backgroundColor: theme.colors.background,
                            marginBottom: 50,
                        },
                    ]}
                >
                    <Image
                        source={{ uri: item.images[0].url }}
                        style={{
                            width: "100%",
                            height: 300,
                            borderRadius: borders.radiusLarge,
                            objectFit: "cover",
                        }}
                    />
                    <View style={{ width: "100%", position: "absolute", top: 110, alignItems: "center" }}>
                        <BlurView
                            intensity={30}
                            experimentalBlurMethod="dimezisBlurView"
                            tint="dark"
                            style={{
                                borderRadius: borders.radiusLarge,
                                overflow: "hidden",
                                alignItems: "center",
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
                            <Text style={[{ color: theme.colors.text }, typography.title]}>Pilih Lokasi</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        />
    );
};

export default LocationList;
