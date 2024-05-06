import { Ionicons } from "@expo/vector-icons";
import { useCallback, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    Alert,
    Dimensions,
    FlatList,
    Image,
    ImageBackground,
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import UserAvatar from "react-native-user-avatar";
import { useTheme } from "../../context/ThemeContext";
import { borders } from "../../shared/constant/borders";
import { typography } from "../../shared/constant/typography";
import Carousel from "react-native-snap-carousel";

const EQUIPMENT = [
    {
        id: 1,
        name: "Tenda",
        image: "https://dummyimage.com/200x200/ccc/000&text=Tenda",
        description: "Alat utama untuk berlindung dan tidur saat berkemah.",
    },
    {
        id: 2,
        name: "Sleeping Bag",
        image: "https://dummyimage.com/200x200/ccc/000&text=Sleeping+Bag",
        description: "Tas tidur yang menjaga tubuh tetap hangat saat tidur di alam terbuka.",
    },
    {
        id: 3,
        name: "Matras",
        image: "https://dummyimage.com/200x200/ccc/000&text=Matras",
        description: "Alas tidur yang memberikan kenyamanan saat tidur di tenda.",
    },
    {
        id: 4,
        name: "Kompor Portable",
        image: "https://dummyimage.com/200x200/ccc/000&text=Kompor+Portable",
        description: "Alat memasak portabel yang dapat digunakan di lokasi camping.",
    },
    {
        id: 5,
        name: "Lampu Senter",
        image: "https://dummyimage.com/200x200/ccc/000&text=Lampu+Senter",
        description: "Pencahayaan portable untuk aktivitas di malam hari.",
    },
    {
        id: 6,
        name: "Kantong Tidur",
        image: "https://dummyimage.com/200x200/ccc/000&text=Kantong+Tidur",
        description: "Tas yang digunakan sebagai bantal saat tidur di tenda.",
    },
    {
        id: 7,
        name: "Peralatan Masak",
        image: "https://dummyimage.com/200x200/ccc/000&text=Peralatan+Masak",
        description: "Perangkat memasak seperti panci, sendok, dan spatula.",
    },
    {
        id: 8,
        name: "Tali Tambang",
        image: "https://dummyimage.com/200x200/ccc/000&text=Tali+Tambang",
        description: "Alat untuk mengikat dan memperkuat tenda serta peralatan lainnya.",
    },
    {
        id: 9,
        name: "Pakaian Hangat",
        image: "https://dummyimage.com/200x200/ccc/000&text=Pakaian+Hangat",
        description: "Pakaian tebal dan hangat untuk menjaga tubuh dari suhu dingin.",
    },
    {
        id: 10,
        name: "Kompas",
        image: "https://dummyimage.com/200x200/ccc/000&text=Kompas",
        description: "Alat navigasi untuk menentukan arah dan posisi saat berkemah.",
    },
];

const HomeScreen = () => {
    const { theme } = useTheme();
    const isCarousel = useRef(null);
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
            }),
        []
    );

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
                <View style={[{ flex: 1 }, theme.padding]}>
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
                        <View style={styles.optionLayer}>
                            <TouchableOpacity style={styles.option} />
                            <Text style={styles.optionText}>Lokasi</Text>
                        </View>
                        <View style={[styles.optionLayer, { backgroundColor: theme.colors.primary }]}>
                            <TouchableOpacity style={styles.option} />
                            <Text style={styles.optionText}>Peralatan</Text>
                        </View>
                        <View style={styles.optionLayer}>
                            <TouchableOpacity style={styles.option} />
                            <Text style={styles.optionText}>Pemandu</Text>
                        </View>
                    </View>
                    <View style={{ height: 400 }}>
                        <Carousel
                            ref={isCarousel}
                            data={EQUIPMENT}
                            sliderWidth={Dimensions.get("window").width - 40}
                            itemWidth={Dimensions.get("window").width - 100}
                            onSnapToItem={(index) => console.log(index)}
                            loop
                            renderItem={({ item }) => (
                                <View
                                    style={[
                                        {
                                            flex: 1,
                                            height: 400,
                                            flexDirection: "column",
                                            backgroundColor: theme.colors.primary,
                                            borderRadius: borders.radiusLarge,
                                            paddingBottom: 10,
                                        },
                                        theme.shadow,
                                    ]}
                                >
                                    <Image
                                        source={{ uri: item.image }}
                                        style={{
                                            width: "100%",
                                            height: 300,
                                            borderTopLeftRadius: borders.radiusLarge,
                                            borderTopRightRadius: borders.radiusLarge,
                                            objectFit: "cover",
                                            marginBottom: 10,
                                        }}
                                    />
                                    <Text style={{ color: theme.colors.text, paddingHorizontal: 10 }}>{item.name}</Text>
                                    <Text style={{ color: theme.colors.text, paddingHorizontal: 10 }}>
                                        {item.description}
                                    </Text>
                                </View>
                            )}
                        />
                    </View>
                </View>
            </ImageBackground>
        </TouchableWithoutFeedback>
    );
};

export default HomeScreen;
