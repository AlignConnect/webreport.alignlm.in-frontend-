import { DataTable } from '@/components/overview/data-table'
import { orderColumn } from '@/components/overview/OrderColumn'
import { useEffect } from 'react'
import { getAllOrders } from '../api/get-all-order';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useDateSelectWebsite } from '@/features/websites/hooks/use-dateselect-websites';

const OrderTable = () => {


    // const { date } = useDateSelectOverview();
    const { date } = useDateSelectWebsite();



    const { isLoading: isOrderLoading, data: OrderData, isFetching: isOrderFetching } = getAllOrders({
        from: date.from!,
        to: date.to!
    });



    // for notify real time data

    useEffect(() => {
        let toastId: string | number;
        if (isOrderFetching && !isOrderLoading) {
            toastId = toast.loading('Loading...');
        }

        return () => {
            if (toastId) {
                toast.dismiss(toastId);
            }
        };
    }, [isOrderFetching]);



    if (isOrderLoading) {
        return <Card className="border-none drop-shadow-s ">
            <CardHeader className='gap-y-2 flex items-center justify-between'>
                <CardTitle className='text-xl line-clamp-6'>
                    <Skeleton className='w-[300px] h-[50px]' />
                </CardTitle>
                <Skeleton className='w-[300px] h-[50px]' />
            </CardHeader>
            <CardContent>
                <Skeleton className='w-full h-[550px]' />
            </CardContent>
        </Card>
    }



    return (
        <div>
            <DataTable columns={orderColumn} data={OrderData?.response} />
        </div>
    )
}

export default OrderTable
