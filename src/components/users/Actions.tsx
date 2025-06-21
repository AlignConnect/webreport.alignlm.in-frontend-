import { Button } from '../ui/button'
import { Trash2 } from 'lucide-react'
import { useConfirm } from '@/hooks/use-confirm';
import { useDeleteUser } from '@/features/users/api/use-delete-users';

const Actions = ({ row }: { row: Record<string, any> }) => {

    const [ConfirmDialog, confirm] = useConfirm("Permenent Delete", "Are you sure want to delete this user. if you delete this user, it will not longer signin ");

    const deleteMutation = useDeleteUser();

    const handleConfirmDeleteDialog = async () => {

        const ok = await confirm();

        if (ok) {
            deleteMutation.mutate(row?.id)
        }

    }

    return (
        <div>

            <Button className='size-7 text-red-700 cursor-pointer' variant={"ghost"} onClick={handleConfirmDeleteDialog}>
                <Trash2 />
            </Button>


            <ConfirmDialog />


        </div>
    )
}

export default Actions
