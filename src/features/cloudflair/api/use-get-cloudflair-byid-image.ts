
import { ApiService } from "@/utils/Axios";
import { useAuth } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner";



export const useGetCloudflairImageById = () => {

    const { getToken } = useAuth();

    const query = useMutation({
        // mutationKey: ["cloudeflair"],
        mutationFn: async (imgId: string) => {

            const token = await getToken();

            const response = await ApiService.getInstance(token as string).get(`/cloudeflair/byid/${imgId}`);
            return response.data
        },
        onError: () => {
            toast.error("Image is not found")
        }
    })
    return query;
}
