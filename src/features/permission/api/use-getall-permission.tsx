import { ApiService } from "@/utils/Axios"
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query"

export const useGetallPermission = () => {

    const { getToken } = useAuth();

    const query = useQuery({

        queryKey: ["PERMISSION"],
        queryFn: async () => {
            const token = await getToken();

            const response = await ApiService.getInstance(token as string).get("/permission")
            return response.data
        }
    })

    return query

}