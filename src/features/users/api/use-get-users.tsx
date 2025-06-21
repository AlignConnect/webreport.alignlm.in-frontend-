import { ApiService } from "@/utils/Axios"
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query"


export const useGetAllUsers = () => {

    const { getToken } = useAuth();


    const query = useQuery({

        queryKey: ["USERS"],
        queryFn: async () => {
            const token = await getToken();
            const response = await ApiService.getInstance(token as string).get("/users");
            return response.data

        },
        select(data) {
            return data
        },

    })

    return query

}