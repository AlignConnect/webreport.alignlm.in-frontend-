import {
    Tooltip,
    XAxis,
    ResponsiveContainer,
    CartesianGrid,
    BarChart,
    Bar

} from 'recharts'
import Customtooltip from './Custom-tooltip';
import { format } from 'date-fns';


const BarVariants = ({ data }: { data: { date: string, totalLeads: number }[] }) => {



    return (
        <div>

            <ResponsiveContainer width={"100%"} height={350}>

                <BarChart data={data}>
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

                    <Bar
                        dataKey={"totalLeads"}
                        fill='#8884d8'
                        className='drop-shadow-sm !hover:bg-transparent'
                    >
                    </Bar>

                </BarChart>

            </ResponsiveContainer>

        </div>
    )
}

export default BarVariants
