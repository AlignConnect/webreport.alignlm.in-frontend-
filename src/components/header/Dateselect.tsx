
import * as React from "react"
import { endOfDay, format, startOfDay } from "date-fns"
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
import { useDateSelectWebsite } from "@/features/websites/hooks/use-dateselect-websites"

const Dateselect = () => {
    const [mydate, setDate] = React.useState<DateRange | undefined>({
        from: startOfDay(new Date()),
        to: endOfDay(new Date()),
    });


    const { date, onDateChange } = useDateSelectWebsite();

    const [open, setOpen] = React.useState(false); // <-- Popover open state

    const handleDateFilter = () => {
        onDateChange({
            to: mydate?.to,
            from: mydate?.from,
        });
        setOpen(false); // <-- Close popover after applying
    };

    const handleReset = () => {
        const todayRange = {
            from: startOfDay(new Date()),
            to: endOfDay(new Date()),
        };
        setDate(todayRange);
        onDateChange(todayRange);
        setOpen(false); // <-- Close popover after reset
    };

    return (
        <div className={cn("grid gap-2")}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-[350px] justify-center cursor-pointer text-left font-normal bg-white/15 border-none hover:text-white text-white hover:bg-white/40"
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
                    />


                        


                    <div className="px-2 flex w-full items-center gap-1 py-2">
                        <Button
                            className="flex-1/2 rounded-sm cursor-pointer"
                            variant={"outline"}
                            onClick={handleReset}
                        >
                            Reset
                        </Button>
                        <Button
                            className="flex-1/2 rounded-sm bg-blue-500 hover:bg-blue-600 hover:text-white text-white cursor-pointer"
                            variant={"outline"}
                            onClick={handleDateFilter}
                        >
                            Apply
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};


export default Dateselect






