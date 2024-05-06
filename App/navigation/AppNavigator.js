import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import SplashScreen from "../Screen/Splash/SplashScreen";
import WelcomeScreen from "../Screen/Welcome/WelcomeScreen";
import { Appearance, StatusBar } from "react-native";
import LoginScreen from "../Screen/Login/LoginScreen";
import RegisterScreen from "../Screen/Register/RegisterScreen";
import RegisterGuideScreen from "../Screen/Register/RegisterGuideScreen";
import TermsScreen from "../Screen/Terms/TermsScreen";
import HomeScreen from "../Screen/Home/HomeScreen";
import OrderScreen from "../Screen/Order/OrderScreen";
import ProfileScreen from "../Screen/Profile/ProfileScreen";
import { useTheme } from "../context/ThemeContext";

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
            {/* <Stack.Screen name="RegisterGuide" component={RegisterGuideScreen} /> */}
            <Stack.Screen name="Terms" component={TermsScreen} />
            <Stack.Screen name="TabHome" component={TabNavigation} />
            {/* <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
            <Stack.Screen name="Cart" component={CartScreen} /> */}
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
