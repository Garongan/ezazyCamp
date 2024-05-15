import { useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { borders } from "../../shared/constant/borders";
import { typography } from "../../shared/constant/typography";
import { useCurrency } from "../../utils/useCurrency";
import { useWrapText } from "../../utils/useWrapText";

const EquipmentList = ({ navigation, data, hasNextPage, fetchNextPage, isFetchingNextPage, refetch }) => {
    const { theme } = useTheme();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        async () => await refetch();
        setRefreshing(false);
    };

    const handleEquipmentDetail = (item) => {
        navigation.navigate("EquipmentDetail", { item: item });
    };

    return (
        <View style={{ width: "100%" }}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 150 }}
                refreshing={refreshing}
                onRefresh={onRefresh}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            theme.shadow,
                            {
                                flexDirection: "row",
                                padding: 10,
                                marginVertical: 10,
                                backgroundColor: theme.colors.background,
                                borderRadius: borders.radiusMedium,
                                overflow: "hidden",
                                margin: 2,
                            },
                        ]}
                        onPress={() => handleEquipmentDetail(item)}
                    >
                        <Image
                            source={{ uri: process.env.EXPO_PUBLIC_BASE_API_URL + item.images[0].url }}
                            style={{ width: 150, height: "auto", borderRadius: borders.radiusMedium }}
                            alt={item.images[0].name}
                        />
                        <View style={{ marginLeft: 10, flex: 1, justifyContent: "space-between" }}>
                            <View style={{ gap: 10 }}>
                                <Text style={[{ color: theme.colors.text }, typography.title]}>
                                    {useWrapText(item.name)}
                                </Text>
                                <Text style={{ color: theme.colors.text }}>{useCurrency(item.price)}</Text>
                                <Text style={{ color: theme.colors.text }}>Stock: {item.stock}</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => handleEquipmentDetail(item)}
                                style={{
                                    borderRadius: borders.radiusMedium,
                                    backgroundColor: theme.colors.primary,
                                    alignItems: "center",
                                    paddingVertical: 10,
                                    marginTop: 10,
                                }}
                            >
                                <Text style={[{ color: "#fff8ee" }, typography.body]}>Detail</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
                onEndReached={async () => {
                    if (hasNextPage) {
                        await fetchNextPage();
                    }
                }}
                onEndReachedThreshold={0.5}
                ListFooterComponent={() =>
                    isFetchingNextPage ? (
                        <ActivityIndicator size="large" color={theme.colors.primary} style={{ padding: 100 }} />
                    ) : null
                }
            />
        </View>
    );
};

export default EquipmentList;
