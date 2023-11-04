import { create } from "zustand";

const useUserId = create((set) => ({
  userId: "",
  setUserId: (newUserId) => set(() => ({ userId: newUserId })),
}));

export default useUserId;
