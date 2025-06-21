import { create } from 'zustand'
type counterState = {
    orderCount: number
    setOrderCount: (count: number) => void
}


export const useOrderCount = create<counterState>((set) => ({
    orderCount: 0,
    setOrderCount: (count: number) => set({ orderCount: count })

}));
