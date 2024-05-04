import { useEffect, useMemo } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { typography } from "../../shared/constant/typography";

function SplashScreen({ navigation }) {
    const { theme } = useTheme();
    const styles = useMemo(
        () =>
            StyleSheet.create({
                container: {
                    position: "absolute",
                    bottom: 50,
                    zIndex: 1,
                    width: "100%"
                },
            }),
        []
    );

    useEffect(() => {
        setTimeout(() => {
            navigation.replace("Welcome");
        }, 2000);
    });

    return (
        <View style={[{ flex: 1 }]}>
            <Image
                style={{ zIndex: 0, objectFit: "cover", width: "auto", height: "100%" }}
                source={require("../../../assets/splash.jpg")}
            />
            <View style={[styles.container, theme.padding]}>
                <Image
                    style={{ alignContent: 'center', objectFit: "contain", width: "auto", height: 300 }}
                    source={require("../../../assets/eazy-camp.png")}
                />
                <Text style={[typography.header, { color: theme.colors.primary }]}>Eazy Camp</Text>
                <Text style={[typography.header, { color: theme.colors.primary }]}>Sewa Sekarang, Ndaki Kemudian</Text>
            </View>
        </View>
    );
    ``;
}

export default SplashScreen;
