import { create } from "zustand"

type props = {
    isOpen: boolean,
    onOpen: () => void,
    onclose: () => void
}

export const useSearchImage = create<props>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onclose: () => set({ isOpen: false })
}))