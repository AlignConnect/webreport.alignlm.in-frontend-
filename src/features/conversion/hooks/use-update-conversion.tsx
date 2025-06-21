import { create } from 'zustand'

type update = {
    id: string,
    websites: string
}

type updateConversionState = {
    isOpen: boolean,
    data: Record<string, string>
    onOpen: (data: update) => void,
    onClose: () => void
}

export const useNewUpdateConversion = create<updateConversionState>((set) => ({
    isOpen: false,
    data: {},
    onOpen: (data) => set({ isOpen: true, data }),
    onClose: () => set({ isOpen: false })
}));
