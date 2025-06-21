import { ApiService } from "@/utils/Axios";
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";



export const useUpdateWebsites = (id?: string) => {

    const queryClient = useQueryClient();
    const { getToken } = useAuth();


    const mutation = useMutation({
        // mutationKey: ["websites"],
        mutationFn: async (update) => {
            const token = await getToken();
            const response = await ApiService.getInstance(token as string).put(`/websites/${id}`, update);
            return response.data
        },
        onSuccess: () => {
            toast.success("Website created");
            queryClient.invalidateQueries({ queryKey: ["websites"] })
        },
        onError: (error: any) => {
            const err = error.response.data.message || "Internal Server Error"
            toast.error(err)
        }
    })

    return mutation

}