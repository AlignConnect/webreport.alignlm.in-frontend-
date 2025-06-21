import { ApiService } from "@/utils/Axios"
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios";
import { toast } from "sonner"

export const useToggleConversionMutation = () => {

    const { getToken } = useAuth();


    const queryClient = useQueryClient();

    const conversionMutation = useMutation({
        mutationFn: async ({ id, adsType }: { id: string, adsType: string }) => {

            const token = await getToken();

            const response = await ApiService.getInstance(token as string).get(`/conversion/${id}/${adsType}`)
            return response.data
        },
        onSuccess(_, variables) {
            toast.success(`${variables.adsType} conversion changed !!`)
            queryClient.invalidateQueries({ queryKey: ["ALLCONVERSION"] })
        },
        onError(error) {
            let err = "Something want wrong"
            if (error instanceof AxiosError) {
                err = error.response?.data.message ?? "Internal Server Error"
            }
            toast.error(err)
        },
    })

    return conversionMutation
}