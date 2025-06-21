import { ApiService } from "@/utils/Axios"
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query"


export const useGetShopify = () => {

    const { getToken } = useAuth();


    const query = useQuery({
        queryKey: ["ALLSHOPIFY"],
        queryFn: async () => {
            const token = await getToken();

            const response = await ApiService.getInstance(token as string).get("/shopify", {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            return response.data
        }

    })


    return query

}