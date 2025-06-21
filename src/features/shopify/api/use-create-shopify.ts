import { ApiService } from "@/utils/Axios"
import { useAuth } from "@clerk/clerk-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"


type pera = {
    name: string,
    shopifyId: string
}

export const useCreateShopify = () => {

    const { getToken } = useAuth();

    const shopifyMutation = useQueryClient();

    const mutation = useMutation({
        // mutationKey: ["createimages"],
        mutationFn: async (create: pera) => {
            const token = await getToken();

            const response = await ApiService.getInstance(token as string).post("/shopify/create", create)
            return response.data
        },
        onSuccess: (data) => {
            console.log(data)
            toast.success(`Shopify Id Added`);
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