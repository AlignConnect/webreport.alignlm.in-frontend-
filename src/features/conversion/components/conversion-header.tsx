import { useGetConversion } from '../api/use-get-conversion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { DataTable } from '@/components/data-table';
import { useNewConversion } from '../hooks/use-new-conversion';
import { columns } from '@/components/conversion/Column';
import { CREATE_EXO_TS } from '@/utils/permission';
import { usePermissionQuery } from '@/utils/IPChecker';


const ConversionHeader = () => {

    const { data, isLoading, isSuccess } = useGetConversion();

    const { data: permission } = usePermissionQuery();

    const mydata = data?.data || []

    const { onOpen } = useNewConversion()



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
            {
                isSuccess && <Card className="border-none drop-shadow-s">
                    <CardHeader className='gap-y-2 flex items-center justify-between'>
                        <CardTitle className='text-xl line-clamp-6'>Websites Conversion Page </CardTitle>

                        {
                            permission?.includes(CREATE_EXO_TS) && <Button className='flex justify-center items-center cursor-pointer bg-gradient-to-r from-violet-500 to-blue-500 btn-animation' onClick={onOpen}>
                                <Plus className='size-4 mr-2' />
                                Add New
                            </Button>

                        }

                    </CardHeader>
                    <CardContent>
                        <DataTable columns={columns} data={mydata} filterKey='Search websites' onDelete={() => { }} disabled={true} />
                    </CardContent>
                </Card>
            }
        </div>
    )
}

export default ConversionHeader
