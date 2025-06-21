import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import Ipform from "./ip-form"
import { useUpdateIP } from "../hooks/use-update-ip";
import { useUpdateIp } from "../api/use-update-ip";


const UpdateIpSheet = () => {

    const { isOpen, onClose, data } = useUpdateIP();


    const editMutation = useUpdateIp(data?.id);

    const handleOnSubmit = (values: any) => {

        editMutation.mutate(values, {

            onSuccess: () => {
                onClose()
            },
        })
    }




    return <Sheet open={isOpen} onOpenChange={onClose}>

        <SheetContent className="bg-white border border-white space-y-4 px-5">
            <SheetHeader>
                <SheetTitle className="text-xl">Update IP</SheetTitle>
                <SheetDescription>
                    UPdate IP for Security
                </SheetDescription>
            </SheetHeader>


            <Ipform
                onSubmit={handleOnSubmit}
                disable={editMutation.isPending}
                defaultValues={{
                    name: data?.name,
                    ip_address: data?.ip_address
                }}
                id={data?.id}
            />






            {/* <SheetFooter>
                <SheetClose asChild>
                    <Button type="submit">Save changes</Button>
                </SheetClose>
            </SheetFooter> */}
        </SheetContent>
    </Sheet>

}

export default UpdateIpSheet