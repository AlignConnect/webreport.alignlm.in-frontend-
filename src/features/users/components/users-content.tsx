import { DataTable } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import { useGetAllUsers } from '../api/use-get-users'
import { Skeleton } from '@/components/ui/skeleton'
import { columns } from '@/components/users/Columns'
import { useCreateInvitationHook } from '@/features/invitations/hooks/use-create-invitation'

const UsersContent = () => {


    const { data, isLoading, isSuccess } = useGetAllUsers();

    const { onOpen } = useCreateInvitationHook();


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
                        <CardTitle className='text-xl line-clamp-6'>Websites Active User</CardTitle>

                        <Button
                            className='flex justify-center items-center cursor-pointer bg-gradient-to-r from-violet-500 to-blue-500 btn-animation'
                            onClick={onOpen}
                        >
                            <Plus className='size-4 mr-2' />
                            Invitation
                        </Button>

                    </CardHeader>
                    <CardContent>
                        <DataTable columns={columns} data={mydata} filterKey='Search email firstname lastname' onDelete={() => { }} disabled={true} />
                    </CardContent>
                </Card>
            }


        </div>
    )
}

export default UsersContent
