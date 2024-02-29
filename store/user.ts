import { create } from "zustand";

interface useUserStoreProps {
  user: {
    isLoggedIn: boolean;
    id: string | null;
    email: string | null;
    Name: string | null;
    photo: string | null;
    role: string | null;
  };
  setUser: (user: {
    isLoggedIn: boolean;
    id: string | null;
    email: string | null;
    Name: string | null;
    photo: string | null;
    role: string | null;
  }) => void;
}

export const useUserStore = create<useUserStoreProps>((set) => ({
  user: {
    isLoggedIn: false,
    id: "",
    email: "",
    Name: "",
    photo: "",
    role: "",
  },
  setUser: (user) => set({ user: user }),
}));
