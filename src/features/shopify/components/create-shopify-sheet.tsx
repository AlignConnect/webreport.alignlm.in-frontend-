import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { useNewShopify } from "../hooks/use-new-shopify"
import ShopifyForm from "./shopify-form"
import { useCreateShopify } from "../api/use-create-shopify"


const NewShopifySheet = () => {

    const { isOpen, onClose } = useNewShopify();


    const mutation = useCreateShopify();

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
                <SheetTitle className="text-xl">New Shopify Id</SheetTitle>
                <SheetDescription>
                    create a new Shopify Product to track real time data
                </SheetDescription>
            </SheetHeader>


            <ShopifyForm
                onSubmit={handleOnSubmit}
                disable={mutation.isPending}
                defaultValues={{
                    name: "",
                    shopifyId: ""
                }}
            />

        </SheetContent>
    </Sheet>

}

export default NewShopifySheet