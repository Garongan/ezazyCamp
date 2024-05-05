import { colors } from "./colors";

export const lightTheme = {
    colors: {
        ...colors,
        background: "#fff8ee",
        text: "#2a2a2a",
    },
    padding: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    shadow: {
        shadowColor: "#2a2a2a",
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
        background: "#2a2a2a",
        text: "#fff8ee",
    },
    padding: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    shadow: {
        shadowColor: "#fff8ee",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
};
