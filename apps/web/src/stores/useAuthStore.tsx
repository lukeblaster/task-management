import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

type User = {
  username: string;
  email: string;
};

interface AuthState {
  user: User;
  updateUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: { username: "", email: "" },
        updateUser: (newUser: User) => set({ user: newUser }),
      }),
      {
        name: "auth-storage",
      }
    )
  )
);
