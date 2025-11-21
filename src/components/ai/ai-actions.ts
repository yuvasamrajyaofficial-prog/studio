'use client';
import { create } from 'zustand';

type AIState = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const useAIState = create<AIState>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));
