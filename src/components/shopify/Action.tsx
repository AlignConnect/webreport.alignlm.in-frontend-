import { useNewUpdateShopify } from '@/features/shopify/hooks/use-update-shopify'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from '../ui/button'
import { Edit2, MoreHorizontal, Trash2 } from 'lucide-react'
import { useDeleteShopify } from '@/features/shopify/api/use-delete-shopify'
import { usePermissionQuery } from '@/utils/IPChecker'
import { DELETE_SHOPIFY, UPDATE_SHOPIFY } from '@/utils/permission'

const Action = ({ row }: { row: Record<string, any> }) => {

    const { onOpen } = useNewUpdateShopify();

    const { data } = usePermissionQuery();

    const onEdit = (data: { id: string, name: string, shopifyId: string }) => {
        onOpen(data)
    }

    const deleteShopifyMutation = useDeleteShopify();

    const onDelete = () => {
        deleteShopifyMutation.mutate(row?.id)
    }

    return (
        <div className="text-center">
            <DropdownMenu>

                {
                    [UPDATE_SHOPIFY, DELETE_SHOPIFY].some(p => data?.includes(p)) && <DropdownMenuTrigger asChild>
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
                        data?.includes(UPDATE_SHOPIFY) && < DropdownMenuItem onClick={() => onEdit({
                            id: row?.id,
                            name: row?.name,
                            shopifyId: row?.shopifyId
                        })}>
                            <Edit2 className="size-4 mr-2" />
                            Edit
                        </DropdownMenuItem>
                    }


                    {
                        data?.includes(DELETE_SHOPIFY) && <DropdownMenuItem onClick={onDelete}>
                            <Trash2 className="size-4 mr-2" />
                            Delete
                        </DropdownMenuItem>
                    }

                </DropdownMenuContent>
            </DropdownMenu>
        </div >
    )
}

export default Action
