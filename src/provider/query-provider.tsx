
import { useErrorStore } from '@/features/ip/hooks/use-error-ip';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { toast } from 'sonner';


function makeQueryClient() {
    return new QueryClient({
        queryCache: new QueryCache({
            onSuccess: (data: any) => {

                console.log(data)
                const store = useErrorStore.getState();
                if (data?.statusCode === 501) {
                    
                    store.setCriticalError(true)
                    return
                }

            },
            onError: (error: any) => {


                console.log(error?.response?.data?.message)

                const store = useErrorStore.getState();

                if (error?.message == "Network Error") {
                    store.setCriticalError(true)
                }
                return toast(error?.response?.data?.message ?? "Internal Server Error")
            }
        }),
        defaultOptions: {
            queries: {
                // With SSR, we usually want to set some default staleTime
                // above 0 to avoid refetching immediately on the client
                staleTime: 60 * 1000,
                retry: false
            },
        },
    })
}



export default function Providers({ children }: { children: React.ReactNode }) {

    const queryclient = makeQueryClient();

    return (
        <QueryClientProvider client={queryclient}>
            {children}
        </QueryClientProvider>
    )

}