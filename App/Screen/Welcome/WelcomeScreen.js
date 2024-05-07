import React from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { borders } from "../../shared/constant/borders";
import { typography } from "../../shared/constant/typography";

function WelcomeScreen({ navigation }) {
    const { theme } = useTheme();
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground style={{ height: "100%", width: "100%" }} source={require("../../../assets/welcome.jpg")}>
                <View style={[{ flex: 1 }, theme.padding]}>
                    <View style={{ flex: 1, justifyContent: "flex-end", paddingBottom: 50 }}>
                        <Text style={[typography.header, { color: "#fff8ee" }]}>Aku Sudah Disini, Kamu Kapan?</Text>
                        <Text style={[typography.body, { color: "#fff8ee", paddingVertical: 10 }]}>
                            Ayo Naik Gunung Agar Melihat Orang Seperti Semut, Sewa Keperluan Camping Disini Sekarang,
                            Dengan Cakupan Seluruh Pulau Jawa
                        </Text>
                        <TouchableOpacity
                            style={[
                                {
                                    padding: 10,
                                    marginVertical: 10,
                                    backgroundColor: theme.colors.info,
                                    borderRadius: borders.radiusSmall,
                                },
                                theme.shadow,
                            ]}
                            onPress={() => navigation.navigate("Register")}
                        >
                            <Text style={[typography.body, { color: "#fffffe", textAlign: "center" }]}>
                                Daftar Sekarang
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Login")}
                            style={[
                                {
                                    padding: 10,
                                    backgroundColor: theme.colors.primary,
                                    borderRadius: borders.radiusSmall,
                                },
                                theme.shadow,
                            ]}
                        >
                            <Text style={[typography.body, { color: "#fffffe", textAlign: "center" }]}>
                                Sudah Punya Akun? Masuk
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

export default WelcomeScreen;
