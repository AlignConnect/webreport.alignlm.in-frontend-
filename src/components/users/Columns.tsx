"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import Actions from "./Actions"
import { TableSorting } from "@/utils/tableUtils"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Users = {
    id: string
    image_url: string;
    first_name: number;
    last_name: number;
    email_addresses: Record<string, string>[];
}

export const columns: ColumnDef<Users>[] = [
    {
        accessorKey: "image_url",
        header: () => {
            return (
                <div className="flex justify-center">Image</div>
            )
        },
        cell: (info) => {
            return <div className="flex justify-center items-center  h-full py-2 ">
                <Avatar className="h-[50px] w-[50px]">
                    <AvatarImage src={info.getValue() as string} alt="no-image-found" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        },
        size: 150,  // Default column size
        minSize: 150,
        maxSize: 200,
        enableSorting: false,
        enableGlobalFilter: false,
        enableHiding: false,
    },

    {
        accessorKey: "email_addresses.0.email_address",
        header: ({ column }) => {
            return (
                <TableSorting
                    column={column}
                    label="Email"
                    title="Sort by Email"
                    ariaLabel="Sort By Email"
                />
            )
        },
        cell: (info) => {
            console.log(info.getValue())
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
        accessorKey: "first_name",
        header: ({ column }) => {
            return (
                <TableSorting
                    column={column}
                    label="First Name"
                    title="Sort by First Name"
                    ariaLabel="Sort By First Name"
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
        accessorKey: "last_name",
        header: ({ column }) => {
            return (
                <TableSorting
                    column={column}
                    label="Last Name"
                    title="Sort by Last Name"
                    ariaLabel="Sort By Last Name"
                />
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
        filterFn: "includesString"
    },

    {
        id: "actions",
        header: () => <div className="flex justify-center items-center">Actions</div>,
        enableHiding: false,
        cell: ({ row }) => {
            const rowOriginal = row.original
            return (
                <div className="flex items-center justify-center">
                    <Actions row={rowOriginal} />
                </div>
            )
        }
    }
]
