import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Dimensions, ImageBackground, Keyboard, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import UserAvatar from "react-native-user-avatar";
import { useTheme } from "../../context/ThemeContext";
import CustomHeader from "../../shared/components/CustomHeader";
import { borders } from "../../shared/constant/borders";
import { typography } from "../../shared/constant/typography";
import LocationList from "./LocationList";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import useLocationService from "../../service/useLocationService";

const HomeScreen = ({ navigation, name }) => {
    const { theme } = useTheme();
    const { control, handleSubmit, reset } = useForm({
        mode: "onSubmit",
        defaultValues: {
            search: "",
        },
    });
    const locationService = useLocationService();
    const [locationName, setLocationName] = useState("");

    const locations = useQuery({
        queryKey: ["locations", locationName],
        queryFn: async () =>
            await locationService.getAll({
                name: locationName,
            }),
        placeholderData: keepPreviousData,
        staleTime: 5000,
    });

    const onSubmit = (data) => {
        setLocationName(data.search);
        reset();
    };

    return (
        <ScrollView style={{ flex: 1 }}>
            <Pressable onPress={Keyboard.dismiss}>
                <ImageBackground
                    style={{ width: "100%", height: Dimensions.get("window").height }}
                    resizeMode="cover"
                    source={require("../../../assets/home.jpg")}
                >
                    <View style={{ backgroundColor: "rgba(42, 42, 42, 0.7)", flex: 1 }}>
                        <View style={theme.padding}>
                            <CustomHeader title="Eazy Camp" style={{ color: "#fff8ee" }}>
                                <TouchableOpacity
                                    onPress={() => navigation.jumpTo("Profile", { screen: "ProfileScreen" })}
                                >
                                    <UserAvatar size={35} name={name} bgColor={theme.colors.primary} />
                                </TouchableOpacity>
                            </CustomHeader>
                            <Text style={[typography.title, { color: "#fff8ee", marginVertical: 30 }]}>
                                Selamat Datang, {name}
                            </Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    borderRadius: borders.radiusLarge,
                                    width: "100%",
                                    backgroundColor: theme.colors.background,
                                }}
                            >
                                <Ionicons
                                    style={{ marginHorizontal: 10 }}
                                    name="search-outline"
                                    size={24}
                                    color={theme.colors.text}
                                />
                                <Controller
                                    control={control}
                                    name="search"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={{ flex: 1, padding: 10, color: theme.colors.text }}
                                            onChangeText={onChange}
                                            returnKeyType="search"
                                            onBlur={onBlur}
                                            value={value}
                                            placeholder="Cari peralatan camping..."
                                            placeholderTextColor={theme.colors.text}
                                            onSubmitEditing={handleSubmit(onSubmit)}
                                        />
                                    )}
                                />
                            </View>
                            <Text
                                style={[
                                    typography.title,
                                    {
                                        textAlign: "center",
                                        paddingHorizontal: 20,
                                        color: "#fff8ee",
                                        marginVertical: 50,
                                    },
                                ]}
                            >
                                The journey of thousand miles begins with a single step. ~ 老子 (Lao Tzu).
                            </Text>
                            <Text style={[typography.header, { color: "#fff8ee", marginBottom: 10 }]}>
                                Pilih Lokasi Kesukaan Kamu
                            </Text>
                        </View>
                        <View style={{ alignItems: "center" }}>
                            {locations.isSuccess ? (
                                <LocationList navigation={navigation} locations={locations.data} />
                            ) : (
                                <Text style={[typography.title, { color: "#fff8ee", marginVertical: 30 }]}>
                                    Loading...
                                </Text>
                            )}
                        </View>
                    </View>
                </ImageBackground>
            </Pressable>
        </ScrollView>
    );
};

export default HomeScreen;
