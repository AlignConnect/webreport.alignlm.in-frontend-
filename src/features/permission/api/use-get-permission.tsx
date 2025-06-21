import { ApiService } from "@/utils/Axios"
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query"

export const useGetPermission = (id: string) => {

    const { getToken } = useAuth();


    const query = useQuery({

        queryKey: ["PERMISSION", id],
        queryFn: async () => {

            const token = await getToken();

            const response = await ApiService.getInstance(token as string).get(`/permission/${id}`,)
            return response.data
        },
        enabled: !!id
    })

    return query

}