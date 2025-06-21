import Counter from "@/components/overview/Counter"
import { Button } from "@/components/ui/button"
import { Column } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

type TableSortingProps<T> = {
    column: Column<T, unknown>
    label: string
    title?: string
    ariaLabel?: string
    total?: number
}


export const TableSorting = <T,>({ column, label, title, ariaLabel, total }: TableSortingProps<T>) => {

    return <div className="flex justify-center items-center w-full h-full">
        <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-gray-100/80 transition-colors cursor-pointer"
            aria-label={ariaLabel ?? `Sort by ${label}`}
            title={title ?? `Sort by ${label}`}
        >
            <div className="font-semibold text-gray-700 flex gap-1  items-center  justify-center">
                <div className="line-clamp-3">{label}</div>
                {total && <Counter count={total} />}
            </div>
            <ArrowUpDown className="ml-2 h-4 w-4 text-gray-600" />
        </Button>
    </div>



}