import { ApiService } from "@/utils/Axios";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { endOfDay, startOfDay } from "date-fns";

export const getAllWebsitesReport = (queryParams: { from: Date; to: Date }) => {
  // const params = {
  //     fromdate: startOfDay,
  //     todate: queryParams.to
  // }

  // console.log(params)

  console.log("asdsdasasasas", queryParams);

  const { getToken } = useAuth();

  const query = useQuery({
    queryKey: ["WEBREPORT", queryParams.from, queryParams.to],
    enabled: !!queryParams.to,
    queryFn: async () => {
      const token = await getToken();

      const response = await ApiService.getInstance(token as string).get(
        "/over-view/web-report",
        {
          params: {
            fromdate: startOfDay(queryParams.from).toISOString(),
            todate: endOfDay(queryParams.to).toISOString(),
          },
        }
      );
      return response.data;
    },
    select: (data: any[]) => {
      const filterValue = data.reduce(
        (accu, curr) => {
          if (curr.status === "fulfilled") {
            const sum = curr?.result?.reduce(
              (resultAccu: number, resultCurr: { num_rows: number }) => {
                return resultAccu + Number(resultCurr?.num_rows);
              },
              0
            );

            accu.fulfill.push({
              url: curr?.url,
              count: sum,
            });
          } else {
            // Handle non-fulfilled status
            accu.reject.push(curr);
          }

          return accu; // ✅ this line is necessary
        },
        { fulfill: [], reject: [] }
      );

      return filterValue;
    },
  });

  return query;
};
