import { ApiService } from "@/utils/Axios";
import { useAuth } from "@clerk/clerk-react";
import { useInfiniteQuery, } from "@tanstack/react-query"



export const useGetCloudflairImage = () => {

    const { getToken } = useAuth();

    const query = useInfiniteQuery({

        queryKey: ["cloudeflair"],

        queryFn: async ({ pageParam }) => {

            const token = await getToken();

            const response = await ApiService.getInstance(token as string).get(`/cloudeflair?per_page=50&continuation_token=${pageParam}`);

            console.log(response.data)
            return response.data
        },

        initialPageParam: "",
        getNextPageParam: (lastPage) => {
            return lastPage.result.continuation_token
        },

        select(data) {
            return data.pages
        },
        refetchOnWindowFocus: false // Prevents refetch when window regains focus

    })

    return query;

}
