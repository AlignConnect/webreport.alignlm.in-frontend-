import { Button } from '../ui/button'
import { useClearCache } from '@/features/cloud-cache/api/use-clear-cache'
import { Loader2 } from 'lucide-react'

const Clear = ({ row }: { row: Record<string, any> }) => {




    const clearMutate = useClearCache();


    const onHandleClearCache = () => {
        clearMutate.mutate(row?.id)
    }


    return (
        <div>
            <div className="text-center">
                <Button
                    variant={"outline"}
                    className="cursor-pointer btn-animation bg-gradient-to-bl from-blue-600 to-violet-600 text-white hover:text-white"
                    onClick={onHandleClearCache}
                >

                    {
                        clearMutate.isPending ? <Loader2 className='animate-spin' /> : "Clear"
                    }


                </Button>
            </div>
        </div>
    )
}

export default Clear
