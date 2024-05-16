import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommonActions } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
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
import useCustomerService from "../../service/useCustomerService";
import { borders } from "../../shared/constant/borders";
import { typography } from "../../shared/constant/typography";
import useLocalStorage from "../../utils/useLocalStorage";

const schema = z.object({
    username: z.string().min(1, { message: "Username Kamu Tidak Boleh Kosong" }),
    password: z.string().min(6, { message: "Password Kamu Minimal 6 Karakter" }),
});
const LoginScreen = ({ navigation }) => {
    const { theme } = useTheme();
    const [showPassword, setShowPassword] = useState(true);
    const passwordInputRef = useRef();
    const authService = useAuthService();
    const customerService = useCustomerService();
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
            username: "",
            password: "",
        },
    });

    const clearForm = () => {
        reset();
        clearErrors();
        Keyboard.dismiss();
    };

    const onSubmit = async (data) => {
        try {
            const response = await authService.login(data);
            if (response.statusCode === 200 && response.data.roles.includes("ROLE_CUSTOMER")) {
                await localStorage.setData("token", response.data.token);
                clearForm();
            }
        } catch (error) {
            Alert.alert("Gagal Login", error.message);
        }
        try {
            const customer = await customerService.getByUsername(data.username);
            const savedCustomer = {
                id: customer.data.id,
                name: customer.data.name,
                phone: customer.data.phone,
                username: customer.data.userAccount.username,
            };
            await localStorage.setData("user", JSON.stringify(savedCustomer));
            localStorage.getData("user").then(async (data) => {
                const user = JSON.parse(data);
                if (user) {
                    const resultAction = CommonActions.reset({
                        index: 0,
                        routes: [{ name: "TabHome", params: { name: user.name } }],
                    });
                    navigation.dispatch(resultAction);
                } else {
                    navigation.navigate("Welcome");
                }
            });
        } catch (error) {
            Alert.alert("Error", "Gagal mengambil data customer");
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
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Image
                        style={{ objectFit: "contain", height: 300 }}
                        source={require("../../../assets/eazy-camp.png")}
                    />
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
                        {errors.username && <Text style={{ color: theme.colors.text }}>{errors.username.message}</Text>}
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
                        {errors.password && <Text style={{ color: theme.colors.text }}>{errors.password.message}</Text>}
                    </View>
                    <View style={{ width: "100%" }}>
                        <TouchableOpacity
                            onPress={handleSubmit(onSubmit)}
                            disabled={!isValid}
                            style={[
                                {
                                    padding: 10,
                                    backgroundColor: theme.colors.primary,
                                    borderRadius: borders.radiusSmall,
                                },
                                theme.shadow,
                                !isValid ? { opacity: 0.5 } : { opacity: 1 },
                            ]}
                        >
                            <Text style={[typography.body, { color: "#fff8ee", textAlign: "center" }]}>
                                Sudah Punya Akun? Masuk
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    );
};

export default LoginScreen;
