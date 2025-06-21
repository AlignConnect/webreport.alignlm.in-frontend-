import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "../ui/checkbox"
import Action from "./Actions"
import { cn } from "@/lib/utils"
import { TableSorting } from "@/utils/tableUtils"

export type Shopify = {
    id: string,
    email_address: string
    shopifyId: string,
    created_at: boolean,
    status: "pending" | "accepted" | "revoked" | "expired"
    expires_at: Date
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
        enableSorting: false,
        enableGlobalFilter: false,
        enableHiding: false,
    },

    {
        accessorKey: "email_address",
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
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <TableSorting
                    column={column}
                    label="Status"
                    title="Sort by Status"
                    ariaLabel="Sort By Status"
                />
            )
        },
        cell: (info) => {
            let status = info.getValue();
            const statusColorMap: Record<string, string> = {
                pending: "bg-gradient-to-bl from-blue-400 to-blue-900",
                accepted: "bg-gradient-to-bl from-green-400 to-green-900",
                revoked: "bg-gradient-to-bl from-orange-400 to-orange-900",
                default: "bg-gradient-to-bl from-red-400 to-red-900",
            };
            const bg = statusColorMap[status as string] || statusColorMap.default;

            return <div className={cn("flex justify-center items-center w-full h-full py-2 max-w-[100px] btn-animation mx-auto rounded-[7px] text-white", bg)}>
                <span className={cn("font-medium text-sm  truncate")}>
                    {status as string}
                </span>
            </div>
        },
        size: 150,  // Default column size
        minSize: 150,
        maxSize: 200,
        filterFn: "includesString"
    },

    {
        accessorKey: "created_at",
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
        filterFn: "includesString"
    },

    {
        accessorKey: "expires_at",
        header: ({ column }) => {
            return (
                <TableSorting
                    column={column}
                    label="Expired"
                    title="Sort by Expired"
                    ariaLabel="Sort By Expired"
                />
            )
        },
        cell: (info) => {

            const utcDate = new Date(info.getValue() as Date);
            const istDate = utcDate.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

            return <div className="flex justify-center items-center w-full h-full py-2">
                {
                    istDate
                }
            </div>
        },
        size: 150,  // Default column size
        minSize: 150,
        maxSize: 200,
        filterFn: "includesString"
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