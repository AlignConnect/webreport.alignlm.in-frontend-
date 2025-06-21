// use-order-shopify.ts
import { ApiService } from "@/utils/Axios";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";

export const useOrderShopify = (created_at_min: string, created_at_max: string, store: string) => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["SHOPIFY_ORDERS", created_at_min, created_at_max,store],
    queryFn: async () => {
      const token = await getToken();

      const response = await ApiService.getInstance(token!).get("/shopify/orders", {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          created_at_min,
          created_at_max,
          store,
        },
      });

      return response.data;
    },
    enabled: !!created_at_min && !!created_at_max, 
  });
};
