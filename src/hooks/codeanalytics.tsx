import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AnalyticStatePopup {
  state: boolean;
  setState: (state: boolean) => void;
  clearState: () => void;
}

const useAnalyticStatePopup = create<AnalyticStatePopup>()(
  persist(
    (set) => ({
      state: false,
      setState: (state: boolean) => set({ state }),
      clearState: () => set({ state: false }),
    }),
    {
      name: "popupstate", 
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAnalyticStatePopup;
