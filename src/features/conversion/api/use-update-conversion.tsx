import { ApiService } from "@/utils/Axios"
import { useAuth } from "@clerk/clerk-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"


type pera = {
    websites: string,
    exo: boolean,
    ts: boolean
}

export const useUpdateConversion = (id?: string) => {

    const conversionMutation = useQueryClient();

    const { getToken } = useAuth();

    const mutation = useMutation({
        mutationFn: async (update: pera) => {

            const token = await getToken();

            const response = await ApiService.getInstance(token as string).put(`/conversion/${id}`, {
                websites: update.websites,
                exo: !!update.exo,
                ts: !!update.ts
            })
            return response.data
        },
        onSuccess: (data) => {
            console.log(data)
            toast.success(`Websites Conversion Updated !!`);
            conversionMutation.invalidateQueries({ queryKey: ["ALLCONVERSION"] })
        },
        onError: (error: any) => {
            let err = "Something want wrong"
            if (error instanceof AxiosError) {
                err = error.response?.data.message ?? "Internal Server Error"
            }
            toast.error(err)
        }
    })
    return mutation
}