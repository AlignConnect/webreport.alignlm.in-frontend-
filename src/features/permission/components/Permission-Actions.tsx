import { Button } from '@/components/ui/button'
import { useSelectUser } from '../hooks/useSelectUser';

const PermissionAction = () => {

    const { user, onClose } = useSelectUser();




    return (
        user && <div className='text-end me-20 space-x-2'>
            <Button
                className='btn-animation bg-gradient-to-r from-violet-500 to-blue-500 text-white hover:text-white cursor-pointer '
                variant={"ghost"}>
                Update
            </Button>

            <Button
                className='btn-animation bg-gradient-to-r from-red-500 via-red-600 to-red-500 text-white hover:text-white cursor-pointer '
                variant={"ghost"}
                onClick={onClose}>
                Reset
            </Button>
        </div>
    )
}

export default PermissionAction



