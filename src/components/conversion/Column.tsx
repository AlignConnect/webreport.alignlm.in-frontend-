import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from '@/components/ui/checkbox'
import Action from "./Action"
import Toggle from "./Toggle"
import { TableSorting } from "@/utils/tableUtils"
export type Conversion = {

    id: string,
    websites: string,
    exo: string,
    ts: string,
    updatedAt: string

}



export const columns: ColumnDef<Conversion>[] = [

    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                className=""
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableGlobalFilter: false,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "websites",
        header: ({ column }) => {
            return (
                <TableSorting
                    column={column}
                    label="Websites"
                    title="Sort by Websites"
                    ariaLabel="Sort By Websites"
                />
            )
        },
        cell: (info) => {
            return <div className="flex justify-center items-center  h-full py-2 ">
                <span className="text-gray-800 font-medium text-sm max-w-[300px]">
                    {`${info.getValue()}`}
                </span>
            </div>
        },
        size: 150,  // Default column size
        minSize: 150,
        maxSize: 200,
        filterFn: "includesString"
    },

    {
        accessorKey: "exo",
        header: ({ column }) => {
            return (
                <TableSorting
                    column={column}
                    label="Exo click"
                    title="Sort by Exo click"
                    ariaLabel="Sort By Exo click"
                />
            )
        },
        cell: (info) => {
            return <Toggle row={{ id: info.cell.row.original.id, type: "exo", value: !!info.getValue() }} />
        },
        size: 150,  // Default column size
        minSize: 150,
        maxSize: 200,
        enableGlobalFilter: false,
    },

    {
        accessorKey: "ts",
        header: ({ column }) => {
            return (
                <TableSorting
                    column={column}
                    label="Traffic start"
                    title="Sort by Traffic start"
                    ariaLabel="Sort By Traffic start"
                />
            )
        },
        cell: (info) => {
            return <Toggle row={{ id: info.cell.row.original.id, type: "ts", value: !!info.getValue() }} />
        },
        size: 150,  // Default column size
        minSize: 150,
        maxSize: 200,
        enableGlobalFilter: false,
    },

    {
        id: "actions",
        // header: () => "Strike",
        enableHiding: false,
        cell: ({ row }) => {
            const rowOriginal = row.original
            return (
                <div className="flex items-center">
                    <Action row={rowOriginal} />
                </div>
            )
        }
    }
]
