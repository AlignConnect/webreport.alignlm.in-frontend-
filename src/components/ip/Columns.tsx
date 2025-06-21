"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "../ui/checkbox"
import Action from "./Actions"
import { TableSorting } from "@/utils/tableUtils"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Website = {
    id: string
    name: string;
    tag: string;
    shortCode: string;
    originalUrl: string;
    createdAt: string;
    updatedAt: string;
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
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableGlobalFilter: false,
        enableHiding: false,
    },

    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <TableSorting
                    column={column}
                    label="Name"
                    title="Sort by name"
                    ariaLabel="Sort By Name"
                />
            )
        },
        cell: (info) => {
            return <div className="flex justify-center items-center  h-full py-2 ">
                <span className="text-gray-800 font-medium text-sm max-w-[300px]">
                    {info.getValue() as string}
                </span>
            </div>
        },
        size: 150,  // Default column size
        minSize: 150,
        maxSize: 200,
        filterFn: "includesString"
    },

    {
        accessorKey: "ip_address",
        header: ({ column }) => {
            return (
                <TableSorting
                    column={column}
                    label="IPs"
                    title="Sort by IPs"
                    ariaLabel="Sort By IPs"
                />
            )
        },
        cell: (info) => {
            return <div className="flex justify-center items-center w-full h-full py-2">
                <span className="text-gray-800 font-medium text-sm max-w-[300px] truncate">
                    {info.getValue() as string}
                </span>
            </div>
        },
        size: 150,  // Default column size
        minSize: 150,
        maxSize: 200,
        filterFn: "includesString"
    },



    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <TableSorting
                    column={column}
                    label="Created"
                    title="Sort by Created"
                    ariaLabel="Sort By Created"
                />
            )
        },
        cell: (info) => {
            const utcDate = new Date(info.getValue() as Date);
            const istDate = utcDate.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
            return <div className="flex justify-center items-center w-full h-full py-2">
                {istDate}
            </div>
        },
        size: 150,  // Default column size
        minSize: 150,
        maxSize: 200,
        enableGlobalFilter: false,
    },


    {
        accessorKey: "updatedAt",
        header: ({ column }) => {
            return (
                <TableSorting
                    column={column}
                    label="Updated"
                    title="Sort by Updated"
                    ariaLabel="Sort By Updated"
                />
            )
        },
        cell: (info) => {
            const utcDate = new Date(info.getValue() as Date);
            const istDate = utcDate.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

            return <div className="flex justify-center items-center w-full h-full py-2">
                {istDate}
            </div>
        },
        size: 150,  // Default column size
        minSize: 150,
        maxSize: 200,
        enableGlobalFilter: false,
    },

    {

        id: "Actions",
        cell: (info) => {
            const ipValue = info.row.original
            return <Action row={ipValue} />
        }
    }

]
