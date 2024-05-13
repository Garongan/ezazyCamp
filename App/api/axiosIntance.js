import axios from "axios";
import useLocalStorage from "../utils/useLocalStorage";

const axiosInstance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_BASE_API_URL + "/api",
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await useLocalStorage().getData("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
