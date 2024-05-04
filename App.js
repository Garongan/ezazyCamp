import * as Splash from "expo-splash-screen";
import * as SystemUI from 'expo-system-ui';
import { useCallback, useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ThemeContextProvider from "./App/context/ThemeContext";
import AppNavigator from "./App/navigation/AppNavigator";

// Keep the splash screen visible while we fetch resources
Splash.preventAutoHideAsync();
export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                // Pre-load fonts, make any API calls you need to do here
                // Artificially delay for two seconds to simulate a slow loading
                // experience. Please remove this if you copy and paste the code!
                console.log('Loading assets...');
                await new Promise((resolve) => setTimeout(resolve, 2000));
            } catch (e) {
                console.warn(e);
            } finally {
                // Tell the application to render
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            // This tells the splash screen to hide immediately! If we call this after
            // `setAppIsReady`, then we may see a blank screen while the app is
            // loading its initial state and rendering its first pixels. So instead,
            // we hide the splash screen once we know the root view has already
            // performed layout.
            await Splash.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    return (
        <ThemeContextProvider>
            <SafeAreaProvider onLayout={onLayoutRootView}>
                <AppNavigator />
            </SafeAreaProvider>
        </ThemeContextProvider>
    );
}
