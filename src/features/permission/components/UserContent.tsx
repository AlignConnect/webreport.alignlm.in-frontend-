import { useGetAllUsers } from '@/features/users/api/use-get-users'
import { useSelectUser } from '../hooks/useSelectUser';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Avatar } from '@radix-ui/react-avatar';
import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
const UserContent = () => {

    const { data, isLoading: isUserLoading } = useGetAllUsers();

    const { onSelect, user } = useSelectUser();



    console.log(data, user)

    return (
        <div className='p-5'>

            <Select onValueChange={(Value) => onSelect(Value)} value={user}>
                <SelectTrigger className="w-full min-h-[60px]" >
                    <SelectValue placeholder="Select User" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup className='space-y-3'>
                        <SelectLabel>Select User</SelectLabel>

                        {
                            isUserLoading ? <SelectItem value="loading">
                                <div className='flex items-center space-x-3'>

                                    <Skeleton className='w-[50px] h-[50px] bg-gray-200' />

                                    <div className='text-md'>
                                        Loading...
                                    </div>

                                </div>
                            </SelectItem> :

                                data?.map((user: Record<string, any>) => {
                                    console.log(user)
                                    return <SelectItem key={user.id} value={user?.id}>

                                        <div className='flex items-center space-x-3'>

                                            <Avatar>
                                                <AvatarImage src={user?.image_url} className='w-[50px] h-[50px] rounded-full' />
                                                <AvatarFallback>AR</AvatarFallback>
                                            </Avatar>

                                            <div className='text-md'>
                                                {user?.email_addresses[0]?.email_address ?? "User Email Not Found"}
                                            </div>

                                        </div>
                                    </SelectItem>
                                })
                        }
                    </SelectGroup>
                </SelectContent>
            </Select>


        </div>
    )
}

export default UserContent
