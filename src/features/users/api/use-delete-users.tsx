import { ApiService } from "@/utils/Axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";
import { useAuth } from "@clerk/clerk-react"


export const useDeleteUser = () => {


    const queryClient = useQueryClient();
    const { getToken } = useAuth();


    const mutation = useMutation({

        mutationFn: async (id: string) => {
            const token = await getToken();

            const response = ApiService.getInstance(token as string).delete(`/users/${id}`);
            return (await response).data;
        },
        onSuccess: () => {
            toast.success("User Deleted It will no longer access this software")
            queryClient.invalidateQueries({ queryKey: ["USERS"] })
        },
        onError() {
            toast.error("Something want wrong please contect developer")
        },

    })


    return mutation



}