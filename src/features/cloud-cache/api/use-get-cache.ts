import { ApiService } from "@/utils/Axios"
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query"


export const useGetCache = () => {

    const { getToken } = useAuth();

    const query = useQuery({
        queryKey: ["ALLCACHE"],
        queryFn: async () => {
            const token = await getToken();
            const response = await ApiService.getInstance(token as string).get("/cache", {
                headers: {
                    "Content-Type": "application/json"
                }
            });


            return response.data
        }

    })


    return query

}