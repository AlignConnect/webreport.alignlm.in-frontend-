import { ApiService } from "@/utils/Axios"
import { useAuth } from "@clerk/clerk-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"


export const useDeleteShopify = () => {

    const shopifyMutation = useQueryClient();
    const { getToken } = useAuth();

    const mutation = useMutation({

        mutationFn: async (id?: string) => {

            const token = await getToken();

            const response = await ApiService.getInstance(token as string).delete(`/shopify/${id}`)
            return response.data
        },
        onSuccess: (data) => {
            console.log(data)
            toast.success(`Shopify Cache Api Deleted`);
            shopifyMutation.invalidateQueries({ queryKey: ["ALLSHOPIFY"] })
        },
        onError: (error: any) => {
            let err = "Something want wrong"
            if (error instanceof AxiosError) {
                err = error.response?.data.message
            }
            toast.error(err)
        }
    })
    return mutation
}