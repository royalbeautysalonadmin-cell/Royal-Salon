import { create } from "zustand";

interface BookingState {
  isOpen: boolean;
  /** Service slug to pre-select when the dialog opens, if any. */
  preselectedService?: string;
  open: (serviceSlug?: string) => void;
  close: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  isOpen: false,
  preselectedService: undefined,
  open: (serviceSlug) => set({ isOpen: true, preselectedService: serviceSlug }),
  close: () => set({ isOpen: false }),
}));
