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
    username: z.string().min(1, { message: "Username Kamu Tidak Boleh Kosong" }),
    password: z.string().min(6, { message: "Password Kamu Minimal 6 Karakter" }),
});
const LoginScreen = () => {
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
                Masuk dengan akun kamu
            </Text>
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
                        {
                            padding: 10,
                            backgroundColor: theme.colors.secondary,
                            borderRadius: borders.radiusSmall,
                        },
                        theme.shadow,
                    ]}
                >
                    <Text style={[typography.body, { color: theme.colors.primary, textAlign: "center" }]}>
                        Sudah Punya Akun? Masuk
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LoginScreen;