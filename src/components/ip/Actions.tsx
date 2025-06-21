import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from '../ui/button'
import { Edit2, MoreHorizontal, Trash2 } from 'lucide-react'
import { useUpdateIP } from "@/features/ip/hooks/use-update-ip"
import { useDeleteIP } from "@/features/ip/api/use-delete-ip"

const Action = ({ row }: { row: Record<string, any> }) => {

    console.log(row)
    const { onOpen } = useUpdateIP();

    const deleteMutation = useDeleteIP();


    const onEdit = (data: { id: string, name: string, ip_address: string }) => {
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
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onEdit({
                        id: row?.id,
                        name: row?.name,
                        ip_address: row?.ip_address
                    })}>

                        <Edit2 className="size-4 mr-2" />
                        Edit

                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onDelete}>
                        <Trash2 className="size-4 mr-2" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default Action
