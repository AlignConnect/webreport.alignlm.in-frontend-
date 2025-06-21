import { create } from 'zustand'

type update = {
    id: string,
    name: string,
    token: string
}

type updateCacheState = {
    isOpen: boolean,
    data: Record<string, string>
    onOpen: (data: update) => void,
    onClose: () => void
}

export const useNewUpdateCache = create<updateCacheState>((set) => ({
    isOpen: false,
    data: {},
    onOpen: (data) => set({ isOpen: true, data }),
    onClose: () => set({ isOpen: false })
}));
