import { ApiService } from "@/utils/Axios"
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useDeleteIP = () => {


    const queryClient = useQueryClient();

    const { getToken } = useAuth();

    const mutation = useMutation({

        mutationFn: async (id: string) => {
            const token = await getToken();

            const response = ApiService.getInstance(token as string).delete(`/ip-address/${id}`);
            return (await response).data;
        },
        onSuccess: (data) => {

            console.log(data)

            toast.success("IP Deleted It will no longer access this software")
            queryClient.invalidateQueries({ queryKey: ["IP"] })
        },
        onError(error) {

            let err = "Something want wrong"

            if (error instanceof AxiosError) {
                err = error.response?.data.message
            }

            toast.error(err)
        },

    })


    return mutation



}