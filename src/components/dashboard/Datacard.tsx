import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import CountUp from "react-countup"
import { Skeleton } from "../ui/skeleton"

type Datagrid = {
    Icon: React.ReactNode,
    title: string,
    value: number,
    dataRange?: string,
    percentageChange?: number,
    variant?: "default" | "primary" | "secondary" | "destructive" | "outline"
}


const Datacard = ({ Icon, title, dataRange, value }: Datagrid) => {
    return (
        <Card className="border-none drop-shadow-sm">

            <CardHeader className="flex flex-grow items-center justify-between gap-x-4">

                <div>
                    <CardTitle className="text-xl line-clamp-1">
                        {title}
                    </CardTitle>

                    <CardDescription className="line-clamp-1 text-muted-foreground">
                        {dataRange}
                    </CardDescription>

                </div>
                <div className="bg-blue-500/20 p-3 rounded-md">
                    {Icon}
                </div>
            </CardHeader>

            <CardContent>
                <h1 className="font-bold text-2xl mb-2 line-clamp-1 break-all">

                    <CountUp
                        start={0}
                        end={value}
                    />

                </h1>
            </CardContent>

        </Card>
    )
}

export default Datacard




export const DataCardLoading = () => {


    return <Card className="border-none drop-shadow-sm h-[162px]">

        <CardHeader className="flex flex-grow items-center justify-between gap-x-4">

            <div className="space-y-2">

                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-4 w-40" />

            </div>

        </CardHeader>

        <CardContent>
            <Skeleton className="h-10 shrink-0 w-24 mb-2" />
        </CardContent>

    </Card>


}


