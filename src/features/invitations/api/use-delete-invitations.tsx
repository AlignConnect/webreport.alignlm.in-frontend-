import { ApiService } from "@/utils/Axios"
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useRevokeInvitations = () => {

    const { getToken } = useAuth();

    const queryClient = useQueryClient();

    const mutation = useMutation({

        mutationFn: async (id: string) => {

            const token = await getToken();

            const response = ApiService.getInstance(token as string).post(`/invitations/${id}/revoke`);
            return (await response).data;
        },
        onSuccess: (data) => {

            console.log(data)

            toast.success("Invitation Deleted It will no longer access this software")
            queryClient.invalidateQueries({ queryKey: ["INVITATION"] })
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