import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "../ui/checkbox"
import { Button } from "../ui/button"
import Action from "./Action"
import Shopify from "./Shopify"
import { TableSorting } from "@/utils/tableUtils"

export type Shopify = {
    id: string,
    name: string
    shopifyId: string,
    status: boolean
    updated_at: Date
}


export const columns: ColumnDef<Shopify>[] = [

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
                    label="Shopify Name"
                    title="Sort by Shopify Name"
                    ariaLabel="Sort By Shopify Name"
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
        accessorKey: "shopifyId",
        header: ({ column }) => {
            return (
                <TableSorting
                    column={column}
                    label="ShopifyId"
                    title="Sort by ShopifyId"
                    ariaLabel="Sort By ShopifyId"
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
        meta: {
            align: "center"
        },
        filterFn: "includesString"
    },

    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <TableSorting
                    column={column}
                    label="Status"
                    title="Sort By Status"
                    ariaLabel="Sort By Status"
                />
            )
        },
        cell: (info) => {
            return <div className="flex justify-center items-center w-full h-full py-2">
                {
                    info.getValue()
                        ? <Button className=" bg-gradient-to-r from-violet-500 to-blue-500 btn-animation">Success</Button>
                        : <Button className=" bg-gradient-to-r from-red-700 to-red-500 btn-animation">Fail</Button>
                }
            </div>
        },
        size: 150,  // Default column size
        minSize: 150,
        maxSize: 200,
        filterFn: "includesString"
    },

    {
        accessorKey: "updatedAt",
        header: ({ column }) => {
            return (
                <TableSorting
                    column={column}
                    label="Last Fetched Data"
                    title="Sort By Last Fetched Data"
                    ariaLabel="Sort By Last Fetched Data"
                />
            )
        },
        cell: (info) => {

            const utcDate = new Date(info.getValue() as Date);
            const istDate = utcDate.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

            return <div className="flex justify-center items-center w-full h-full py-2">
                <span className="text-gray-800 font-medium text-sm max-w-[300px] truncate">
                    {istDate}
                </span>
            </div>
        },
        size: 150,  // Default column size
        minSize: 150,
        maxSize: 200,
        filterFn: "includesString"
    },

    {
        id: "fetch",
        header: () => <div className="text-center">Fetch Data</div>,
        enableHiding: false,
        cell: ({ row }) => {
            const rowOriginal = row.original
            return (
                <Shopify row={rowOriginal} />
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