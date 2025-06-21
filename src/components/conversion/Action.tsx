import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from '../ui/button'
import { Edit2, MoreHorizontal, Trash2 } from 'lucide-react'
import { useNewUpdateConversion } from '@/features/conversion/hooks/use-update-conversion'
import { useDeleteConversion } from '@/features/conversion/api/use-delete-conversion'
import { DELETE_EXO_TS, UPDATE_EXO_TS } from "@/utils/permission"
import { usePermissionQuery } from "@/utils/IPChecker"

const Action = ({ row }: { row: Record<string, any> }) => {

    console.log(row)
    const { onOpen } = useNewUpdateConversion();

    const deleteMutation = useDeleteConversion();

    const { data } = usePermissionQuery();


    const onEdit = (data: { id: string, websites: string, exo: boolean, ts: boolean }) => {
        onOpen(data)
    }

    const onDelete = () => {
        deleteMutation.mutate(row?.id)
    }



    return (
        <div className="text-center">
            <DropdownMenu>

                {
                    [UPDATE_EXO_TS, DELETE_EXO_TS].some(p => data?.includes(p)) && <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                }


                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    {
                        data?.includes(UPDATE_EXO_TS) && <DropdownMenuItem onClick={() => onEdit({
                            id: row?.id,
                            websites: row?.websites,
                            exo: row?.exo,
                            ts: row?.ts

                        })}>
                            <Edit2 className="size-4 mr-2" />
                            Edit
                        </DropdownMenuItem>
                    }


                    {
                        data?.includes(DELETE_EXO_TS) &&
                        <DropdownMenuItem onClick={onDelete}>
                            <Trash2 className="size-4 mr-2" />
                            Delete
                        </DropdownMenuItem>
                    }

                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default Action
