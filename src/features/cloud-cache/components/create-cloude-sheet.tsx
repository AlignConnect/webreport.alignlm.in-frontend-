import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { useNewCache } from '../hooks/use-new-cache'
import { useCreateCache } from '../api/use-create-cache';
import Cloudeform from './cloude-form';

const CreateCacheSheet = () => {

    const { isOpen, onClose } = useNewCache();

    const CacheMutation = useCreateCache();


    const handleOnSubmit = (values: any) => {
        CacheMutation.mutate(values, {
            onSuccess: () => {
                onClose();
            }
        })
    }


    return (
        <Sheet open={isOpen} onOpenChange={onClose}>

            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Add Website-Cache</SheetTitle>
                    <SheetDescription>
                        Click save when you're done.
                    </SheetDescription>
                </SheetHeader>

                <Cloudeform
                    onSubmit={handleOnSubmit}
                    disable={false}
                    defaultValues={{
                        name: "",
                        token: ""
                    }}
                />

            </SheetContent>
        </Sheet>
    )
}

export default CreateCacheSheet
