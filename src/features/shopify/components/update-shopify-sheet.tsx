import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import ShopifyForm from "./shopify-form"
import { useNewUpdateShopify } from "../hooks/use-update-shopify"
import { useUpdateShopify } from "../api/use-update-shopify"


const UpdateShopifySheet = () => {

    const { isOpen, onClose, data } = useNewUpdateShopify();


    const mutation = useUpdateShopify(data?.id);

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
                <SheetTitle className="text-xl">Update Shopify Id</SheetTitle>
                <SheetDescription>
                    Update a Shopify Product to track real time data
                </SheetDescription>
            </SheetHeader>


            <ShopifyForm
                onSubmit={handleOnSubmit}
                disable={mutation.isPending}
                id={data?.id}
                defaultValues={{
                    name: data?.name,
                    shopifyId: data?.shopifyId
                }}
            />

        </SheetContent>
    </Sheet>

}

export default UpdateShopifySheet