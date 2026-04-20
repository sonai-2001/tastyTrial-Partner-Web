import { useQuery } from "@tanstack/react-query"
import { RestaurantSelectorKey } from "./key"
import { restaurantSelectorSchema } from "./schema"
import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";

export const useGetAllRestaurants = () => {
    return useQuery({
        queryKey: [RestaurantSelectorKey.GET_MY_RESTAURANTS],
        queryFn: async () => {
            const response = await axiosInstance.get<restaurantSelectorSchema['getAllRes']>(endpoints.resSelector.getMyRestaurants);
            return response.data;
        },
    });
}