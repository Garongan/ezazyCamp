import axiosInstance from "../api/axiosIntance";

const useLocationService = () => {
    const getAll = async (query) => {
        const { data } = await axiosInstance.get("/locations", { params: query });
        return data;
    };
    return {
        getAll,
    };
};

export default useLocationService;
