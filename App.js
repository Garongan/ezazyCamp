import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./App/navigation/AppNavigator";
import ThemeContextProvider from "./App/context/ThemeContext";

export default function App() {
    return (
        <ThemeContextProvider>
            <SafeAreaProvider>
                <AppNavigator />
            </SafeAreaProvider>
        </ThemeContextProvider>
    );
}
