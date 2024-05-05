import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import SplashScreen from "../Screen/Splash/SplashScreen";
import WelcomeScreen from "../Screen/Welcome/WelcomeScreen";
import { StatusBar } from "react-native";
import LoginScreen from "../Screen/Login/LoginScreen";
import RegisterScreen from "../Screen/Register/RegisterScreen";
import RegisterGuideScreen from "../Screen/Register/RegisterGuideScreen";
import TermsScreen from "../Screen/Terms/TermsScreen";

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
    return (
        <Tab.Navigator
            screenOptions={({ route }) => {
                return {
                    headerShown: false,
                    tabBarIcon: (opt) => getTabBarIcon(route.name, opt),
                };
            }}
        >
            {/* <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Order" component={OrderScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} /> */}
        </Tab.Navigator>
    );
}

function StackNavigation() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* <Stack.Screen name="Splash" component={SplashScreen} /> */}
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            {/* <Stack.Screen name="RegisterGuide" component={RegisterGuideScreen} /> */}
            <Stack.Screen name="Terms" component={TermsScreen} />
            {/* <Stack.Screen name="TabHome" component={TabNavigation} />
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
            <Stack.Screen name="Cart" component={CartScreen} /> */}
        </Stack.Navigator>
    );
}

function AppNavigator() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar />
            <NavigationContainer>
                <StackNavigation />
            </NavigationContainer>
        </SafeAreaView>
    );
}

export default AppNavigator;
