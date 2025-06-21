import { Separator } from '@/components/ui/separator';

const Ordertooltip = ({ active, payload }: any) => {

    if (!active) {
        return null
    }

    const totalOrders = payload?.[0]?.payload?.total_orders
    const website = payload?.[0]?.payload?.website;

    return (
        <div className='rounded-sm bg-white shadow-sm border overflow-hidden'>

            <div className='text-sm p-2 px-3 bg-muted text-muted-foreground'>
                {website}
            </div>

            <Separator />

            <div className='p-2 px-3 space-y-1'>

                <div className='flex items-center justify-center gap-x-4'>

                    <div className='flex items-center gap-x-2'>
                        <p className='size-1.5 bg-blue-500 rounded-full'></p>
                        <p className='text-sm text-muted-foreground'>Count</p>
                        <p className='text-sm text-muted-foreground'>{totalOrders}</p>

                    </div>


                </div>

            </div>

        </div>
    )
}

export default Ordertooltip
