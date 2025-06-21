import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { useNewUpdateConversion } from '../hooks/use-update-conversion';
import { useUpdateConversion } from '../api/use-update-conversion';
import Conversionform from './conversion-form';

const UpdateConversionSheet = () => {

    const { isOpen, onClose, data } = useNewUpdateConversion();


    console.log(data)

    const ConversionMutation = useUpdateConversion(data?.id);

    console.log(data)

    const handleOnSubmit = (values: any) => {
        ConversionMutation.mutate(values, {
            onSuccess: () => {
                onClose();
            }
        })
    }

    console.log(data?.row)

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>

            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edit Website-Conversion</SheetTitle>
                    <SheetDescription>
                        Click save when you're done.
                    </SheetDescription>
                </SheetHeader>

                <Conversionform
                    onSubmit={handleOnSubmit}
                    disable={false}
                    id={data?.id}
                    defaultValues={{
                        websites: data?.websites,
                        exo: !!data?.exo,
                        ts: !!data?.ts
                    }}
                />

            </SheetContent>
        </Sheet>
    )
}

export default UpdateConversionSheet
