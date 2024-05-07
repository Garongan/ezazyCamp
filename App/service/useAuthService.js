import axiosInstance from "../api/axiosIntance";
import useLocalStorage from "../utils/useLocalStorage";

const useAuthService = () => {
    const localStorage = useLocalStorage();
    const login = async (payload) => {
        const { data } = await axiosInstance.post("/auth/login", payload);
        return data;
    };
    const register = async (payload) => {
        const { data } = await axiosInstance.post("/auth/register", payload);
        return data;
    };
    const validateToken = async () => {
        try {
            const { data } = await axiosInstance.get("/auth/validate-token");
            return data.statusCode === 200;
        } catch (error) {
            localStorage.removeData("token");
            return false;
        }
    };
    return {
        login,
        register,
        validateToken,
    };
};

export default useAuthService;
