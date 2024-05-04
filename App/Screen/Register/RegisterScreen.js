import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { z } from "zod";
import { useTheme } from "../../context/ThemeContext";
import { borders } from "../../shared/constant/borders";
import { typography } from "../../shared/constant/typography";

const schema = z.object({
    name: z.string().min(1, { message: "Nama Kamu Tidak Boleh Kosong" }),
    phone: z
        .string()
        .min(1, { message: "Nomor Telepon Kamu Tidak Boleh Kosong" })
        .max(15, { message: "Nomor Telepon Kamu Terlalu Panjang" }),
    username: z
        .string()
        .min(1, { message: "Username Kamu Tidak Boleh Kosong" })
        .refine((value) => !/\s/.test(value), { message: "Username Kamu Tidak Boleh Mengandung Spasi" }),
    password: z.string().min(6, { message: "Password Kamu Minimal 6 Karakter" }),
});
const RegisterScreen = () => {
    const { theme } = useTheme();
    const [showPassword, setShowPassword] = useState(true);
    const {
        control,
        handleSubmit,
        formState: { errors, disabled },
        clearErrors,
        reset,
    } = useForm({
        mode: "onTouched",
        resolver: zodResolver(schema),
    });
    const phoneNumberRef = useRef();
    const usernameRef = useRef();
    const passwordInputRef = useRef();

    const onSubmit = (data) => {
        Alert.alert("Data", JSON.stringify(data));
    };
    return (
        <View
            style={[
                {
                    flex: 1,
                    backgroundColor: theme.colors.background,
                    justifyContent: "center",
                    alignItems: "center",
                },
                theme.padding,
            ]}
        >
            <Image style={{ objectFit: "contain", height: 300 }} source={require("../../../assets/eazy-camp.png")} />
            <Text style={[{ color: theme.colors.text, marginBottom: 30 }, typography.title]}>
                Masukkan Data Diri Kamu
            </Text>
            <View style={{ marginBottom: 10 }}>
                <Text style={{ color: theme.colors.text }}>Name</Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        borderWidth: borders.borderWidth,
                        borderColor: theme.colors.text,
                        borderRadius: borders.radiusMedium,
                        marginVertical: 8,
                        width: "100%",
                    }}
                >
                    <Ionicons
                        style={{ marginHorizontal: 10, color: theme.colors.text }}
                        name="glasses-outline"
                        size={24}
                        color="black"
                    />
                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={{ flex: 1, height: 36, padding: 8, color: theme.colors.text }}
                                returnKeyType="next"
                                placeholder="Joko Pangelasan"
                                placeholderTextColor={theme.colors.text}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                                onSubmitEditing={() => phoneNumberRef.current.focus()}
                            />
                        )}
                    />
                </View>
                {errors.name && <Text style={{ color: theme.colors.error }}>{errors.name.message}</Text>}
            </View>
            <View style={{ marginBottom: 10 }}>
                <Text style={{ color: theme.colors.text }}>Phone Number</Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        borderWidth: borders.borderWidth,
                        borderColor: theme.colors.text,
                        borderRadius: borders.radiusMedium,
                        marginVertical: 8,
                        width: "100%",
                    }}
                >
                    <Ionicons
                        style={{ marginHorizontal: 10, color: theme.colors.text }}
                        name="logo-whatsapp"
                        size={24}
                        color="black"
                    />
                    <Controller
                        control={control}
                        name="phone"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={{ flex: 1, height: 36, padding: 8, color: theme.colors.text }}
                                returnKeyType="next"
                                ref={phoneNumberRef}
                                placeholder="089111222333"
                                placeholderTextColor={theme.colors.text}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                                onSubmitEditing={() => usernameRef.current.focus()}
                            />
                        )}
                    />
                </View>
                {errors.phone && <Text style={{ color: theme.colors.error }}>{errors.phone.message}</Text>}
            </View>
            <View style={{ marginBottom: 10 }}>
                <Text style={{ color: theme.colors.text }}>Username</Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        borderWidth: borders.borderWidth,
                        borderColor: theme.colors.text,
                        borderRadius: borders.radiusMedium,
                        marginVertical: 8,
                        width: "100%",
                    }}
                >
                    <Ionicons
                        style={{ marginHorizontal: 10, color: theme.colors.text }}
                        name="person-outline"
                        size={24}
                        color="black"
                    />
                    <Controller
                        control={control}
                        name="username"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={{ flex: 1, height: 36, padding: 8, color: theme.colors.text }}
                                returnKeyType="next"
                                ref={usernameRef}
                                placeholder="JokoPetulang"
                                placeholderTextColor={theme.colors.text}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                                onSubmitEditing={() => passwordInputRef.current.focus()}
                            />
                        )}
                    />
                </View>
                {errors.username && <Text style={{ color: theme.colors.error }}>{errors.username.message}</Text>}
            </View>
            <View style={{ marginBottom: 10 }}>
                <Text style={{ color: theme.colors.text }}>Password</Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        borderWidth: borders.borderWidth,
                        borderColor: theme.colors.text,
                        borderRadius: borders.radiusMedium,
                        marginVertical: 8,
                        width: "100%",
                    }}
                >
                    <Ionicons
                        style={{ marginHorizontal: 10, color: theme.colors.text }}
                        name="key-outline"
                        size={24}
                        color="black"
                    />
                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                ref={passwordInputRef}
                                style={{ flex: 1, height: 36, padding: 8, color: theme.colors.text }}
                                returnKeyType="send"
                                secureTextEntry={showPassword}
                                placeholder="******"
                                placeholderTextColor={theme.colors.text}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                                showSoftInputOnFocus={false}
                                onSubmitEditing={handleSubmit(onSubmit)}
                            />
                        )}
                    />
                    <Ionicons
                        onPress={() => setShowPassword(!showPassword)}
                        style={{ marginHorizontal: 10, color: theme.colors.text }}
                        name={showPassword ? "eye-outline" : "eye-off-outline"}
                        size={24}
                        color="black"
                    />
                </View>
                {errors.password && <Text style={{ color: theme.colors.error }}>{errors.password.message}</Text>}
            </View>
            <View style={{ width: "100%" }}>
                <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
                    disabled={!disabled}
                    style={[
                        { padding: 10, backgroundColor: theme.colors.secondary, borderRadius: borders.radiusSmall },
                        theme.shadow,
                    ]}
                >
                    <Text style={[typography.body, { color: theme.colors.primary, textAlign: "center" }]}>
                        Register User
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default RegisterScreen;
