import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Dimensions, ImageBackground, Keyboard, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import UserAvatar from "react-native-user-avatar";
import { useTheme } from "../../context/ThemeContext";
import CustomHeader from "../../shared/components/CustomHeader";
import { borders } from "../../shared/constant/borders";
import { typography } from "../../shared/constant/typography";
import LocationList from "./LocationList";

const HomeScreen = ({ route, navigation, name }) => {
    const { theme } = useTheme();
    const { control, handleSubmit } = useForm({
        mode: "onSubmit",
        defaultValues: {
            search: "",
        },
    });
    const [activeOption, setActiveOption] = useState("Equipment");

    const onSubmit = (data) => {
        Alert.alert("Search", "Searching..." + data.search);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ImageBackground
                style={{ width: "100%", height: Dimensions.get("window").height }}
                resizeMode="cover"
                source={require("../../../assets/home.jpg")}
            >
                <ScrollView style={{ flex: 1, backgroundColor: "rgba(42, 42, 42, 0.7)" }}>
                    <View style={theme.padding}>
                        <CustomHeader title="Eazy Camp">
                            <TouchableOpacity onPress={() => navigation.jumpTo("Profile", { screen: "ProfileScreen" })}>
                                {/* <Ionicons name="person-circle-outline" size={32} color={theme.colors.primary} /> */}
                                <UserAvatar size={35} name={name} bgColor={theme.colors.primary} />
                            </TouchableOpacity>
                        </CustomHeader>

                        <Text style={[typography.title, { color: theme.colors.text, marginVertical: 30 }]}>
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
                                    color: theme.colors.text,
                                    marginVertical: 50,
                                },
                            ]}
                        >
                            The journey of thousand miles begins with a single step. ~ 老子 (Lao Tzu).
                        </Text>
                        <Text style={[typography.header, { color: theme.colors.text, marginBottom: 10 }]}>
                            Pilih Lokasi Kesukaan Kamu
                        </Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <LocationList navigation={navigation} />
                    </View>
                </ScrollView>
            </ImageBackground>
        </TouchableWithoutFeedback>
    );
};

export default HomeScreen;
