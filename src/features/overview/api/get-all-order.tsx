import { ApiService } from "@/utils/Axios"
import { useAuth } from "@clerk/clerk-react"
import { useQuery } from "@tanstack/react-query"
import { endOfDay, startOfDay } from "date-fns"

type responseOrder = {
    source: string,
    total_orders: number
}

export const getAllOrders = (queryParams: { from: Date, to: Date }) => {


    const { getToken } = useAuth();

    const query = useQuery({

        queryKey: ["OVERVIEW", queryParams.from, queryParams.to],
        placeholderData: (prev) => prev,
        enabled: !!queryParams.to,
        queryFn: async () => {

            const token = await getToken();

            const response = await ApiService.getInstance(token as string).get(`/over-view/order-report`, {
                params: {
                    fromdate: startOfDay(queryParams.from).toISOString(),
                    todate: endOfDay(queryParams.to).toISOString()
                }
            });
            return response.data
        },
        select: (data) => {

            // const filterData = data?.data
            const filterData = data?.response.sort((a: responseOrder, b: responseOrder) => b.total_orders - a.total_orders)

            console.log(filterData, "dsfsdfsdf")

            return {
                response: filterData,
                count: data?.count
            }


        }

    })
    return query

} 