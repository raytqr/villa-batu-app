import { create } from 'zustand';
import { Villa } from '@/lib/types';

interface CompareStore {
    villas: Villa[];
    maxVillas: number;
    isOpen: boolean;
    addVilla: (villa: Villa) => void;
    removeVilla: (id: string) => void;
    clearAll: () => void;
    isInCompare: (id: string) => boolean;
    openModal: () => void;
    closeModal: () => void;
    toggleModal: () => void;
}

export const useCompareStore = create<CompareStore>((set, get) => ({
    villas: [],
    maxVillas: 3,
    isOpen: false,

    addVilla: (villa) => {
        const { villas, maxVillas } = get();
        if (villas.length >= maxVillas) {
            // Remove first and add new one
            set({ villas: [...villas.slice(1), villa] });
        } else if (!villas.find(v => v.id === villa.id)) {
            set({ villas: [...villas, villa] });
        }
    },

    removeVilla: (id) => {
        set({ villas: get().villas.filter(v => v.id !== id) });
    },

    clearAll: () => {
        set({ villas: [], isOpen: false });
    },

    isInCompare: (id) => {
        return get().villas.some(v => v.id === id);
    },

    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),
    toggleModal: () => set({ isOpen: !get().isOpen }),
}));
