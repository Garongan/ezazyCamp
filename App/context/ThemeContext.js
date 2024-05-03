import React, { useContext, useState } from "react";
import { Appearance } from "react-native";
import { darkTheme, lightTheme } from "../shared/constant/layout";

const Context = React.createContext({});

function ThemeContextProvider({ children }) {
    const [theme, setTheme] = useState(Appearance.getColorScheme() === "dark" ? darkTheme : lightTheme);

    const switchTheme = () => {
        setTheme(theme === lightTheme ? darkTheme : lightTheme);
    };

    return <Context.Provider value={{ theme, switchTheme }}>{children}</Context.Provider>;
}

export const useTheme = () => useContext(Context);

export default ThemeContextProvider;
