import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface RedeemCodesStore {
  redeemcodes: string;
  setRedeemcodes: (characterid: string) => void;
  clearRedeemcodes: () => void;
}

const useRedeemCodesStore = create<RedeemCodesStore>()(
  persist(
    (set) => ({
      redeemcodes: "",
      setRedeemcodes: (redeemcodes: string) => set({ redeemcodes }),
      clearRedeemcodes: () => set({ redeemcodes: "" }),
    }),
    {
      name: "redeemed", 
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useRedeemCodesStore;
