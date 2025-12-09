import create from 'zustand';

export const useUserStore = create((set) => ({
  user: [],
  setUser: (user) => set({ user }),
  removeUser: (ids) => {
    set((state) => ({
      user: state.user.filter((item) => !ids.includes(item._id))
    }));
  },
  addUser: (user) => {
    set((state) => ({
      user: [...state.user, user]
    }));
  },
  updateUser: (user) => {
    set((state) => ({
      user: state.user.map((item) => {
        if (item._id === user._id) {
          return user;
        }
        return item;
      })
    }));
  }
}));
