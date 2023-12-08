import { create } from "zustand";

const useUserId = create((set) => ({
  userId: "",
  setUserId: (newUserId) => set(() => ({ userId: newUserId })),
}));

// const useUserIsLogged = create((set) => ({
//   userIsLogged: false,
//   setUserIsLogged: () => set({ userIsLogged: true }),
// }));

export default useUserId;
