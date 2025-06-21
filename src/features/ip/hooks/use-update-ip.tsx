import { create } from 'zustand'

type update = {
    id: string,
    name: string,
    ip_address: string
}

type updateIPState = {
    isOpen: boolean,
    data: Record<string, string>
    onOpen: (data: update) => void,
    onClose: () => void
}

export const useUpdateIP = create<updateIPState>((set) => ({
    isOpen: false,
    data: {},
    onOpen: (data) => set({ isOpen: true, data }),
    onClose: () => set({ isOpen: false })
}));
