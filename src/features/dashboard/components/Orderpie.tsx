
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Pievariants from "./Pievariants";
import { getAllOrders } from "@/features/overview/api/get-all-order";
import { useDateSelectDashboard } from "../hooks/use-dateselect-dashboard";
import { FileSearch } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const Orderpie = () => {

    const { date } = useDateSelectDashboard();

    const { data, isLoading,isFetching } = getAllOrders({
        from: date.from!,
        to: date.to!,
    });



    if (isLoading || isFetching) {

        return <Card className="border-none drop-shadow-sm ">

            <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">

                <Skeleton className="h-10 w-1/2" />
            </CardHeader>

            <CardContent>
                <Skeleton className="h-[350px] w-full" />

            </CardContent>
        </Card>

    }


    return (
        <div>

            <Card className="border-none drop-shadow-sm">

                <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">

                    <CardTitle className="text-xl line-clamp-1">
                        Orders
                    </CardTitle>





                </CardHeader>

                <CardContent>


                    {
                        data?.response?.length == 0 ? <div className="flex flex-col gap-y-4 items-center justify-center h-[350px] w-full">

                            <FileSearch className="size-6 text-muted-foreground" />

                            <p className="text-muted-foreground text-xl">
                                No data found for this period.
                            </p>

                        </div> :
                            <Pievariants data={data?.response} />

                    }



                </CardContent>

            </Card >

        </div >
    )
}

export default Orderpie
