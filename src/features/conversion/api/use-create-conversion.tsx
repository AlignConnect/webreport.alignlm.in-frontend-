import { ApiService } from "@/utils/Axios"
import { useAuth } from "@clerk/clerk-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"


type pera = {
    websites: string
}

export const useCreateConversion = () => {

    const { getToken } = useAuth();

    const conversionMutation = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (create: pera) => {
            const token = await getToken();
            const response = await ApiService.getInstance(token as string).post("/conversion/create", create)
            return response.data
        },
        onSuccess: (data) => {
            console.log(data)
            toast.success(`Conversion Website Added`);
            conversionMutation.invalidateQueries({ queryKey: ["ALLCONVERSION"] })
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