import { create } from 'zustand'

type update = {
    id: string,
    name: string,
    shopifyId: string
}

type updateShopifyState = {
    isOpen: boolean,
    data: Record<string, string>
    onOpen: (data: update) => void,
    onClose: () => void
}

export const useNewUpdateShopify = create<updateShopifyState>((set) => ({
    isOpen: false,
    data: {},
    onOpen: (data) => set({ isOpen: true, data }),
    onClose: () => set({ isOpen: false })
}));
