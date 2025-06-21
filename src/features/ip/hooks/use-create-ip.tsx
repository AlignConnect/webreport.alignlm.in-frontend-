import { create } from "zustand"

type ip = {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void
}


export const useNewIP = create<ip>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))