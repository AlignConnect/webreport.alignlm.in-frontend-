import { ApiService } from "@/utils/Axios"
import { useAuth } from "@clerk/clerk-react"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { MailCheck } from "lucide-react"
import { toast } from "sonner"


type invitations = {

    email_address: string,
    ignore_existing: false,
    expires_in_days: 1,
    template_slug: "invitation"

}


export const useCreateInvitation = () => {

    const { getToken } = useAuth();

    // const queryClient = useQueryClient()

    const invitationMutation = useMutation({

        // mutationKey: [""],
        mutationFn: async (invitations: invitations) => {

            const token = await getToken();

            const response = await ApiService.getInstance(token as string).post("/invitations/create", {

                email_address: invitations.email_address,
                redirect_url: "http://localhost:5173"

            }, {}
            )
            return response.data
        },
        onSuccess: () => {
            toast("User Invited", {
                description: "if gmail is wrong , you can revoke from invitation",
                duration: 5000,
                action: <MailCheck />
            })
        },
        onError(error) {

            let err = "Something want wrong"

            if (error instanceof AxiosError) {
                err = error.response?.data.message
            }

            toast.error(err)
        },

    })

    return invitationMutation
}