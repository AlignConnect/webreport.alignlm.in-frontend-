import { create } from "zustand";

type UserProps = {
    user?: string;
    onSelect: (user: string) => void;
    onClose: () => void
}


export const useSelectUser = create<UserProps>((set) => {
    return {
        user: undefined,
        onSelect: (user: string) => set({ user }),
        onClose: () => set({ user: "" }) // Reset the user state when closing
    }

}) 