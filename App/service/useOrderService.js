import axiosInstance from "../api/axiosIntance";
import useLocalStorage from "../utils/useLocalStorage";

const useOrderService = () => {
    const createNewOrder = async (payload) => {
        const { data } = await axiosInstance.post("/orders", payload, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return data;
    };
    const getOrders = async () => {
        const user = await useLocalStorage().getData("user");
        const id = JSON.parse(user).id;
        const { data } = await axiosInstance.get(`/orders/customers/${id}`);
        return data;
    };
    return {
        createNewOrder,
        getOrders,
    };
};

export default useOrderService;
