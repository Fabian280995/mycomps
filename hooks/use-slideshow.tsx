import { create } from "zustand";

interface useSlideshowProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useSlideshow = create<useSlideshowProps>((set, get) => ({
  isOpen: true,
  onOpen: () => set(() => ({ isOpen: true })),
  onClose: () => set(() => ({ isOpen: false })),
}));
