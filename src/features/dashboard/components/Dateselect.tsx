
import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useDateSelectDashboard } from "../hooks/use-dateselect-dashboard"
import { PopoverClose } from "@radix-ui/react-popover"


const Dateselect = () => {

    const { date, onDateChange, onDateReset } = useDateSelectDashboard();


    const [mydate, setDate] = React.useState<DateRange | undefined>(date)

    console.log(mydate)


    const handleDateFilter = () => {
        onDateChange({
            from: mydate?.from ?? new Date(),
            to: mydate?.to ?? mydate?.from
        })
    }




    return (
        <div className={cn("grid gap-2",)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-[350px] justify-center cursor-pointer text-left font-normal bg-white/15 border-none hover:text-white text-white hover:bg-white/40",

                        )}
                    >
                        <CalendarIcon />
                        {date.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date.from}
                        selected={mydate}
                        onSelect={setDate}
                        numberOfMonths={2}
                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                        className=""
                    />


                    <div className=" px-2 flex w-full items-center gap-1 py-2">

                        <PopoverClose asChild>

                            <Button className="flex-1/2 rounded-sm cursor-pointer" variant={"outline"} onClick={onDateReset}>
                                Reset
                            </Button>
                        </PopoverClose>


                        <PopoverClose asChild>
                            <Button
                                className="flex-1/2 rounded-sm bg-blue-500 hover:bg-blue-600 hover:text-white text-white cursor-pointer"
                                variant={"outline"}
                                onClick={() => {
                                    handleDateFilter();
                                    // Add any additional logic here
                                }}
                            >
                                Apply
                            </Button>
                        </PopoverClose>


                    </div>



                </PopoverContent>
            </Popover>
        </div>
    )
}

export default Dateselect






