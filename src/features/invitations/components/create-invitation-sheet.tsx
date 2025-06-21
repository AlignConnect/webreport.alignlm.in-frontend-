import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { useCreateInvitationHook } from "../hooks/use-create-invitation";
import { useCreateInvitation } from "../api/use-create-invitations";
import Invitationsform from "./invitations-form";


const NewInvitationSheet = () => {

    const { isOpen, onClose } = useCreateInvitationHook();




    const mutation = useCreateInvitation();

    const handleOnSubmit = (values: any) => {


        mutation.mutate(values, {
            onSuccess: () => {
                onClose()
            },
        })


    }



    return <Sheet open={isOpen} onOpenChange={onClose}>

        <SheetContent className="bg-white border border-white space-y-4 px-5">
            <SheetHeader>
                <SheetTitle className="text-xl">New Invitation </SheetTitle>
                <SheetDescription>
                    invite user for check real time data
                </SheetDescription>
            </SheetHeader>


            <Invitationsform
                onSubmit={handleOnSubmit}
                disable={mutation.isPending}
                defaultValues={{
                    email_address: ""
                }}
            />

        </SheetContent>
    </Sheet>

}

export default NewInvitationSheet