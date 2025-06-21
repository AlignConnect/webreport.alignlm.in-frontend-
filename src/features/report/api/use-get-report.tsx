import { ApiService } from "@/utils/Axios";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";

export const useGetReport = (
  id: string,
  queryParams: { from: Date; to: Date }
) => {
  const params = {
    fromdate: queryParams.from.toISOString(),
    todate: queryParams.to.toISOString(),
  };

  // console.log(params);

  const { getToken } = useAuth();

  const query = useQuery({
    queryKey: ["report", { id, queryParams }],
    enabled: !!id,
    placeholderData: (prev) => {
      console.log(prev, id);

      if (id === prev?.meta?.id) {
        return prev;
      }

      return undefined;
    },

    queryFn: async () => {
      const token = await getToken();

      const response = await ApiService.getInstance(token as string).get(
        `/report/${id}?fromdate=${params.fromdate}&todate=${params.todate}`
      );
      return response.data;
    },
  });

  return query;
};
