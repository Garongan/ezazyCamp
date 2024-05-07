import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { Appearance } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import SplashScreen from "../screen/Splash/SplashScreen";
import WelcomeScreen from "../screen/Welcome/WelcomeScreen";
import LoginScreen from "../screen/Login/LoginScreen";
import RegisterScreen from "../screen/Register/RegisterScreen";
import TermsScreen from "../screen/Terms/TermsScreen";
import LocationDetail from "../screen/Home/LocationDetail";
import HomeScreen from "../screen/Home/HomeScreen";
import OrderScreen from "../screen/Order/OrderScreen";
import ProfileScreen from "../screen/Profile/ProfileScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function getTabBarIcon(routeName, { color, focused, size }) {
    let name;
    switch (routeName) {
        case "Home":
            name = focused ? "home" : "home-outline";
            break;
        case "Order":
            name = focused ? "receipt" : "receipt-outline";
            break;
        case "Profile":
            name = focused ? "person" : "person-outline";
            break;
    }
    return <Ionicons name={name} size={size} color={color} />;
}

function TabNavigation() {
    const { theme } = useTheme();
    return (
        <Tab.Navigator
            screenOptions={({ route }) => {
                return {
                    tabBarIcon: (opt) => getTabBarIcon(route.name, opt),
                    headerShown: false,
                    tabBarActiveTintColor: theme.colors.primary,
                    tabBarShowLabel: true,
                    tabBarStyle: { backgroundColor: theme.colors.background },
                };
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Order" component={OrderScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

function StackNavigation() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Terms" component={TermsScreen} />
            <Stack.Screen name="TabHome" component={TabNavigation} />
            <Stack.Screen name="LocationDetail" component={LocationDetail} />
        </Stack.Navigator>
    );
}

function AppNavigator() {
    const { theme } = useTheme();
    const mode = Appearance.getColorScheme() === "dark" ? "light" : "dark";
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={theme.colors.background} barStyle={`${mode}-content`} />
            <NavigationContainer>
                <StackNavigation />
            </NavigationContainer>
        </SafeAreaView>
    );
}

export default AppNavigator;
