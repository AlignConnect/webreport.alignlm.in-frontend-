
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import AreaVariants from "./AreaVariants"
import BarVariants from "./BarVariants"
import { getDateCount } from "../api/get-datecount";
import { format } from "date-fns";
import LineVariants from "./LineVariants";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { AreaChart, BarChart, LineChart } from "lucide-react";
import { useDateSelectDashboard } from "../hooks/use-dateselect-dashboard";

const Chart = () => {

    const { date } = useDateSelectDashboard();

    const [chartType, setChartType] = useState("area");

    const onTypeChange = (type: string) => {
        setChartType(type);
    }


    const { data } = getDateCount({
        fromdate: date.from ? format(date.from, 'yyyy-MM-dd') : '',
        todate: date.to ? format(date.to, 'yyyy-MM-dd') : '',
    });




    return (
        <div>

            <Card className="border-none drop-shadow-sm">

                <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">

                    <CardTitle className="text-xl line-clamp-1">
                        Websites
                    </CardTitle>

                    <Select
                        defaultValue="area"
                        onValueChange={onTypeChange}
                    >
                        <SelectTrigger className="lg:w-auto h-9 rounded-md px-3">
                            <SelectValue placeholder="Select Chart Type" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="area">
                                <div className="flex items-center">
                                    <AreaChart className="size-4 mr-2 shrink-0" />
                                    <p className="line-clamp-1">
                                        Area Chart
                                    </p>
                                </div>
                            </SelectItem>

                            <SelectItem value="line">
                                <div className="flex items-center">
                                    <LineChart className="size-4 mr-2 shrink-0" />
                                    <p className="line-clamp-1">
                                        Line Chart
                                    </p>
                                </div>
                            </SelectItem>



                            <SelectItem value="bar">
                                <div className="flex items-center">
                                    <BarChart className="size-4 mr-2 shrink-0" />
                                    <p className="line-clamp-1">
                                        Bar Chart
                                    </p>
                                </div>
                            </SelectItem>
                        </SelectContent>

                    </Select>



                </CardHeader>

                <CardContent>

                    {/* <div className="flex flex-col gap-y-4 items-center justify-center h-[350px] w-full">

                        <FileSearch className="size-6 text-muted-foreground" />

                        <p className="text-muted-foreground text-xl">
                            No data found for this period.
                        </p>

                    </div> */}

                    {chartType === "area" && <AreaVariants data={data?.data} />}
                    {chartType === "bar" && <BarVariants data={data?.data} />}
                    {chartType === "line" && <LineVariants data={data?.data} />}

                </CardContent>

            </Card>

        </div>
    )
}

export default Chart
