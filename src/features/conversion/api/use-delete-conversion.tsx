import { ApiService } from "@/utils/Axios"
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios";
import { toast } from "sonner"

export const useDeleteConversion = () => {


    const queryClient = useQueryClient();

    const { getToken } = useAuth();


    const conversionMutation = useMutation({
        mutationFn: async (id?: string) => {

            const token = await getToken();

            const response = await ApiService.getInstance(token as string).delete(`/conversion/${id}`, {

            })
            return response.data
        },
        onSuccess() {
            toast.success("Conversion Deleted")
            queryClient.invalidateQueries({ queryKey: ["ALLCONVERSION"] })
        },
        onError: (error: any) => {
            let err = "Something want wrong"

            if (error instanceof AxiosError) {
                err = error.response?.data.message ?? "Internal Server Error"
            }
            toast.error(err)
        }
    })

    return conversionMutation

}