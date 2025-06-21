import { create } from 'zustand'

type newConversionState = {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void
}

export const useNewConversion = create<newConversionState>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));
