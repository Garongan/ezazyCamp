import React, { useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { borders } from "../../shared/constant/borders";
import { typography } from "../../shared/constant/typography";
import { useWrapText } from "../../utils/useWrapText";

const LocationList = ({ navigation, data, hasNextPage, fetchNextPage, isFetchingNextPage, refetch }) => {
    const { theme } = useTheme();
    const handleLocationDetail = async (item) => {
        navigation.navigate("LocationDetail", { item: item });
    };
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        async () => await refetch();
        setRefreshing(false);
    };

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 200 }}
            refreshing={refreshing}
            onRefresh={onRefresh}
            renderItem={({ item }) => (
                <View
                    style={[
                        {
                            flexDirection: "row",
                            padding: 10,
                            marginBottom: 10,
                            backgroundColor: theme.colors.background,
                            borderRadius: borders.radiusMedium,
                            overflow: "hidden",
                            margin: 2,
                        },
                        theme.shadow,
                    ]}
                >
                    <Image
                        source={{ uri: process.env.EXPO_PUBLIC_BASE_API_URL + item.images[0].url }}
                        style={{ width: 150, height: 150, borderRadius: borders.radiusMedium }}
                        alt={item.images[0].name}
                    />
                    <View
                        style={{
                            flex: 1,
                            marginLeft: 10,
                            gap: 10,
                            justifyContent: "space-between",
                        }}
                    >
                        <Text style={[{ color: theme.colors.text }, typography.title]}>{useWrapText(item.name)}</Text>
                        <TouchableOpacity
                            onPress={() => handleLocationDetail(item)}
                            style={{
                                borderRadius: borders.radiusMedium,
                                backgroundColor: theme.colors.primary,
                                alignItems: "center",
                                paddingVertical: 10,
                                marginTop: 10,
                            }}
                        >
                            <Text style={[{ color: "#fff8ee" }, typography.body]}>Lihat Dulu Gak Sih</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
    );
};

export default LocationList;
