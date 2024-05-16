import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Linking, Modal, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { borders } from "../../shared/constant/borders";
import { typography } from "../../shared/constant/typography";

const OrderList = ({ orders }) => {
    const { theme } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const toggleModal = (item) => {
        setSelectedItem(item);
        setModalVisible(!modalVisible);
    };

    return (
        <View>
            {orders.map((item) => (
                <TouchableOpacity
                    key={item.id}
                    onPress={() => toggleModal(item)}
                    style={{
                        flexDirection: "row",
                        paddingTop: 10,
                        justifyContent: "space-between",
                    }}
                >
                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <Text style={{ color: theme.colors.text }}>{item.date}</Text>
                        <Text style={{ color: theme.colors.text }}>{item.location.name}</Text>
                    </View>
                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <Text style={{ color: theme.colors.text }}>{item.orderStatus}</Text>
                        <Ionicons
                            name={`chevron-${selectedItem === item && modalVisible ? "up" : "down"}`}
                            size={24}
                            color={theme.colors.primary}
                        />
                    </View>
                </TouchableOpacity>
            ))}

            <Modal
                animationType="slide"
                visible={modalVisible}
                transparent
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={{ flex: 1, flexDirection: "column", justifyContent: "flex-end" }}>
                    <View
                        style={[
                            { height: "auto", backgroundColor: theme.colors.primary, paddingTop: 20 },
                            theme.padding,
                        ]}
                    >
                        <View style={{ gap: 5, marginBottom: 10 }}>
                            <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                                <Text style={[{ color: theme.colors.text }, typography.title]}>Detail Order:</Text>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <Ionicons name="close-circle-outline" size={30} color={theme.colors.text} />
                                </TouchableOpacity>
                            </View>
                            {selectedItem?.payment && (
                                <View>
                                    <Text style={[{ color: "#fff8ee" }, typography.body]}>Payment:</Text>
                                    <TouchableOpacity
                                        onPress={() => Linking.openURL(selectedItem.payment.url)}
                                        style={{
                                            borderWidth: 1,
                                            borderColor: "#fff8ee",
                                            backgroundColor: "#2a2a2a",
                                            marginTop: 10,
                                            padding: 10,
                                            borderRadius: borders.radiusMedium,
                                        }}
                                    >
                                        <Text style={[{ color: "#fff8ee" }, typography.body]}>Click here to pay</Text>
                                    </TouchableOpacity>
                                </View>
                            )}

                            {selectedItem?.paymentType && (
                                <View>
                                    <Text style={[{ color: "#fff8ee" }, typography.body]}>Payment type:</Text>
                                    <Text
                                        style={{
                                            color: theme.colors.text,
                                            borderWidth: 1,
                                            borderColor: "#fff8ee",
                                            marginTop: 10,
                                            padding: 5,
                                            borderRadius: borders.radiusMedium,
                                        }}
                                    >
                                        {selectedItem.paymentType}
                                    </Text>
                                </View>
                            )}
                            {selectedItem?.guide && (
                                <View>
                                    <Text style={[{ color: "#fff8ee" }, typography.body]}>Guide:</Text>
                                    <Text
                                        style={{
                                            color: theme.colors.text,
                                            borderWidth: 1,
                                            borderColor: "#fff8ee",
                                            marginTop: 10,
                                            padding: 5,
                                            borderRadius: borders.radiusMedium,
                                        }}
                                    >
                                        {selectedItem.guide.name}
                                    </Text>
                                </View>
                            )}
                            {selectedItem?.orderType && (
                                <View>
                                    <Text style={[{ color: "#fff8ee" }, typography.body]}>Order type:</Text>
                                    <Text
                                        style={{
                                            color: theme.colors.text,
                                            borderWidth: 1,
                                            borderColor: "#fff8ee",
                                            marginTop: 10,
                                            padding: 5,
                                            borderRadius: borders.radiusMedium,
                                        }}
                                    >
                                        {selectedItem.orderType}
                                    </Text>
                                </View>
                            )}
                            {selectedItem?.sentAddress && (
                                <View>
                                    <Text style={[{ color: "#fff8ee" }, typography.body]}>Send to address:</Text>
                                    <Text
                                        style={{
                                            color: theme.colors.text,
                                            borderWidth: 1,
                                            borderColor: "#fff8ee",
                                            marginTop: 10,
                                            padding: 5,
                                            borderRadius: borders.radiusMedium,
                                        }}
                                    >
                                        {selectedItem.sentAddress}
                                    </Text>
                                </View>
                            )}
                            {selectedItem?.orderEquipments && (
                                <View>
                                    <Text style={[{ color: "#fff8ee", paddingBottom: 5 }, typography.body]}>
                                        Order Equipment List:
                                    </Text>
                                    {selectedItem.orderEquipments?.map((equipment) => (
                                        <View
                                            style={{
                                                gap: 5,
                                                paddingLeft: 5,
                                                borderColor: "#fff8ee",
                                                borderWidth: 1,
                                                borderRadius: borders.radiusMedium,
                                                paddingVertical: 5,
                                                marginBottom: 5,
                                            }}
                                            key={equipment.id}
                                        >
                                            <Text style={{ color: theme.colors.text }}>
                                                Name: {equipment.equipment.name}
                                            </Text>
                                            <Text style={{ color: theme.colors.text }}>
                                                Price: {equipment.equipment.price}
                                            </Text>
                                            <Text style={{ color: theme.colors.text }}>
                                                Quantity: {equipment.quantity}
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default OrderList;
