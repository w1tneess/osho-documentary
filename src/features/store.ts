import { create } from 'zustand';

interface AppState {
  // High-frequency 3D progress [0, 1] mapped to the score
  scrollProgress: number;
  
  // Low-frequency UI state
  sectionIndex: number;
  chapterIndex: number;
  readProgress: number;

  // Actions
  setScrollProgress: (progress: number) => void;
  setSectionState: (sectionIndex: number, chapterIndex: number, readProgress: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  scrollProgress: 0,
  sectionIndex: 0,
  chapterIndex: -1,
  readProgress: 0,

  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  
  setSectionState: (sectionIndex, chapterIndex, readProgress) => 
    set((state) => {
      // Only update if values actually changed to prevent re-renders
      if (
        state.sectionIndex === sectionIndex &&
        state.chapterIndex === chapterIndex &&
        state.readProgress === readProgress
      ) {
        return state;
      }
      return { sectionIndex, chapterIndex, readProgress };
    }),
}));
