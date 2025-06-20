import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface IsDownloadedStore {
  isDownload: string;
  setIsDownload: (isDownload: string) => void;
  clearIsDownload: () => void;
}

const useIsDownloadedStore = create<IsDownloadedStore>()(
  persist(
    (set) => ({
      isDownload: '',
      setIsDownload: (isDownload: string) => set({ isDownload }),
      clearIsDownload: () => set({ isDownload: '' }),
    }),
    {
      name: "isDownloaded", 
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useIsDownloadedStore;
