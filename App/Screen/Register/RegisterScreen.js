import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    ActivityIndicator,
    Alert,
    Image,
    Keyboard,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { z } from "zod";
import { useTheme } from "../../context/ThemeContext";
import useAuthService from "../../service/useAuthService";
import { borders } from "../../shared/constant/borders";
import { typography } from "../../shared/constant/typography";
import useLocalStorage from "../../utils/useLocalStorage";
import { CommonActions } from "@react-navigation/native";

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
    isCheck: z.boolean().refine((value) => value === false, { message: "Kamu Harus Menyetujui Syarat dan Ketentuan" }),
});
const RegisterScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const [showPassword, setShowPassword] = useState(true);
    const [isCheck, setIsCheck] = useState(false);
    const localStorage = useLocalStorage();
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        clearErrors,
        reset,
    } = useForm({
        mode: "onTouched",
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            phone: "",
            username: "",
            password: "",
            isCheck: false,
        },
    });
    const phoneNumberRef = useRef();
    const usernameRef = useRef();
    const passwordInputRef = useRef();
    const service = useAuthService();

    const onSubmit = async (data) => {
        try {
            const newData = { name: data.name, phone: data.phone, username: data.username, password: data.password };
            const response = await service.register(newData);
            if (response.statusCode === 201) {
                navigation.replace("Login");
            }
        } catch (error) {
            throw error;
        }
    };

    return (
        <ScrollView
            style={[
                {
                    flex: 1,
                    backgroundColor: theme.colors.background,
                },
                theme.padding,
            ]}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ justifyContent: "center", alignItems: "center", paddingBottom: 70 }}>
                    <Image
                        style={{ objectFit: "contain", height: 300 }}
                        source={require("../../../assets/eazy-camp.png")}
                    />
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
                                style={{ marginHorizontal: 10 }}
                                name="glasses-outline"
                                size={24}
                                color={theme.colors.text}
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
                        {errors.name && <Text style={{ color: theme.colors.danger }}>{errors.name.message}</Text>}
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
                                style={{ marginHorizontal: 10 }}
                                name="logo-whatsapp"
                                size={24}
                                color={theme.colors.text}
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
                        {errors.phone && <Text style={{ color: theme.colors.danger }}>{errors.phone.message}</Text>}
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
                                style={{ marginHorizontal: 10 }}
                                name="person-outline"
                                size={24}
                                color={theme.colors.text}
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
                        {errors.username && (
                            <Text style={{ color: theme.colors.danger }}>{errors.username.message}</Text>
                        )}
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
                                style={{ marginHorizontal: 10 }}
                                name="key-outline"
                                size={24}
                                color={theme.colors.text}
                            />
                            <Controller
                                control={control}
                                name="password"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        ref={passwordInputRef}
                                        style={{ flex: 1, height: 36, padding: 8, color: theme.colors.text }}
                                        secureTextEntry={showPassword}
                                        placeholder="******"
                                        placeholderTextColor={theme.colors.text}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        onSubmitEditing={Keyboard.dismiss}
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
                        {errors.password && (
                            <Text style={{ color: theme.colors.danger }}>{errors.password.message}</Text>
                        )}
                    </View>
                    <Text style={{ textAlign: "center", marginBottom: 10, color: theme.colors.text }}>
                        Untuk menggunakan aplikasi EazyCamp, tolong baca dan setuju dengan{" "}
                        <Text
                            style={{ textDecorationLine: "underline", color: theme.colors.primary }}
                            onPress={() => navigation.navigate("Terms")}
                        >
                            Syarat dan Ketentuan
                        </Text>
                    </Text>
                    <TouchableOpacity
                        style={[
                            {
                                marginBottom: 15,
                                flexDirection: "row",
                                padding: 10,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: theme.colors.info,
                                borderRadius: borders.radiusSmall,
                                width: "100%",
                            },
                            theme.shadow,
                        ]}
                        onPress={() => setIsCheck(!isCheck)}
                    >
                        <MaterialCommunityIcons
                            style={{ marginHorizontal: 10 }}
                            name={isCheck ? "checkbox-outline" : "checkbox-blank-outline"}
                            size={24}
                            color={theme.colors.text}
                        />
                        <Text style={{ color: theme.colors.text }}>
                            Saya Menyetujui Syarat dan Ketentuan dari EazyCamp
                        </Text>
                    </TouchableOpacity>
                    <View style={{ width: "100%" }}>
                        <TouchableOpacity
                            onPress={handleSubmit(onSubmit)}
                            disabled={!isValid || !isCheck}
                            style={[
                                {
                                    padding: 10,
                                    backgroundColor: theme.colors.primary,
                                    borderRadius: borders.radiusSmall,
                                },
                                theme.shadow,
                                !isValid || !isCheck ? { opacity: 0.5 } : { opacity: 1 },
                            ]}
                        >
                            <Text style={[typography.body, { color: "#fff8ee", textAlign: "center" }]}>
                                Register User
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    );
};

export default RegisterScreen;
