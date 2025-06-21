import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import Ordertooltip from './Order-tooltip';

const COLOR = ['#3b82f6', '#f43f5e', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

const Pievariants = ({ data }: any) => {

    console.log(data, "pie data")
    return (
        <ResponsiveContainer width={"100%"} height={350}>
            <PieChart>
                <Legend
                    layout='horizontal'
                    verticalAlign='bottom'
                    align='right'
                    iconType='circle'
                    content={({ payload }) => {

                        return (
                            <ul className='grid grid-cols-1 gap-y-2 max-h-[100px] overflow-hidden'>

                                {
                                    payload?.map((entry: any, index: number) => {

                                        console.log(entry, "legend entry")

                                        return <li key={`item-${index}`} className='flex items-center space-x-2'>
                                            <span className='size-2 rounded-full' style={{ backgroundColor: entry.color }}></span>

                                            <div className='space-x-1' >
                                                <span className='text-sm text-muted-foreground'>{entry?.payload?.payload?.website}</span>
                                                <span>{(entry?.payload?.percent * 100).toFixed(2) + "%"}</span>

                                            </div>

                                        </li>

                                    })
                                }

                            </ul>
                        )

                    }}
                />

                <Tooltip content={<Ordertooltip />} />

                <Pie
                    data={data}
                    cx={"50%"}
                    cy={"50%"}
                    outerRadius={90}
                    innerRadius={60}
                    fill='#8884d8'
                    dataKey={"total_orders"}
                    labelLine={false}
                >
                    {
                        data?.map((entry: any, index: number) => (
                            <Cell
                                name={entry?.date}
                                key={`cell-${index}`}
                                fill={COLOR[index % COLOR.length]}
                            />
                        ))
                    }
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    )
}

export default Pievariants
