import { create } from 'zustand'

type updateWebsiteState = {
    id?: string,
    isOpen: boolean,
    onOpen: (id: string) => void,
    onClose: () => void
}



export const useUpdateWebsite = create<updateWebsiteState>((set) => ({
    id: undefined,
    isOpen: false,
    onOpen: (id: string) => set({ isOpen: true, id }),
    onClose: () => set({ isOpen: false, id: undefined })
}));
