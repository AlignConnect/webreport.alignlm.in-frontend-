import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { DataTable } from '@/components/data-table';
import { columns } from '@/components/shopify/Column';
import { useGetShopify } from '../api/use-get-shopify';
import { useNewShopify } from '../hooks/use-new-shopify';
import { usePermissionQuery } from '@/utils/IPChecker';
import { CREATE_SHOPIFY } from '@/utils/permission';

const ShopifyHeader = () => {


    const { onOpen } = useNewShopify();

    const { data, isLoading, isSuccess } = useGetShopify();

    const { data: permissionsData } = usePermissionQuery();

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

                        {permissionsData?.includes(CREATE_SHOPIFY) && <Button className='flex justify-center items-center cursor-pointer bg-gradient-to-r from-violet-500 to-blue-500 btn-animation' onClick={onOpen}>
                            <Plus className='size-4 mr-2' />
                            Add New
                        </Button>
                        }

                    </CardHeader>
                    <CardContent>
                        <DataTable columns={columns} data={mydata} filterKey='Search ids, shopify, name, status' onDelete={() => { }} disabled={true} />
                    </CardContent>
                </Card>
            }
        </div>
    )
}

export default ShopifyHeader
