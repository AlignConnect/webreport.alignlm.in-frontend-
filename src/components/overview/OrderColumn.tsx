import { ColumnDef } from "@tanstack/react-table";
import Counter from "./Counter";

export type BrahmikalpOrder = {
  source: string;
  total_orders: number;
};

export const orderColumn: ColumnDef<BrahmikalpOrder>[] = [
  {
    accessorKey: "source",
    header: () => (
      <div className="font-semibold text-[16px] my-1">Brahmikalp Orders</div>
    ),
    cell: ({ getValue }) => (
      <div className="font-semibold">{getValue() as string}</div>
    ),
    filterFn: "includesString",
  },
  {
    accessorKey: "total_orders",
    header: ({ table }) => {
      const total = table
        .getFilteredRowModel()
        .flatRows.reduce((sum, row) => sum + row.original.total_orders, 0);
      return (
        <div className="flex justify-center items-center">
          Orders
          <Counter count={total} />
        </div>
      );
    },
    cell: ({ getValue }) => (
      <div className="font-semibold flex justify-center">
        {Number(getValue()).toLocaleString()}
      </div>
    ),
  },
];
