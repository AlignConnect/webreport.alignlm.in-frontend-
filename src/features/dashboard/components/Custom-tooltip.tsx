import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns'

const Customtooltip = ({ active, payload }: any) => {

    if (!active) {
        return null
    }

    const totalLeads = payload?.[0]?.payload?.totalLeads
    const date = payload?.[0]?.payload?.date;

    return (
        <div className='rounded-sm bg-white shadow-sm border overflow-hidden'>

            {
                date && <div className='text-sm p-2 px-3 bg-muted text-muted-foreground'>
                    {format(date, "MMM dd, yyyy")}
                </div>
            }

            <Separator />

            <div className='p-2 px-3 space-y-1'>

                <div className='flex items-center justify-center gap-x-4'>

                    <div className='flex items-center gap-x-2'>
                        <p className='size-1.5 bg-blue-500 rounded-full'></p>
                        <p className='text-sm text-muted-foreground'>Count</p>
                        <p className='text-sm text-muted-foreground'>{totalLeads}</p>

                    </div>


                </div>

            </div>

        </div>
    )
}

export default Customtooltip
