import { ApiService } from "@/utils/Axios"
import { useAuth } from "@clerk/clerk-react"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"


export const useClearCache = () => {

    const { getToken } = useAuth();


    const mutation = useMutation({
        // mutationKey: ["createimages"],
        mutationFn: async (id: string) => {

            const token = await getToken();

            const response = await ApiService.getInstance(token as string).post(`/cache/${id}/forceclear`)
            return response.data
        },
        onSuccess: (data) => {

            console.log(data)
            toast.success(data?.message);
        },
        onError: (error: any) => {

            console.log(error)
            let err = "Something want wrong"
            if (error instanceof AxiosError) {
                err = error.response?.data.message
            }
            toast.error(err)
        }
    })
    return mutation
}