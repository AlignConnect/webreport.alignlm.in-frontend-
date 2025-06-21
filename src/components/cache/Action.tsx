import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from '../ui/button'
import { Edit2, MoreHorizontal, Trash2 } from 'lucide-react'
import { useNewUpdateCache } from '@/features/cloud-cache/hooks/use-update-cache'
import { useDeleteCache } from '@/features/cloud-cache/api/use-delete-cache'
import { usePermissionQuery } from "@/utils/IPChecker"
import {  DELETE_CLOUDE_CACHE, UPDATE_CLOUDE_CACHE } from "@/utils/permission"

const Action = ({ row }: { row: Record<string, any> }) => {

    console.log(row)
    const { onOpen } = useNewUpdateCache();

    const deleteMutation = useDeleteCache();
    const { data } = usePermissionQuery();

    const onEdit = (data: { id: string, name: string, token: string }) => {
        onOpen(data)
    }


    const onDelete = () => {

        deleteMutation.mutate(row?.id, {
            onSuccess: () => {
                // for example
            }
        })

    }



    return (
        <div className="text-center">
            <DropdownMenu>

                {
                    [UPDATE_CLOUDE_CACHE, DELETE_CLOUDE_CACHE].some(p => data?.includes(p)) && <DropdownMenuTrigger asChild>
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
                        data?.includes(UPDATE_CLOUDE_CACHE) && <DropdownMenuItem onClick={() => onEdit({
                            id: row?.id,
                            name: row?.name,
                            token: row?.token
                        })}>
                            <Edit2 className="size-4 mr-2" />
                            Edit
                        </DropdownMenuItem>
                    }


                    {
                        data?.includes(DELETE_CLOUDE_CACHE) && <DropdownMenuItem onClick={onDelete}>
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
