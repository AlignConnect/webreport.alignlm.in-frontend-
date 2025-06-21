import { ApiService } from "@/utils/Axios"
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query"

export const useGetAllInvitation = () => {

    const { getToken } = useAuth();

    const query = useQuery({
        queryKey: ["INVITATION"],
        queryFn: async () => {
            const token = await getToken();
            const response = await ApiService.getInstance(token as string).get('/invitations');
            return response.data
        }

    })

    return query
}