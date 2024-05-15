import axiosInstance from "../api/axiosIntance";

const useGetGuideService = () => {
    const getGuideByLocationId = async (locationName) => {
        const { data } = await axiosInstance.get("/guides", { params: locationName });
        return data;
    };
    return {
        getGuideByLocationId,
    };
};

export default useGetGuideService;
