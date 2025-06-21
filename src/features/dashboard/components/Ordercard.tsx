import Datacard, { DataCardLoading } from '@/components/dashboard/Datacard'
import { getAllOrders } from '@/features/overview/api/get-all-order'
import { formatDateRange } from '@/utils/utils'
import { TrendingUp } from 'lucide-react'
import { useDateSelectDashboard } from '../hooks/use-dateselect-dashboard'

const Ordercard = () => {


    const { date } = useDateSelectDashboard();



    const { data, isLoading, isFetching } = getAllOrders({ from: date.from!, to: date.to! })


    if (isLoading || isFetching) {
        return <DataCardLoading />
    }


    return (
        <div>
            <Datacard
                title="Orders"
                value={data?.count || 0}
                percentageChange={10}
                Icon={<TrendingUp className="text-blue-500  size-5 rounded-md" />}
                variant="default"
                dataRange={formatDateRange({ from: date.from, to: date.to ?? date.from })}
            />

        </div>
    )
}

export default Ordercard
