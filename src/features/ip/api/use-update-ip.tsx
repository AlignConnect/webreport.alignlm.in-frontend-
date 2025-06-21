import { ApiService } from "@/utils/Axios"
import { useAuth } from "@clerk/clerk-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"

type IpUpdateRequest = {
    name: string,
    ip: string
}

export const useUpdateIp = (id?: string) => {

    const { getToken } = useAuth();

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (props: IpUpdateRequest) => {

            const token = await getToken();

            const response = await ApiService.getInstance(token as string).put(`/ip-address/${id}`, props, {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            return response.data
        },
        onSuccess: () => {
            toast.success("new IP updated")
            queryClient.invalidateQueries({ queryKey: ["IP"] })
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