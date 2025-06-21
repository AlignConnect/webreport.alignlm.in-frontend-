import { format, subDays } from "date-fns";

type Period = {
    from: Date | string | undefined,
    to: Date | string | undefined,
}

export function formatDateRange(period: Period) {

    const defaultTo = new Date();
    const defaultFrom = subDays(defaultTo, 30);


    if (!period?.from) {
        return `${format(defaultFrom, "LLL dd")} - ${format(defaultTo, "LLL dd y")}`;
    }

    if (period?.to) {
        return `${format(period.from, "LLL dd")} - ${format(period.to, "LLL dd y")}`;
    }


    return format(period.from, "LLL dd y");

}