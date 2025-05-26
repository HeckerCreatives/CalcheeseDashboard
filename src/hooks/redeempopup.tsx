import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface RedeemStatePopup {
  state: boolean;
  setState: (state: boolean) => void;
  clearState: () => void;
}

const useRedeemStatePopup = create<RedeemStatePopup>()(
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

export default useRedeemStatePopup;
