import { DateRange } from 'react-day-picker';
import { create } from 'zustand'
import { endOfDay, startOfDay } from 'date-fns'
type dateSelectState = {
    date: DateRange
    onDateChange: (date: { to?: Date; from?: Date }) => void;
    onDateReset: () => void
}



export const useDateSelectOverview = create<dateSelectState>((set) => ({
    date: {
        to: startOfDay(new Date()),
        from: endOfDay(new Date())
    },
    onDateChange: (date: { to?: Date, from?: Date }) => {

        return set({
            date: {
                from: date.from,
                to: date.to
            }
        })

    },
    onDateReset: () => set({
        date: { to: startOfDay(new Date()), from: endOfDay(new Date()) },
    }),
}));
