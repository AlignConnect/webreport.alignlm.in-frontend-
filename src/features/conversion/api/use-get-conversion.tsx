import { ApiService } from "@/utils/Axios"
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query"


export const useGetConversion = () => {

    const { getToken } = useAuth();


    const query = useQuery({
        queryKey: ["ALLCONVERSION"],
        queryFn: async () => {

            const token = await getToken();

            const response = await ApiService.getInstance(token as string).get("/conversion", {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            return response.data
        }

    })


    return query

}