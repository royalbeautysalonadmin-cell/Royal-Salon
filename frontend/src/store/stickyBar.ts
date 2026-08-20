import { create } from "zustand";

interface StickyBarState {
  visible: boolean;
  setVisible: (v: boolean) => void;
}

export const useStickyBarStore = create<StickyBarState>((set) => ({
  visible: false,
  setVisible: (v) => set({ visible: v }),
}));
