import axios from "axios";
import axiosInstance from "../api/axiosIntance";
import useLocalStorage from "../utils/useLocalStorage";

const useOrderService = () => {
    const createNewOrder = async (payload) => {
        const token = await useLocalStorage().getData("token");
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/order`, payload, config);
        return data;
    };
    return {
        createNewOrder,
    };
};

export default useOrderService;
