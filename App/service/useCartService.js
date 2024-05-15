import axiosInstance from "../api/axiosIntance";

const useCartService = () => {
    const getAll = async (id) => {
        const { data } = await axiosInstance.get(`/customers/${id}/carts`);
        return data;
    };
    const updateQty = async (id, payload) => {
        const { data } = await axiosInstance.put(`/customers/${id}/carts`, payload);
        return data;
    }
    return {
        getAll,
        updateQty
    };
};

export default useCartService;
