import { useGetIP } from '../api/use-get-ip'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { DataTable } from '@/components/data-table';
import { columns } from '@/components/ip/Columns';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useNewIP } from '../hooks/use-create-ip';

const IPContent = () => {

    const { data, isSuccess, isLoading } = useGetIP();
    const { onOpen } = useNewIP();

    console.log(data)

    const mydata = data?.data ?? []




    if (isLoading) {
        return <Card className="border-none drop-shadow-s max-w-screen-2xl">
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
            {
                isSuccess && <Card className="border-none drop-shadow-s">
                    <CardHeader className='gap-y-2 flex items-center justify-between'>
                        <CardTitle className='text-xl line-clamp-6'>Websites IP Address </CardTitle>
                        <Button
                            className='flex justify-center items-center cursor-pointer bg-gradient-to-r from-violet-500 to-blue-500 btn-animation'
                            onClick={onOpen}>
                            <Plus className='size-4 mr-2' />
                            Add New
                        </Button>
                    </CardHeader>

                    <CardContent>
                        <DataTable columns={columns} data={mydata} filterKey='Search name,ip...' onDelete={() => { }} disabled={true} />
                    </CardContent>
                </Card>
            }
        </div>
    )
}

export default IPContent
