import axiosInstance from "../api/axiosIntance";

const useOrderService = () => {
    const createNewOrder = async (payload) => {
        const { data } = await axiosInstance.post("/orders", payload);
        return data;
    };
    return {
        createNewOrder,
    };
};

export default useOrderService;
