import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { useNewConversion } from "../hooks/use-new-conversion";
import { useCreateConversion } from "../api/use-create-conversion";
import Conversionform from "./conversion-form";


const NewConversionSheet = () => {

    const { isOpen, onClose } = useNewConversion();


    const mutation = useCreateConversion();

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
                <SheetTitle className="text-xl">New Conversion </SheetTitle>
                <SheetDescription>
                    create a new Conversion
                </SheetDescription>
            </SheetHeader>


            <Conversionform
                onSubmit={handleOnSubmit}
                disable={mutation.isPending}
                defaultValues={{

                    websites: ""
                }}
            />

        </SheetContent>
    </Sheet>

}

export default NewConversionSheet