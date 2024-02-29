import { create } from "zustand";

interface useUserStoreProps {
  driver: {
    id: string | null;
    email: string | null;
    name: string | null;
  };
  setDriver: (driver: {
    id: string | null;
    email: string | null;
    name: string | null;
  }) => void;
}

export const useDriverStore = create<useUserStoreProps>((set) => ({
  driver: {
    id: "",
    name: "",
    email: "",
  },
  setDriver: (driver) => set({ driver: driver }),
}));
