import { useGetAllInvitation } from '../api/use-getall-invitations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/data-table';
import { Skeleton } from '@/components/ui/skeleton';
import { columns } from '@/components/invitations/Columns';

const InvitationContent = () => {


    const { data, isSuccess, isLoading } = useGetAllInvitation();

    const mydata = data ?? []




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
                        <CardTitle className='text-xl line-clamp-6'>Websites Invitation Page </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <DataTable columns={columns} data={mydata} filterKey='Search Email...' onDelete={() => { }} disabled={true} />
                    </CardContent>
                </Card>
            }
        </div>
    )
}

export default InvitationContent
