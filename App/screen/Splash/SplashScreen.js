import { useEffect, useMemo } from "react";
import { Image, StyleSheet, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import useLocalStorage from "../../utils/useLocalStorage";
import useAuthService from "../../service/useAuthService";

function SplashScreen({ navigation }) {
    const { theme } = useTheme();
    const localStorage = useLocalStorage();
    const service = useAuthService();
    const styles = useMemo(
        () =>
            StyleSheet.create({
                container: {
                    flex: 1,
                    backgroundColor: theme.colors.background,
                    justifyContent: "center",
                    alignItems: "center",
                },
            }),
        []
    );

    useEffect(() => {
        const validateToken = async () => {
            if (await localStorage.getData("token")) {
                if (await service.validateToken()) {
                    navigation.replace("TabHome");
                } else {
                    navigation.navigate("Welcome");
                }
            } else {
                setTimeout(() => {
                    navigation.navigate("Welcome");
                }, 1000);
            }
        };
        validateToken();
    }, []);

    return (
        <View style={[styles.container, theme.padding]}>
            <Image
                style={{ alignContent: "center", objectFit: "contain", width: 200, height: 200 }}
                source={require("../../../assets/eazy-camp.png")}
            />
        </View>
    );
    ``;
}

export default SplashScreen;
