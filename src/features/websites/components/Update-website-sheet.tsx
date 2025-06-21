import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import AccountForm from "./Account-form"
import { useUpdateWebsite } from "../hooks/use-update-webites"
import { useGetWebsite } from "../api/use-get-website"
import { Loader2 } from "lucide-react"
import { useUpdateWebsites } from "../api/use-update-website"
import { usePermissionQuery } from "@/utils/IPChecker"
import { DELETE_WEBSITES } from "@/utils/permission"


const UpdateWebsiteSheet = () => {

    const { isOpen, onClose, id } = useUpdateWebsite();

    const websiteQuery = useGetWebsite(id)
    const { data: dataPermission } = usePermissionQuery();


    const editMutation = useUpdateWebsites(id);

    const handleOnSubmit = (values: any) => {

        editMutation.mutate(values, {

            onSuccess: () => {
                onClose()
            },
        })
    }


    const defaultValues = websiteQuery?.data?.data ? {
        alias: websiteQuery?.data?.data.alias,
        url: websiteQuery?.data?.data.url,
        token: websiteQuery?.data?.data?.token,
    } : {
        alias: "",
        url: "",
        token: ""
    }


    return <Sheet open={isOpen} onOpenChange={onClose}>

        <SheetContent className="bg-white border border-white space-y-4 px-5">
            <SheetHeader>
                <SheetTitle className="text-xl">Update Website</SheetTitle>
                <SheetDescription>
                    create a new website to track real time data
                </SheetDescription>
            </SheetHeader>

            {
                websiteQuery.isLoading
                    ?
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="text-muted-foreground animate-spin size-7" />
                    </div>
                    : <AccountForm
                        onSubmit={handleOnSubmit}
                        disable={editMutation.isPending}
                        defaultValues={defaultValues}
                        id={id}
                        // deletePermission={true}
                        deletePermission={dataPermission?.includes(DELETE_WEBSITES) ?? false}
                    />
            }


        </SheetContent>
    </Sheet>

}

export default UpdateWebsiteSheet