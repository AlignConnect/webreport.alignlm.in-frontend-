import { ApiService } from "@/utils/Axios"
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios";
import { toast } from "sonner";


export const useFetchShopify = (id?: string) => {


    const queryClient = useQueryClient()
    const { getToken } = useAuth();


    const query = useMutation({
        mutationKey: [{ id }],
        mutationFn: async () => {
            const token = await getToken();

            const response = await ApiService.getInstance(token as string).get(`/shopify/${id}/fetchshopify`, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            return response.data
        },
        onSuccess: () => {
            toast.success("Data Upated Successfully");
            queryClient.invalidateQueries({ queryKey: ["ALLSHOPIFY"] })
        },
        onError: (error: any) => {
            let err = "Something want wrong"
            if (error instanceof AxiosError) {
                err = error.response?.data.message
            }
            toast.error(err)
        }

    })

    return query

}