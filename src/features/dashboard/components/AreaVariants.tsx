import {
    Tooltip,
    XAxis,
    AreaChart as AreaWebChart,
    Area,
    ResponsiveContainer,
    CartesianGrid

} from 'recharts'
import Customtooltip from './Custom-tooltip';
import { format } from 'date-fns';
const AreaChart = ({ data }: { data: { date: string, totalLeads: number }[] }) => {




    return (

        <ResponsiveContainer width={"100%"} height={350}>

            <AreaWebChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <defs>
                    <linearGradient id='totalLeads' x1={0} y1={0} x2={0} y2={1}>
                        <stop offset={"30%"} stopColor='#3d82f6' stopOpacity={0.8} />
                        <stop offset={"98%"} stopColor='#3d82f6' stopOpacity={0} />
                    </linearGradient>

                  
                </defs>

                <XAxis
                    axisLine={false}
                    tickLine={false}
                    dataKey={"date"}
                    style={{ fontSize: "12px" }}
                    tickFormatter={(value) => format(value, "dd MMM")}
                    tickMargin={16}
                />

                <Tooltip content={<Customtooltip />} />

                <Area
                    type={"monotone"}
                    dataKey={"totalLeads"}
                    stackId={"totalLeads"}
                    strokeWidth={2}
                    stroke='#3d82f6'
                    fill='url(#totalLeads)'
                    className='drop-shadow-sm'
                >
                </Area>

            </AreaWebChart>

        </ResponsiveContainer>
    )
}

export default AreaChart
