import { create } from "zustand";

interface useUserStoreProps {
  details: {
    phoneNumber: number | null;
    deliveryAddress: string | null;
  };
  setDetails: (details: {
    phoneNumber: number | null;
    deliveryAddress: string | null;
  }) => void;
}

export const useDriverStore = create<useUserStoreProps>((set) => ({
  details: {
    phoneNumber: 0,
    deliveryAddress: "",
  },
  setDetails: (details) => set({ details: details }),
}));
