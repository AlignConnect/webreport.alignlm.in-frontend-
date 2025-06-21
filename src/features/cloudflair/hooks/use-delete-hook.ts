import { create } from "zustand";

type DeleteCloudeFlairStore = {
    DeleteCloudeFlairArray: string[];
    onDeleteImage: (image: string) => void;
    onResetImage: () => void
};

const useDeleteCloudeFlairImage = create<DeleteCloudeFlairStore>((set) => ({
    DeleteCloudeFlairArray: [],

    onDeleteImage: (image: string) =>
        set((state) => {
            const exist = state.DeleteCloudeFlairArray.includes(image);
            return {
                DeleteCloudeFlairArray: exist ? state.DeleteCloudeFlairArray.filter((e) => e !== image) : [...state.DeleteCloudeFlairArray, image]
            }
        }),
    onResetImage: () => set((_) => {

        return {
            DeleteCloudeFlairArray: []
        }

    })



}));

export default useDeleteCloudeFlairImage;
