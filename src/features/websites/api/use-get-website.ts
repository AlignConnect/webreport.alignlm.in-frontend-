import { ApiService } from "@/utils/Axios";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";



export const useGetWebsite = (id?: string) => {

    const { getToken } = useAuth();

    const query = useQuery({
        queryKey: ["websites", { id }],
        enabled: !!id,
        queryFn: async () => {
            const token = await getToken();


            const response = await ApiService.getInstance(token as string).get(`/websites/${id}`);
            return response.data
        }

    })

    return query

}


