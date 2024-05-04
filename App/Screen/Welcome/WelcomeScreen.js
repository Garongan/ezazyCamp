import React from "react";
import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { typography } from "../../shared/constant/typography";
import { borders } from "../../shared/constant/borders";

function WelcomeScreen({ navigation }) {
    const { theme } = useTheme();
    return (
        <View style={{ flex: 1 }}>
            <Image
                style={{
                    zIndex: 0,
                    objectFit: "cover",
                    width: "auto",
                    height: "100%",
                }}
                source={require("../../../assets/welcome.jpg")}
            />
            <View
                style={[
                    {
                        zIndex: 10,
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        paddingHorizontal: 20,
                    },
                    theme.padding,
                ]}
            >
                <View style={{ flex: 1, justifyContent: "flex-end", paddingBottom: 50 }}>
                    <Text style={[typography.header, { color: theme.colors.primary }]}>
                        Aku Sudah Disini, Kamu Kapan?
                    </Text>
                    <Text style={[typography.body, { color: theme.colors.primary, paddingVertical: 10 }]}>
                        Ayo Naik Gunung Agar Melihat Orang Seperti Semut, Sewa Keperluan Camping Disini Sekarang, Dengan
                        Cakupan Seluruh Pulau Jawa
                    </Text>
                    <TouchableOpacity
                        style={[
                            {
                                padding: 10,
                                marginVertical: 10,
                                backgroundColor: theme.colors.text,
                                borderRadius: borders.radiusSmall,
                            },
                            theme.shadow,
                        ]}
                        onPress={() => navigation.navigate("Register")}
                    >
                        <Text style={[typography.body, { color: theme.colors.primary, textAlign: 'center' }]}>Daftar Sekarang</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Login")}
                        style={[
                            { padding: 10, backgroundColor: theme.colors.secondary, borderRadius: borders.radiusSmall },
                            theme.shadow,
                        ]}
                    >
                        <Text style={[typography.body, { color: theme.colors.primary, textAlign: 'center' }]}>Sudah Punya Akun? Masuk</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default WelcomeScreen;
