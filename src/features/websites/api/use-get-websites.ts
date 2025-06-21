import { ApiService } from "@/utils/Axios";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";



export const useGetWebsites = () => {

    const { getToken } = useAuth();

    const query = useQuery({
        queryKey: ["websites"],
        queryFn: async () => {
            const token = await getToken();
            const response = await ApiService.getInstance(token as string).get('/websites');
            return response.data
        },

    })

    return query

}