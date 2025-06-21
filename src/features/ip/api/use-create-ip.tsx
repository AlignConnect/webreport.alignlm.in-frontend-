import { ApiService } from "@/utils/Axios"
import { useAuth } from "@clerk/clerk-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"

type IpCreateRequest = {
    name: string,
    ip: string
}

export const useCreateIp = () => {

    const queryClient = useQueryClient();

    const { getToken } = useAuth();


    const mutation = useMutation({
        mutationFn: async (props: IpCreateRequest) => {

            const token = await getToken();

            const response = await ApiService.getInstance(token as string).post("/ip-address/create", props, {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            return response.data
        },
        onSuccess: () => {
            toast.success("new IP created")
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