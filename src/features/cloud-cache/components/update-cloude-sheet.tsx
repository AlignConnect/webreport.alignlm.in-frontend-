import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import Cloudeform from './cloude-form';
import { useNewUpdateCache } from '../hooks/use-update-cache';
import { useUpdateCache } from '../api/use-update-cache';

const UpdateCacheSheet = () => {

    const { isOpen, onClose, data } = useNewUpdateCache();

    const CacheMutation = useUpdateCache(data?.id);

    console.log(data)

    const handleOnSubmit = (values: any) => {
        CacheMutation.mutate(values, {
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
                    <SheetTitle>Edit Website-Cache</SheetTitle>
                    <SheetDescription>
                        Click save when you're done.
                    </SheetDescription>
                </SheetHeader>

                <Cloudeform
                    onSubmit={handleOnSubmit}
                    disable={false}
                    id={data?.id}
                    defaultValues={{
                        name: data?.name,
                        token: data?.token
                    }}
                />

            </SheetContent>
        </Sheet>
    )
}

export default UpdateCacheSheet
