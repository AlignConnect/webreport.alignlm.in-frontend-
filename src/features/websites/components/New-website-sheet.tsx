import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { useNewWebsite } from "@/features/websites/hooks/use-new-webites"
import AccountForm from "./Account-form"
import { useCreateWebsites } from "@/features/websites/api/use-create-website"


const NewWebsiteSheet = () => {

    const { isOpen, onClose } = useNewWebsite();

    const mutation = useCreateWebsites();

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
                <SheetTitle className="text-xl">New Website</SheetTitle>
                <SheetDescription>
                    create a new website to track real time data
                </SheetDescription>
            </SheetHeader>


            <AccountForm
                onSubmit={handleOnSubmit}
                disable={mutation.isPending}
                defaultValues={{
                    alias: "",
                    url: "",
                    token: ""
                }}
                deletePermission={false}
            />


        </SheetContent>
    </Sheet>

}

export default NewWebsiteSheet