import { Loader } from 'lucide-react';
import { Switch } from '../ui/switch'
import { useToggleConversionMutation } from '@/features/conversion/api/use-toggle-conversion'

const Toggle = ({ row }: { row: { id: string, type: string, value: boolean } }) => {


    const toggleMutation = useToggleConversionMutation();

    const handleToggle = () => {
        toggleMutation.mutate({ id: row.id, adsType: row?.type })
    }

    return (
        <div className="flex justify-center items-center h-full py-2 ">
            <span className="text-gray-800 font-medium text-sm max-w-[300px] ">
                {

                    toggleMutation.isPending ? <Loader className='animate-spin text-muted-foreground size-4' /> : <Switch
                        checked={row.value}
                        className='cursor-pointer btn-grediant transition-none bg-gradient-to-bl data-[state=checked]:from-violet-600 data-[state=checked]:to-pink-600'
                        onClick={handleToggle}
                    />


                }
            </span>
        </div>
    )
}

export default Toggle
