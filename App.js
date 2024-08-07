import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ThemeContextProvider from "./App/context/ThemeContext";
import AppNavigator from "./App/navigation/AppNavigator";

export default function App() {
	useEffect(() => {
		SplashScreen.hideAsync();
	}, []);

	return (
		<ThemeContextProvider>
			<SafeAreaProvider>
				<AppNavigator />
			</SafeAreaProvider>
		</ThemeContextProvider>
	);
}
