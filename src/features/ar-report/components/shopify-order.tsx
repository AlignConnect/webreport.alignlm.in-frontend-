"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useOrderShopify } from "@/features/shopify/api/use-order-shopify";
import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useDateSelectWebsite } from "@/features/websites/hooks/use-dateselect-websites";
import Loader from "../../../../src/utils/Loader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";

dayjs.extend(utc);
dayjs.extend(timezone);

interface PivotedUTMData {
  title: string;
  [utmSource: string]: string | number;
}

const utmSourceMap: Record<string, string> = {
  google: "Google",
  "google remarketing": "Google",
  ytb: "Google",
  yt: "Google",

  fb: "Facebook",
  FB: "Facebook",
  facebook: "Facebook",
  // FB : "Facebook",

  insta: "Instagram",
  ig: "Instagram",

  whatsapp: "WhatsApp",
  whtsup: "WhatsApp",
  whatsap: "WhatsApp",
  whsup: "WhatsApp",
};
const ShopifyOrder = () => {
  const { date } = useDateSelectWebsite();
  const [selectedStore, setSelectedStore] = useState("arayurveda.shop");

  const from = dayjs(date.from)
    .startOf("day")
    .tz("Asia/Kolkata")
    .utc()
    .toISOString();
  const to = dayjs(date.to).endOf("day").tz("Asia/Kolkata").utc().toISOString();

  const { data, isLoading, isError } = useOrderShopify(from, to, selectedStore);
  console.log("datasdasdasdasdasd: ", data);

  // Step 1 + 2: Normalize and pivot backend data
  const groupedSourcesSet = new Set<string>();
  const transformedData: PivotedUTMData[] = [];

  if (data?.data?.counts) {
    Object.entries(data.data.counts).forEach(([title, sources]) => {
      const row: PivotedUTMData = { title };
      let total = 0;
      const typedSources = sources as Record<string, number>;
      const groupedSources: Record<string, number> = {};

      Object.entries(typedSources).forEach(([source, count]) => {
        const cleanedSource = source.trim().toLowerCase();

        const normalized = utmSourceMap[cleanedSource] || source.trim();
        groupedSources[normalized] = (groupedSources[normalized] || 0) + count;
      });

      Object.entries(groupedSources).forEach(([normalized, count]) => {
        row[normalized] = count;
        groupedSourcesSet.add(normalized);
        total += count;
      });

      row["Total"] = total;
      transformedData.push(row);
    });
  }

  // Step 3: Dynamic columns
  const columns: ColumnDef<PivotedUTMData>[] = [
    {
      accessorKey: "title",
      header: "Product Title",
      cell: ({ row }) => {
        const title = row.getValue("title") as string;
        const trimmed = title.split(" ").slice(0, 3).join(" ");
        return (
          <span className="font-medium text-center text-md">{trimmed}</span>
        );
      },
    },
    ...Array.from(groupedSourcesSet).map(
      (source): ColumnDef<PivotedUTMData> => ({
        accessorKey: source,
        header: () => <div className="text-center">{source}</div>,
        cell: ({ row }) => (
          <span className="block text-center">{row.getValue(source) || 0}</span>
        ),
      })
    ),
    {
      accessorKey: "Total",
      header: "Total",
      cell: ({ row }) => (
        <span className="block font-semibold text-center">
          {row.getValue("Total")}
        </span>
      ),
    },
  ];

  const totalOrderCount = transformedData.reduce(
    (sum, row) => sum + (row.Total as number),
    0
  );

  return (
    <Card className="border-none drop-shadow-sm mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">{selectedStore}</CardTitle>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <p className="text-muted-foreground">
            <Loader />
          </p>
        ) : isError ? (
          <p className="text-red-500">Failed to fetch data.</p>
        ) : transformedData.length === 0 ? (
          <p className="text-muted-foreground">
            No orders found for selected dates.
          </p>
        ) : (
          <>
            <div className="mb-4 flex items-center justify-between">
              <p className="font-semibold text-base">
                Total Orders: {totalOrderCount}
              </p>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Select Store</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => setSelectedStore("arayurveda.shop")}
                  >
                    arayurveda.shop
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSelectedStore("plantifygarden.com")}
                  >
                    plantifygarden.com
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <DataTable
              columns={columns}
              data={transformedData}
              filterKey="title"
              onDelete={() => {}}
              disabled={true}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ShopifyOrder;
