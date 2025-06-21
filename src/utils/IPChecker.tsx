import { useQuery } from "@tanstack/react-query";
import { ApiService } from "./Axios";
import { useAuth } from "@clerk/clerk-react";


export const usePermissionQuery = () => {

    const { getToken } = useAuth();


    const query = useQuery({
        queryKey: ['success'], // Add a unique query key
        queryFn: async () => {

            const token = await getToken();


            const response = await ApiService.getInstance(token as string).get('/web/success-user')
            return response.data
        },
        select: (data) => {
            return data?.data?.permission
        }
    })

    return query
}