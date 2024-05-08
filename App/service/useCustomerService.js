import axiosInstance from "../api/axiosIntance";

const useCustomerService = () => {
    const getByUsername = async (username) => {
        const { data } = await axiosInstance.get(`/customers/username/${username}`);
        return data;
    };
    const updateById = async (payload) => {
        const { data } = await axiosInstance.put(`/customers`, payload);
        return data;
    };
    return {
        getByUsername,
        updateById,
    };
};

export default useCustomerService;
