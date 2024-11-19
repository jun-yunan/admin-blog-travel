import { create } from 'zustand';

interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  isOpenDialog: boolean;
  openDialog: () => void;
  isReloaded: boolean;
  setReloaded: () => void;
}

const useStore = create<CounterState>((set) => ({
  count: 0,
  isOpenDialog: false,
  isReloaded: false,
  setReloaded: () => set((state) => ({ isReloaded: !state.isReloaded })),
  openDialog: () => set((state) => ({ isOpenDialog: !state.isOpenDialog })),
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

export default useStore;
