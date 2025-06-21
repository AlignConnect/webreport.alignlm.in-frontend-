import { create } from "zustand"

type invitation = {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void
}


export const useCreateInvitationHook = create<invitation>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })

}))