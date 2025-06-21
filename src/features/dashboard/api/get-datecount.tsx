import { ApiService } from "@/utils/Axios"
import { useQuery } from "@tanstack/react-query"

type queryParams = {

    fromdate: Date | string
    todate: Date | string

}

export const getDateCount = (params: queryParams) => {


    const query = useQuery({
        queryKey: ["DATECOUNT", params.fromdate, params.todate],
        queryFn: async () => {

            const response = await ApiService.getInstance().get("/dashboard/over-view", {
                params
            });

            return response.data

        }
    })

    return query
}