import { ApiService } from "@/utils/Axios";
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useDeleteCloudeImage = () => {

    const queryClient = useQueryClient();

    const { getToken } = useAuth();

    const mutation = useMutation({
        mutationFn: async (ids: string[]) => {

            const token = await getToken();

            const response = await ApiService.getInstance(token as string).post(`/cloudeflair`, {
                ids
            },);
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cloudeflair"] })
            toast.success("Image Successfully Deleted !!")
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