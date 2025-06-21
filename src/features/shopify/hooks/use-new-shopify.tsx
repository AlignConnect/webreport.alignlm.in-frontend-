import { create } from 'zustand'

type newWShopifyState = {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void
}

export const useNewShopify = create<newWShopifyState>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));
