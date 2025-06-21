import { Button } from '../ui/button'
import { Trash2 } from 'lucide-react'
import { useConfirm } from '@/hooks/use-confirm';
import { useRevokeInvitations } from '@/features/invitations/api/use-delete-invitations';

const Actions = ({ row }: { row: Record<string, any> }) => {


    console.log(row)

    const [ConfirmDialog, confirm] = useConfirm("Revoke", "Are you sure want to Revoke this Invitation. if you Revoke this Invitation, it will not longer signUp");

    const revokeMutation = useRevokeInvitations();

    const handleConfirmRevokeDialog = async () => {

        const ok = await confirm();

        if (ok) {
            revokeMutation.mutate(row?.id)
        }

    }

    return (
        <div>

            <Button className='size-7 text-red-700 cursor-pointer' variant={"ghost"} onClick={handleConfirmRevokeDialog}>
                <Trash2 />
            </Button>


            <ConfirmDialog />


        </div>
    )
}

export default Actions
