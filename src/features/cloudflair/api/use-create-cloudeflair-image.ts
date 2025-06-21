import { ApiService } from "@/utils/Axios"
import { useAuth } from "@clerk/clerk-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"

export const useCreateCloudeImage = () => {

    const cloudeMutation = useQueryClient();
    const { getToken } = useAuth();

    const mutation = useMutation({
        mutationKey: ["createimages"],
        mutationFn: async (img: File[]) => {

            const token = await getToken();

            const formdata = new FormData();

            img.forEach((file) => {
                formdata.append(`img`, file);
            });



            const response = await ApiService.getInstance(token as string).post("/cloudeflair/create", formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            return response.data
        },
        onSuccess: (data) => {
            console.log(data)
            toast.success(`Image Uploaded ${data?.message}`);
            cloudeMutation.invalidateQueries({ queryKey: ["cloudeflair"] })


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