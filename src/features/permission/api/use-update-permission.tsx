import { ApiService } from "@/utils/Axios"
import { useAuth } from "@clerk/clerk-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

type queryProps = {
    userId: string,
    permission: string[]
}

export const useUpdatePermission = () => {

    const queryClient = useQueryClient();
    const { getToken } = useAuth();

    const query = useMutation({
        mutationFn: async ({ userId, permission }: queryProps) => {
            const token = await getToken();

            const response = await ApiService.getInstance(token as string).post(`/permission/update`, {
                permission,
                userId
            })
            return response.data
        },
        onSuccess: (_, variable) => {
            toast.success("User Permission Updated")
            queryClient.invalidateQueries({
                queryKey: ["PERMISSION", variable.userId],
            })
        },
        onError: () => {
            toast.error("Some Error Occured , Call You Developer")
        }

    })

    return query

}