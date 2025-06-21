import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useNewCache } from '../hooks/use-new-cache'
import { useGetCache } from '../api/use-get-cache'
import { Skeleton } from '@/components/ui/skeleton'
import { columns } from '@/components/cache/Column'
import { DataTable } from '@/components/data-table'
import { usePermissionQuery } from '@/utils/IPChecker'
import { CREATE_CLOUDE_CACHE } from '@/utils/permission'


const CloudeHeader = () => {

    const { onOpen } = useNewCache();

    const { data, isLoading, isSuccess } = useGetCache();

    const { data: permission } = usePermissionQuery();

    const mydata = data?.data || []


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
                        <CardTitle className='text-xl line-clamp-6'>Websites Cache Page </CardTitle>

                        {
                            permission?.includes(CREATE_CLOUDE_CACHE) && <Button className='flex justify-center items-center cursor-pointer bg-gradient-to-r from-violet-500 to-blue-500 btn-animation' onClick={onOpen}>
                                <Plus className='size-4 mr-2' />
                                Add New
                            </Button>
                        }

                    </CardHeader>
                    <CardContent>
                        <DataTable columns={columns} data={mydata} filterKey='Search wensites, token' onDelete={() => { }} disabled={true} />
                    </CardContent>
                </Card>
            }
        </div>
    )
}

export default CloudeHeader
