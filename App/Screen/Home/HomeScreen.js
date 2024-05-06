import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, FlatList, Image, Text, TextInput, View } from "react-native";
import UserAvatar from "react-native-user-avatar";
import { useTheme } from "../../context/ThemeContext";
import { borders } from "../../shared/constant/borders";
import { typography } from "../../shared/constant/typography";

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
    const [refreshing, setRefreshing] = React.useState(false);
    const { control, handleSubmit } = useForm({
        mode: "onSubmit",
        defaultValues: {
            search: "",
        },
    });

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    const onSubmit = (data) => {
        Alert.alert("Search", "Searching..." + data.search);
    };

    return (
        <>
            <Image
                style={{ position: "absolute", zIndex: 0, objectFit: "cover", width: "100%", height: "100%" }}
                source={require("../../../assets/home.jpg")}
            />
            <View style={[{ zIndex: 1, position: "relative", width: '100%' }, theme.padding]}>
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
                <Text style={[typography.title, {color: theme.colors.text, marginBottom: 20}]}>Welcome Back, Alvindo</Text>
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
                <Text style={[typography.title, {color: theme.colors.text, marginVertical: 50}]}>
                    The journey of thousand miles begins with a single step. ~ 老子 (Lao Tzu).
                </Text>
                <View>
                    
                </View>
                <FlatList
                    data={EQUIPMENT}
                    horizontal
                    keyExtractor={(item) => item.id}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    contentContainerStyle={{ gap: 10 }}
                    renderItem={({ item }) => (
                        <View
                            style={[
                                {
                                    flex: 1,
                                    flexDirection: "column",
                                    backgroundColor: theme.colors.primary,
                                    borderRadius: borders.radiusSmall,
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
                                    borderRadius: borders.radiusSmall,
                                    objectFit: "cover",
                                    marginBottom: 10,
                                }}
                            />
                            <Text style={{ color: theme.colors.text, paddingHorizontal: 10 }}>{item.name}</Text>
                            <Text style={{ color: theme.colors.text, paddingHorizontal: 10 }}>{item.description}</Text>
                        </View>
                    )}
                />
            </View>
        </>
    );
};

export default HomeScreen;
