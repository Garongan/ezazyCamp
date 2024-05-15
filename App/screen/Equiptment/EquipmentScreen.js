import { keepPreviousData, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";
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
import { useFocusEffect } from "@react-navigation/native";

const EquipmentScreen = ({ navigation }) => {
    const { theme } = useTheme();
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
    const [location, setLocation] = useState({ id: "", name: "" });

    const equipments = useInfiniteQuery({
        queryKey: ["equipments", equipmentName],
        queryFn: async ({ pageParam = 1 }) => await equipmentService.getAll({ name: equipmentName, page: pageParam }),
        getNextPageParam: (lastPage) => {
            return lastPage.paging.hasNext ? lastPage.paging.page + 1 : false;
        },
        staleTime: Infinity,
    });

    const onSubmit = (data) => {
        setEquipmentName(data.search);
    };

    const handleReset = () => {
        setEquipmentName("");
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

    const getLocation = useCallback(async () => {
        try {
            const location = await localStorage.getData("location");
            if (location) {
                setLocation(JSON.parse(location));
            }
        } catch (error) {
            console.log(error);
        }
    });

    useFocusEffect(
        useCallback(() => {
            getLocation();
        }, [])
    );

    return (
        <View style={[theme.padding, { backgroundColor: theme.colors.background, flex: 1 }]}>
            <CustomHeader title="Peralatan">
                <TouchableOpacity onPress={() => navigation.jumpTo("Profile", { screen: "ProfileScreen" })}>
                    <UserAvatar size={35} name={user.name} bgColor={theme.colors.primary} />
                </TouchableOpacity>
            </CustomHeader>
            {location && (
                <View>
                    <Text style={[typography.title, { color: theme.colors.text, marginBottom: 10 }]}>
                        Lokasi: {location.name ? location.name : "Silahkan pilih lokasi"}
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
                <Ionicons
                    style={{ marginHorizontal: 10 }}
                    name="close-circle-outline"
                    size={24}
                    color={theme.colors.text}
                    onPress={handleReset}
                />
            </View>
            {equipments.isSuccess ? (
                <EquipmentList
                    navigation={navigation}
                    data={equipments.data?.pages?.flatMap((page) => page.data) ?? []}
                    hasNextPage={equipments.data.pages[equipments.data.pages.length - 1].paging.hasNext}
                    refetch={equipments.refetch}
                    fetchNextPage={equipments.fetchNextPage}
                    isFetchingNextPage={equipments.isFetchingNextPage}
                />
            ) : (
                <ActivityIndicator size="large" color={theme.colors.primary} style={{ padding: 100 }} />
            )}
        </View>
    );
};

export default EquipmentScreen;
