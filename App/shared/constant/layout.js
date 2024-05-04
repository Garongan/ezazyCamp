import { colors } from "./colors";

export const lightTheme = {
    colors: {
        ...colors,
        background: "#94a1b2",
        text: "#16161a",
    },
    padding: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
};

export const darkTheme = {
    colors: {
        ...colors,
        background: "#16161a",
        text: "#94a1b2",
    },
    padding: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    shadow: {
        shadowColor: "#fff",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
};
