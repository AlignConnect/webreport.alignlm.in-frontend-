import { DateRange } from 'react-day-picker';
import { create } from 'zustand'
import { endOfWeek, startOfWeek } from 'date-fns'
type dateSelectState = {
    date: DateRange
    onDateChange: (date: { to?: Date; from: Date }) => void;
    onDateReset: () => void
}



export const useDateSelectDashboard = create<dateSelectState>((set) => ({
    date: {
        from: startOfWeek(new Date()),
        to: endOfWeek(new Date()),
    },
    onDateChange: (date: { to?: Date, from: Date }) => {

        return set({
            date: {
                from: date.from,
                to: date?.to ?? date.from
            }
        })

    },
    onDateReset: () => set({
        date: { to: endOfWeek(new Date()), from: startOfWeek(new Date()) },
    }),
}));
