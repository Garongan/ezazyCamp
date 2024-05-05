import React from "react";
import { FlatList, Image, Text, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { borders } from "../../shared/constant/borders";

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

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    return (
        <View style={[{ backgroundColor: theme.colors.background, flex: 1 }, theme.padding]}>
            <FlatList
                data={EQUIPMENT}
                keyExtractor={(item) => item.id}
                numColumns={3}
                refreshing={refreshing}
                onRefresh={onRefresh}
                renderItem={({ item }) => (
                    <View
                        style={[{
                            flex: 1,
                            flexDirection: "column",
                            margin: 10,
                            backgroundColor: theme.colors.primary,
                            borderRadius: borders.radiusSmall,
                            paddingBottom: 10
                        }, theme.shadow]}
                    >
                        <Image
                            source={{ uri: item.image }}
                            style={{
                                width: "100%",
                                height: 100,
                                borderRadius: borders.radiusSmall,
                                objectFit: "cover",
                                marginBottom: 10
                            }}
                        />
                        <Text style={{ color: theme.colors.text, paddingHorizontal: 10 }}>{item.name}</Text>
                        <Text style={{ color: theme.colors.text, paddingHorizontal: 10 }}>{item.description}</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default HomeScreen;
