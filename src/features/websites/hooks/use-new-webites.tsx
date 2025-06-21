import { create } from 'zustand'

type newWebsiteState = {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void
}



export const useNewWebsite = create<newWebsiteState>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));
