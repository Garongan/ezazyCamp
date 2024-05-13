import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import UserAvatar from "react-native-user-avatar";
import { useTheme } from "../../context/ThemeContext";
import useEquipmentService from "../../service/useEquipmentService";
import CustomHeader from "../../shared/components/CustomHeader";
import useLocalStorage from "../../utils/useLocalStorage";
import EquipmentList from "./EquipmentList";
import { typography } from "../../shared/constant/typography";
import { Ionicons } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";
import { borders } from "../../shared/constant/borders";

const EquipmentScreen = ({ route }) => {
    const { theme } = useTheme();
    const { location } = route.params || "";
    const localStorage = useLocalStorage();
    const [user, setUser] = useState({ id: "", name: "", phone: "", username: "" });
    const equipmentService = useEquipmentService();
    const { control, handleSubmit, reset } = useForm({
        mode: "onSubmit",
        defaultValues: {
            search: "",
        },
    });
    const [equipmentName, setEquipmentName] = useState("");
    const equipments = useQuery({
        queryKey: ["equipments", equipmentName],
        queryFn: async () => await equipmentService.getAll({ name: equipmentName }),
        placeholderData: keepPreviousData,
        staleTime: 5000,
    });

    const onSubmit = (data) => {
        setEquipmentName(data.search);
        reset();
    };

    useEffect(() => {
        const getUser = async () => {
            try {
                const user = await localStorage.getData("user");
                if (user) {
                    setUser(JSON.parse(user));
                }
            } catch (error) {}
        };
        getUser();
    }, []);

    return (
        <View style={[theme.padding, { backgroundColor: theme.colors.background, flex: 1 }]}>
            <CustomHeader title="Peralatan">
                <UserAvatar size={35} name={user.name} bgColor={theme.colors.primary} />
            </CustomHeader>
            {location && (
                <View>
                    <Text style={[typography.title, { color: theme.colors.text, marginBottom: 10 }]}>
                        Lokasi: {location.name}
                    </Text>
                </View>
            )}
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderRadius: borders.radiusLarge,
                    width: "100%",
                    borderWidth: 1,
                    borderColor: theme.colors.text,
                    marginBottom: 10,
                }}
            >
                <Ionicons style={{ marginHorizontal: 10 }} name="search-outline" size={24} color={theme.colors.text} />
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
            {equipments.isSuccess ? (
                <EquipmentList equipments={equipments.data} />
            ) : (
                <Text style={[typography.title, { color: "#fff8ee", marginVertical: 30 }]}>Loading...</Text>
            )}
        </View>
    );
};

export default EquipmentScreen;
