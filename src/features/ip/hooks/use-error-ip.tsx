import { create } from "zustand";

type ErrorState = {
    isCriticalError: boolean;
    setCriticalError: (isCritical: boolean) => void;
};


export const useErrorStore = create<ErrorState>((set) => ({
    isCriticalError: false,
    setCriticalError: (isCritical) => set({ isCriticalError: isCritical })
}))