import Datacard, { DataCardLoading } from '@/components/dashboard/Datacard'
import { getAllWebsitesReport } from '@/features/overview/api/get-all-websites'
import { formatDateRange } from '@/utils/utils'
import { TrendingUp } from 'lucide-react'
import { useDateSelectDashboard } from '../hooks/use-dateselect-dashboard'

const Leadcard = () => {

    const { date } = useDateSelectDashboard();





    const { data, isLoading } = getAllWebsitesReport({ from: date.from!, to: date.to! })


    const LeadCount = data?.fulfill.reduce((acc: number, curr: Record<string, string>) => {
        return acc + curr.count;
    }, 0) || 0;



    if (isLoading) {
        return <DataCardLoading />
    }


    return (
        <div>
            <Datacard
                title="Leads"
                value={LeadCount}
                percentageChange={10}
                Icon={<TrendingUp className="text-blue-500  size-5 rounded-md" />}
                variant="default"
                dataRange={formatDateRange({ from: date.from, to: date.to ?? date.from })}
            />

        </div>
    )
}

export default Leadcard
