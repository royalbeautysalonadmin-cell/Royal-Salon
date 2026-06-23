import { create } from "zustand";

interface BookingState {
  /** Controls the global booking dialog/drawer. */
  isOpen: boolean;
  /** Pre-selected service slug when opening the dialog from a service card. */
  preselectedService: string | null;
  open: (service?: string) => void;
  close: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  isOpen: false,
  preselectedService: null,
  open: (service) => set({ isOpen: true, preselectedService: service ?? null }),
  close: () => set({ isOpen: false, preselectedService: null }),
}));
