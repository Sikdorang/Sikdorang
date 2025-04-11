import { create } from 'zustand';

interface DeleteMenuStore {
  deleteMenuItem: ((id: number) => void) | null;
  setDeleteHandler: (handler: (id: number) => void) => void;
  clearDeleteHandler: () => void;
}

export const useDeleteMenuStore = create<DeleteMenuStore>((set) => ({
  deleteMenuItem: null,
  setDeleteHandler: (handler) => set({ deleteMenuItem: handler }),
  clearDeleteHandler: () => set({ deleteMenuItem: null }),
}));
