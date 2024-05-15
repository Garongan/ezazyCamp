import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { Appearance } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import EquipmentDetail from "../screen/Equiptment/EquipmentDetail";
import EquipmentScreen from "../screen/Equiptment/EquipmentScreen";
import HomeScreen from "../screen/Home/HomeScreen";
import LocationDetail from "../screen/Home/LocationDetail";
import LoginScreen from "../screen/Login/LoginScreen";
import EditProfileScreen from "../screen/Profile/EditProfileScreen";
import ProfileScreen from "../screen/Profile/ProfileScreen";
import RegisterScreen from "../screen/Register/RegisterScreen";
import SplashScreen from "../screen/Splash/SplashScreen";
import TermsScreen from "../screen/Terms/TermsScreen";
import WelcomeScreen from "../screen/Welcome/WelcomeScreen";
import CartScreen from "../screen/Cart/CartScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function getTabBarIcon(routeName, { color, focused, size }) {
    let name;
    switch (routeName) {
        case "Home":
            name = focused ? "home" : "home-outline";
            break;
        case "Equipment":
            name = focused ? "compass" : "compass-outline";
            break;
        case "Cart":
            name = focused ? "cart" : "cart-outline";
            break;
        case "Profile":
            name = focused ? "person" : "person-outline";
            break;
    }
    return <Ionicons name={name} size={size} color={color} />;
}

function TabNavigation({ route }) {
    const { theme } = useTheme();
    return (
        <Tab.Navigator
            screenOptions={({ route }) => {
                return {
                    tabBarIcon: (opt) => getTabBarIcon(route.name, opt),
                    headerShown: false,
                    tabBarActiveTintColor: theme.colors.primary,
                    tabBarShowLabel: true,
                    tabBarStyle: {
                        borderTopWidth: 0,
                        backgroundColor: theme.colors.background,
                        height: 60,
                        paddingBottom: 5,
                        alignItems: "center",
                    },
                };
            }}
        >
            <Tab.Screen name="Home">{(props) => <HomeScreen {...props} name={route.params?.name} />}</Tab.Screen>
            <Tab.Screen name="Equipment" component={EquipmentScreen} />
            <Tab.Screen name="Cart" component={CartScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

function StackNavigation() {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Terms" component={TermsScreen} />
                <Stack.Screen name="TabHome" component={TabNavigation} />
                <Stack.Screen name="EquipmentDetail" component={EquipmentDetail} />
                <Stack.Screen name="LocationDetail" component={LocationDetail} />
                <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            </Stack.Navigator>
        </QueryClientProvider>
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
