import axiosInstance from "../api/axiosIntance";

const useEquipmentService = () => {
    const getAll = async (query) => {
        const { data } = await axiosInstance.get("/equipments", { params: query });
        return data;
    };
    return { getAll };
};

export default useEquipmentService;
