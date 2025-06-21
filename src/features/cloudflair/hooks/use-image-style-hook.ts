import { create } from "zustand"

type Imagestyle = {
    imageStyle: boolean,
    onImageStyleChange: () => void
}



export const useImageStyle = create<Imagestyle>((set) => ({
    imageStyle: true,
    onImageStyleChange: () => set((state) => ({ imageStyle: !state.imageStyle }))
}))