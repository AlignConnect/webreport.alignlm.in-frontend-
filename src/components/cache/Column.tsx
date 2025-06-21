"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "../ui/checkbox"
import Action from "./Action"
import Clear from "./Clear"
import { TableSorting } from "@/utils/tableUtils"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Website = {
    id: string
    site: string;
    leads: number;
    checkout: number;
    ratio: number;
    last: string;
}

export const columns: ColumnDef<Website>[] = [

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
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <TableSorting
                    column={column}
                    label="Last Websites"
                    title="Sort By Last Websites"
                    ariaLabel="Sort By Last Websites"
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
        accessorKey: "token",
        header: () => {
            return (
                <div className="flex justify-center items-center">Token</div>
            )
        },
        cell: (info) => {
            return <div className="flex justify-center items-center w-full h-full py-2">
                <span className="text-gray-800 font-medium text-sm max-w-[300px] truncate">
                    {`${info.getValue()}`}
                </span>
            </div>
        },
        size: 150,  // Default column size
        minSize: 150,
        maxSize: 200,
        enableResizing: false,
        filterFn: "includesString"
    },

    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            return (
                <Clear row={row.original} />
            )
        }
    },

    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const rowOriginal = row.original
            return (
                <Action row={rowOriginal} />
            )
        }
    }
]
