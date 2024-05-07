import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    Alert,
    Dimensions,
    ImageBackground,
    Keyboard,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import UserAvatar from "react-native-user-avatar";
import { useTheme } from "../../context/ThemeContext";
import { borders } from "../../shared/constant/borders";
import { typography } from "../../shared/constant/typography";
import EquipmentList from "./EquipmentList";
import LocationList from "./LocationList";
import GuideList from "./GuideList";

const HomeScreen = () => {
    const { theme } = useTheme();
    const { control, handleSubmit } = useForm({
        mode: "onSubmit",
        defaultValues: {
            search: "",
        },
    });
    const styles = useMemo(
        () =>
            StyleSheet.create({
                option: {
                    backgroundColor: theme.colors.background,
                    borderRadius: borders.radiusLarge,
                    opacity: 0.5,
                    padding: 20,
                    width: 100,
                },
                optionText: {
                    position: "absolute",
                    color: theme.colors.text,
                    justifyContent: "center",
                    alignItems: "center",
                },
                optionLayer: {
                    justifyContent: "center",
                    alignItems: "center",
                    borderColor: theme.colors.text,
                    borderWidth: 1,
                    borderRadius: borders.radiusLarge,
                },
                activeLayer: {
                    backgroundColor: theme.colors.primary,
                },
                activeOption: {
                    opacity: 0,
                }
            }),
        []
    );

    const [activeOption, setActiveOption] = useState("Equipment");

    const handleOption = () => {
        switch (activeOption) {
            case "Equipment":
                return <EquipmentList />;
            case "Guide":
                return <GuideList />;
            default:
                return <LocationList />;
        }
    };

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
                <ScrollView style={{ flex: 1 }}>
                    <View style={theme.padding}>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                paddingVertical: 20,
                            }}
                        >
                            <Text style={[typography.header, { color: theme.colors.text }]}>Eazy Camp</Text>
                            <UserAvatar size={35} name="Alvindo" />
                        </View>
                        <Text style={[typography.title, { color: theme.colors.text, marginBottom: 20 }]}>
                            Selamat Datang, Alvindo
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
                        <Text style={[typography.title, { color: theme.colors.text, marginVertical: 50 }]}>
                            The journey of thousand miles begins with a single step. ~ 老子 (Lao Tzu).
                        </Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 50 }}>
                            <TouchableOpacity style={[styles.optionLayer, activeOption === "Location" && styles.activeLayer]} onPress={() => setActiveOption("Location")}>
                                <View style={[styles.option, activeOption === "Location" && styles.activeOption]} />
                                <Text style={styles.optionText}>Lokasi</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.optionLayer, activeOption === "Equipment" && styles.activeLayer]}
                                onPress={() => setActiveOption("Equipment")}
                            >
                                <View style={[styles.option, { opacity: 0 }]} />
                                <Text style={styles.optionText}>Peralatan</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.optionLayer, activeOption === "Guide" && styles.activeLayer]} onPress={() => setActiveOption("Guide")}>
                                <View style={[styles.option, activeOption === "Guide" && styles.activeOption]} />
                                <Text style={styles.optionText}>Pemandu</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {handleOption()}
                </ScrollView>
            </ImageBackground>
        </TouchableWithoutFeedback>
    );
};

export default HomeScreen;
