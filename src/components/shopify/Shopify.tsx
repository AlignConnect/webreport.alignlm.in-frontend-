import { Activity, Loader2 } from 'lucide-react'
import { Button } from '../ui/button'
import { useFetchShopify } from '@/features/shopify/api/use-fetch-shopify'

const Shopify = ({ row }: { row: Record<string, any> }) => {


    const shopifyFetchMutation = useFetchShopify(row?.id)

    const handleFetch = () => {
        shopifyFetchMutation.mutate()
    }


    return (
        <div className='text-center'>

            {
                shopifyFetchMutation.isPending
                    ? <Button
                        className='bg-gradient-to-r from-violet-500 to-blue-500 btn-animation hover:text-white cursor-pointer text-white '
                        variant={"ghost"}
                        onClick={handleFetch}
                    > <Loader2 className='animate-spin ' />
                    </Button>
                    : <Button
                        className='cursor-pointer btn-animation bg-gradient-to-bl from-blue-600 to-violet-600 text-white hover:text-white min-w-[60px]'
                        variant={"ghost"}
                        onClick={handleFetch}
                    >
                        <Activity className='animate-pulse size-5' />
                    </Button>
            }

        </div>
    )
}

export default Shopify
