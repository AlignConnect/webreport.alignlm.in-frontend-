import { DataTable } from '@/components/overview/data-table'
import { endOfDay, startOfDay } from 'date-fns';
import { useEffect } from 'react'
import { useDateSelectOverview } from '../hooks/use-dateselect-overview';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { getAllWebsitesReport } from '../api/get-all-websites';
import { WebColumn } from '@/components/overview/WebColumn';

const LeadTable = () => {


    const { date } = useDateSelectOverview();


    const { isLoading, data, isFetching } = getAllWebsitesReport({
        from: startOfDay(date.from ?? new Date()),
        to: endOfDay(date.to ?? new Date())
    });


    const fulfilled = data?.fulfill ?? [];
    const reject = data?.reject ?? []

    console.log(fulfilled)

    // for notify real time data

    useEffect(() => {
        let toastId: string | number;
        if (isFetching && !isLoading) {
            toastId = toast.loading('Loading...');
        }

        return () => {
            if (toastId) {
                toast.dismiss(toastId);
            }
        };
    }, [isFetching]);

    useEffect(() => {

        let toastId: string | number;

        if (reject?.length) {
            toastId = toast.error("URI have some Issue", {
                description: reject?.map((e: { url: string }) => <div>{e?.url}</div>)
            })
        }

        return () => {
            if (toastId) {
                toast.dismiss(toastId);
            }
        }

    }, [reject])


    if (isLoading) {
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
            <DataTable columns={WebColumn} data={fulfilled} />
        </div>
    )
}

export default LeadTable
