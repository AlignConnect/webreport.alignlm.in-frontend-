import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { useNewIP } from "../hooks/use-create-ip";
import { useCreateIp } from "../api/use-create-ip";
import Ipform from "./ip-form";


const NewIPSheet = () => {

    const { isOpen, onClose } = useNewIP();

    const mutation = useCreateIp();

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
                <SheetTitle className="text-xl">New IP </SheetTitle>
                <SheetDescription>
                    Create IP for Security
                </SheetDescription>
            </SheetHeader>


            <Ipform
                onSubmit={handleOnSubmit}
                
                disable={mutation.isPending}
                defaultValues={{
                    name: "",
                    ip_address: ""
                }}
            />

        </SheetContent>
    </Sheet>

}

export default NewIPSheet