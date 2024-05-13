import React from "react";
import { Dimensions, FlatList, Image, Text, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useCurrency } from "../../utils/useCurrency";
import { borders } from "../../shared/constant/borders";

const EquipmentList = ({ equipments }) => {
    const { theme } = useTheme();

    return (
        <View style={{ width: "100%" }}>
            <FlatList
                data={equipments.data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View
                        style={[
                            theme.shadow,
                            {
                                flexDirection: "row",
                                padding: 10,
                                marginVertical: 10,
                                backgroundColor: theme.colors.background,
                                borderRadius: borders.radiusMedium,
                                overflow: "hidden",
                                margin: 2
                            },
                        ]}
                    >
                        <Image
                            source={{ uri: process.env.EXPO_PUBLIC_BASE_API_URL + item.images[0].url }}
                            style={{ width: 150, height: "auto", borderRadius: borders.radiusMedium }}
                            alt={item.images[0].name}
                        />
                        <View
                            style={{
                                flex: 1,
                                marginLeft: 10,
                                gap: 10,
                            }}
                        >
                            <Text style={{ color: theme.colors.text }}>{item.name}</Text>
                            <Text style={{ color: theme.colors.text }}>{item.description}</Text>
                            <Text style={{ color: theme.colors.text }}>{useCurrency(item.price)}</Text>
                            <Text style={{ color: theme.colors.text }}>{item.stock}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

export default EquipmentList;
