import { ApiService } from "@/utils/Axios"
import { useAuth } from "@clerk/clerk-react"
import { useQuery } from "@tanstack/react-query"

export const useGetIP = () => {

    const { getToken } = useAuth();

    const query = useQuery({

        queryKey: ["IP"],
        queryFn: async () => {

            const token = await getToken();

            const response = await ApiService.getInstance(token as string).get('/ip-address');
            return response.data
        }
    })

    return query
}