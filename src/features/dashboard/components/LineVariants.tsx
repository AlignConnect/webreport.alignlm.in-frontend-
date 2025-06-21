import {
    Tooltip,
    XAxis,
    ResponsiveContainer,
    CartesianGrid,
    LineChart,
    Line

} from 'recharts'
import Customtooltip from './Custom-tooltip';
import { format } from 'date-fns';


const LineVariants = ({ data }: { data: { date: string, totalLeads: number }[] }) => {



    return (
        <div>

            <ResponsiveContainer width={"100%"} height={350}>

                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        axisLine={false}
                        tickLine={false}
                        dataKey={"date"}
                        style={{ fontSize: "12px" }}
                        tickFormatter={(value) => format(value, "dd MMM")}
                        tickMargin={16}
                    />

                    <Tooltip content={<Customtooltip />} />

                    <Line
                        dot={false}
                        dataKey={"totalLeads"}
                        stroke='#3b82f6'
                        strokeWidth={2}
                        className='drop-shadow-sm'
                    >
                    </Line>

                </LineChart>

            </ResponsiveContainer>

        </div>
    )
}

export default LineVariants
