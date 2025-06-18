import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CategoryStore {
  category: string;
  setCategory: (category: string) => void;
  clearCategory: () => void;
}

const useCategoryStore = create<CategoryStore>()(
  persist(
    (set) => ({
      category: "",
      setCategory: (category: string) => set({ category }),
      clearCategory: () => set({ category: "" }),
    }),
    {
      name: "redeemed", 
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCategoryStore;
