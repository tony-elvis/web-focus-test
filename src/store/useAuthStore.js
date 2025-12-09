import create from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      setUser: (user, token) => set({ user, token }),
      logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null });
      },
      getUser: () => get().user,
      getToken: () => get().token
    }),
    {
      name: 'auth',
      getStorage: () => localStorage
    }
  )
);
