import { Ionicons } from "@expo/vector-icons";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    ActivityIndicator,
    Keyboard,
    Pressable,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import UserAvatar from "react-native-user-avatar";
import { useTheme } from "../../context/ThemeContext";
import useLocationService from "../../service/useLocationService";
import CustomHeader from "../../shared/components/CustomHeader";
import { borders } from "../../shared/constant/borders";
import { typography } from "../../shared/constant/typography";
import LocationList from "./LocationList";

const HomeScreen = ({ navigation, name }) => {
    const { theme } = useTheme();
    const { control, handleSubmit, reset } = useForm({
        mode: "onSubmit",
        defaultValues: {
            search: "",
        },
    });
    const locationService = useLocationService();
    const [ locationName, setLocationName ] = useState("");

    const locations = useInfiniteQuery({
        queryKey: [ "locations", locationName ],
        queryFn: async ({ pageParam = 1 }) => await locationService.getAll({ name: locationName, page: pageParam }),
        getNextPageParam: (lastPage) => {
            return lastPage.paging.hasNext ? lastPage.paging.page + 1 : false;
        },
        staleTime: Infinity,
    });

    const onSubmit = (data) => {
        setLocationName(data.search);
    };

    const handleReset = () => {
        setLocationName("");
        reset();
    };

    return (
        <View style={[ theme.padding, { backgroundColor: theme.colors.background, flex: 1 } ]}>
            <Pressable onPress={Keyboard.dismiss}>
                <CustomHeader title="Eazy Camp" style={{ color: theme.colors.text }}>
                    <TouchableOpacity onPress={() => navigation.jumpTo("Profile", { screen: "ProfileScreen" })}>
                        <UserAvatar size={35} name={name} bgColor={theme.colors.primary}/>
                    </TouchableOpacity>
                </CustomHeader>
                <Text style={[ typography.title, { color: theme.colors.text, marginVertical: 20 } ]}>
                    Selamat Datang, {name}
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        borderRadius: borders.radiusLarge,
                        width: "100%",
                        borderWidth: 1,
                        borderColor: theme.colors.text,
                        backgroundColor: theme.colors.background,
                        marginBottom: 20,
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
                                placeholder="Cari lokasi camping..."
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
                {locations.isSuccess ? (
                    <LocationList
                        navigation={navigation}
                        data={locations.data?.pages?.flatMap((page) => page.data) ?? []}
                        hasNextPage={locations.data.pages[locations.data.pages.length - 1].paging.hasNext}
                        refetch={locations.refetch}
                        fetchNextPage={locations.fetchNextPage}
                        isFetchingNextPage={locations.isFetchingNextPage}
                    />
                ) : (
                    <ActivityIndicator size="large" color={theme.colors.primary} style={{ padding: 100 }}/>
                )}
            </Pressable>
        </View>
    );
};

export default HomeScreen;
