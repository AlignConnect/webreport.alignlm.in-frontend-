import { ColumnDef } from "@tanstack/react-table"
import Counter from "./Counter"

export type WebLeads = {
    url: string
    count: number
}


export const WebColumn: ColumnDef<WebLeads>[] = [
    {
        accessorKey: "url",
        header: () => (
            <div className="font-semibold text-[16px] my-1">Websites Leads</div>
        ),
        cell: ({ getValue }) => (
            <div className="font-semibold">{getValue() as string}</div>
        ),
        filterFn: "includesString",
    },
    {
        accessorKey: "count",
        header: ({ table }) => {
            const total = table.getFilteredRowModel().flatRows.reduce(
                (sum, row) => sum + row.original.count,
                0
            )
            return <div className="flex justify-center items-center">
                Leads
                <Counter count={total} />
            </div>
        },
        cell: ({ getValue }) => (
            <div className="font-semibold flex justify-center">
                {Number(getValue()).toLocaleString()}
            </div>
        ),
    },
]
