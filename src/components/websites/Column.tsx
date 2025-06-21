import { ColumnDef } from "@tanstack/react-table";
import { TableSorting } from "@/utils/tableUtils";
import { formatDistanceToNowStrict } from "date-fns";
import { toast } from "sonner";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Website = {
  id: string;
  site: string;
  leads: number;
  checkout: number;
  rate: number;
  last: string;
};

export const columns: ColumnDef<Website>[] = [
  {
    accessorKey: "website",
    header: ({ column }) => (
      <TableSorting
        column={column}
        label="Last Websites"
        title="Sort By Last Websites"
        ariaLabel="Sort By Last Websites"
      />
    ),
    cell: (info) => {
      const site = info.getValue() as string;
      const lowercaseSite = site.toLowerCase();
      const handleCopy = () => {
        navigator.clipboard.writeText(lowercaseSite);
        toast.success("Copied to clipboard");
      };

      return (
        <div
          onClick={handleCopy}
          className="flex md:justify-center items-center w-full h-full py-2 cursor-pointer hover:underline"
          title="Click to copy"
        >
          <span className="text-gray-800 font-medium text-sm">{site}</span>
        </div>
      );
    },
    size: 150,
    minSize: 150,
    maxSize: 200,
    filterFn: "includesString",
  },

  {
    accessorKey: "leads",
    header: ({ column, table }) => {
      const total = table
        .getFilteredRowModel()
        .flatRows.reduce((sum, row) => sum + row.original.leads, 0);
      return (
        <div>
          <TableSorting
            column={column}
            label="Leads"
            total={total}
            title="Sort By Leads"
            ariaLabel="Sort By Leads"
          />
        </div>
      );
    },
    cell: (info) => {
      return (
        <div className="flex justify-center items-center w-full h-full py-2">
          <span className="text-gray-800 font-medium text-sm">
            {info.getValue() as string}
          </span>
        </div>
      );
    },
    size: 150, // Default column size
    minSize: 150,
    maxSize: 200,
    enableGlobalFilter: false,
  },
  {
    accessorKey: "checkout",
    header: ({ column, table }) => {
      const total = table
        .getFilteredRowModel()
        .flatRows.reduce((sum, row) => sum + row.original.checkout, 0);
      return (
        <TableSorting
          column={column}
          label="Checkout"
          total={total}
          title="Sort By Checkout"
          ariaLabel="Sort By Checkout"
        />
      );
    },
    cell: (info) => {
      return (
        <div className="flex justify-center items-center w-full h-full py-2">
          <span className="text-gray-800 font-medium text-sm">
            {info.getValue() as string}
          </span>
        </div>
      );
    },
    size: 150, // Default column size
    minSize: 150,
    maxSize: 200,
    enableGlobalFilter: false,
  },

  {
    accessorKey: "rate",
    header: ({ column, table }) => {
      const rows = table.getFilteredRowModel().flatRows;

      const totalLeads = rows.reduce((sum, row) => {
        const leads = Number(row.original.leads);
        return isNaN(leads) ? sum : sum + leads;
      }, 0);

      const totalCheckout = rows.reduce((sum, row) => {
        const checkout = Number(row.original.checkout);
        return isNaN(checkout) ? sum : sum + checkout;
      }, 0);

      const ratioPercentage =
        totalLeads > 0 ? (totalCheckout / totalLeads) * 100 : 0;

      return (
        <TableSorting
          column={column}
          label="Ratio"
          total={ratioPercentage}
          title="Sort By Ratio"
          ariaLabel="Sort By Ratio"
        />
      );
    },
    cell: (info) => {
      return (
        <div className="flex justify-center items-center w-full h-full py-2">
          <span className="text-gray-800 font-medium text-sm">
            {(info.getValue() as string) + "%"}
          </span>
        </div>
      );
    },
    size: 150, // Default column size
    minSize: 150,
    maxSize: 200,
    enableGlobalFilter: false,
  },

  {
    accessorKey: "live",
    header: ({ column }) => {
      return (
        <TableSorting
          column={column}
          label="Live"
          title="Sort By Live"
          ariaLabel="Sort By Live"
        />
      );
    },
    cell: (info) => {
      return (
        <div className="flex justify-center items-center w-full h-full py-2">
          <span className="text-gray-800 font-medium text-sm">
            {/* {info.getValue() as string} */}
            {info.getValue()
              ? formatDistanceToNowStrict(new Date(info.getValue() as string), {
                  addSuffix: true,
                })
              : "Continue..."}

            {/* {info.getValue() as string} */}
          </span>
        </div>
      );
    },
    size: 150, // Default column size
    minSize: 150,
    maxSize: 200,
    filterFn: "includesString",
  },
];
