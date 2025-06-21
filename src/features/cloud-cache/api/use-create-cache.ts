import { ApiService } from "@/utils/Axios"
import { useAuth } from "@clerk/clerk-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"


type pera = {
    name: string,
    token: string
}

export const useCreateCache = () => {

    const cloudeMutation = useQueryClient();
    const { getToken } = useAuth();


    const mutation = useMutation({
        // mutationKey: ["createimages"],
        mutationFn: async (create: pera) => {

            const token = await getToken();

            const response = await ApiService.getInstance(token as string).post("/cache/create", create)
            return response.data
        },
        onSuccess: (data) => {
            console.log(data)
            toast.success(`Websites Cache Api Added`);
            cloudeMutation.invalidateQueries({ queryKey: ["ALLCACHE"] })
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