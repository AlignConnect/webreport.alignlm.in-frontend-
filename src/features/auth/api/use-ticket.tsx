import { ApiService } from "@/utils/Axios";
import { useQuery } from "@tanstack/react-query";

export const useValidTicket = (ticket: string) => {

    const query = useQuery({
        queryKey: [ticket],
        queryFn: async () => {
            const response = await ApiService.getInstance().get("/auth/api/webhook/ticket", {
                params: {
                    ticket
                }
            })
            return response.data
        },
        enabled: !!ticket, // Don't run the query if ticket is null
        select: (data) => {

            return data?.data

        }

    })

    return query

}