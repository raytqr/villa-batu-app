import { create } from 'zustand';
import { FilterState, Villa } from '@/lib/types';

interface FilterStore extends FilterState {
    setCheckIn: (date: Date | null) => void;
    setCheckOut: (date: Date | null) => void;
    setPriceRange: (range: [number, number]) => void;
    setHasPool: (value: boolean | null) => void;
    setPetAllowed: (value: boolean | null) => void;
    setViewType: (type: Villa['viewType'] | null) => void;
    setMinCapacity: (capacity: number) => void;
    setArea: (area: string | null) => void;
    resetFilters: () => void;
    getActiveFiltersCount: () => number;
}

const initialState: FilterState = {
    checkIn: null,
    checkOut: null,
    priceRange: [0, 10000000],
    hasPool: null,
    petAllowed: null,
    viewType: null,
    minCapacity: 1,
    area: null,
};

export const useFilterStore = create<FilterStore>((set, get) => ({
    ...initialState,

    setCheckIn: (date) => set({ checkIn: date }),
    setCheckOut: (date) => set({ checkOut: date }),
    setPriceRange: (range) => set({ priceRange: range }),
    setHasPool: (value) => set({ hasPool: value }),
    setPetAllowed: (value) => set({ petAllowed: value }),
    setViewType: (type) => set({ viewType: type }),
    setMinCapacity: (capacity) => set({ minCapacity: capacity }),
    setArea: (area) => set({ area }),

    resetFilters: () => set(initialState),

    getActiveFiltersCount: () => {
        const state = get();
        let count = 0;
        if (state.checkIn) count++;
        if (state.checkOut) count++;
        if (state.priceRange[0] > 0 || state.priceRange[1] < 10000000) count++;
        if (state.hasPool !== null) count++;
        if (state.petAllowed !== null) count++;
        if (state.viewType !== null) count++;
        if (state.minCapacity > 1) count++;
        if (state.area !== null) count++;
        return count;
    },
}));
