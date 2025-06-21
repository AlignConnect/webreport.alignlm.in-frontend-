import { create } from 'zustand'

type newWCacheState = {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void
}

export const useNewCache = create<newWCacheState>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));
