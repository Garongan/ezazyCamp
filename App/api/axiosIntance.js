import axios from "axios";
import useLocalStorage from "../utils/useLocalStorage";

const axiosInstance = axios.create({
    baseURL: "http://10.10.102.33:8085/api",
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
