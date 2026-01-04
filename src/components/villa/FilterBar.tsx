'use client';

import { useState } from 'react';
import {
    SlidersHorizontal,
    Calendar,
    Waves,
    Mountain,
    Building,
    TreeDeciduous,
    X,
    RotateCcw
} from 'lucide-react';
import { useFilterStore } from '@/store/useFilterStore';
import { formatPrice, cn } from '@/lib/utils';
import { areas } from '@/lib/mock-data';
import { Villa } from '@/lib/types';
import { CustomDropdown } from '@/components/ui/CustomDropdown';

export function FilterBar() {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const {
        checkIn,
        checkOut,
        priceRange,
        hasPool,
        petAllowed,
        viewType,
        minCapacity,
        area,
        setCheckIn,
        setCheckOut,
        setPriceRange,
        setHasPool,
        setPetAllowed,
        setViewType,
        setMinCapacity,
        setArea,
        resetFilters,
        getActiveFiltersCount,
    } = useFilterStore();

    const activeFilters = getActiveFiltersCount();

    const viewTypes: { value: Villa['viewType'] | null; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
        { value: null, label: 'Semua', icon: SlidersHorizontal },
        { value: 'mountain', label: 'Gunung', icon: Mountain },
        { value: 'city', label: 'Kota', icon: Building },
        { value: 'garden', label: 'Taman', icon: TreeDeciduous },
        { value: 'rice-field', label: 'Sawah', icon: TreeDeciduous },
    ];

    const capacityOptions = [
        { value: 1, label: 'Semua' },
        { value: 2, label: '1-2 tamu' },
        { value: 4, label: '3-4 tamu' },
        { value: 6, label: '5-6 tamu' },
        { value: 10, label: '7-10 tamu' },
        { value: 15, label: '10+ tamu' },
    ];

    const FilterContent = () => (
        <div className="space-y-6">
            {/* Reset Button */}
            {activeFilters > 0 && (
                <button
                    onClick={resetFilters}
                    className="flex items-center gap-2 text-pine-600 hover:text-pine-700 font-medium w-full justify-center py-2 bg-pine-50 rounded-xl"
                >
                    <RotateCcw className="w-4 h-4" />
                    Reset Filter ({activeFilters})
                </button>
            )}

            {/* Date Range */}
            <div>
                <label className="block text-sm font-semibold text-fog-700 mb-3">Tanggal</label>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="text-xs text-fog-500">Check-in</label>
                        <div className="relative mt-1">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fog-400" />
                            <input
                                type="date"
                                value={checkIn ? checkIn.toISOString().split('T')[0] : ''}
                                onChange={(e) => setCheckIn(e.target.value ? new Date(e.target.value) : null)}
                                className="w-full pl-10 pr-3 py-2.5 border border-fog-200 rounded-xl text-sm focus:border-pine-500 focus:ring-2 focus:ring-pine-500/20 outline-none"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs text-fog-500">Check-out</label>
                        <div className="relative mt-1">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fog-400" />
                            <input
                                type="date"
                                value={checkOut ? checkOut.toISOString().split('T')[0] : ''}
                                onChange={(e) => setCheckOut(e.target.value ? new Date(e.target.value) : null)}
                                className="w-full pl-10 pr-3 py-2.5 border border-fog-200 rounded-xl text-sm focus:border-pine-500 focus:ring-2 focus:ring-pine-500/20 outline-none"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Price Range */}
            <div>
                <label className="block text-sm font-semibold text-fog-700 mb-3">
                    Rentang Harga
                </label>
                <div className="px-2">
                    <div className="flex justify-between text-sm text-fog-600 mb-2">
                        <span>{formatPrice(priceRange[0])}</span>
                        <span>{formatPrice(priceRange[1])}</span>
                    </div>
                    <input
                        type="range"
                        min={0}
                        max={10000000}
                        step={500000}
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full accent-pine-500"
                    />
                </div>
            </div>

            {/* Area */}
            <div>
                <label className="block text-sm font-semibold text-fog-700 mb-3">Area</label>
                <CustomDropdown
                    options={[
                        { value: '', label: 'Semua Area' },
                        ...areas.map(a => ({ value: a.id, label: `${a.name} (${a.villaCount} villa)` }))
                    ]}
                    value={area || ''}
                    onChange={(val) => setArea(val || null)}
                    placeholder="Semua Area"
                    variant="default"
                />
            </div>

            {/* Pool */}
            <div>
                <label className="block text-sm font-semibold text-fog-700 mb-3">Kolam Renang</label>
                <div className="flex gap-2">
                    {[
                        { value: null, label: 'Semua' },
                        { value: true, label: 'Ada Pool' },
                        { value: false, label: 'Tanpa Pool' },
                    ].map((option) => (
                        <button
                            key={String(option.value)}
                            onClick={() => setHasPool(option.value)}
                            className={cn(
                                "flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all",
                                hasPool === option.value
                                    ? "bg-pine-500 text-white"
                                    : "bg-fog-100 text-fog-600 hover:bg-fog-200"
                            )}
                        >
                            {option.value === true && <Waves className="w-4 h-4 inline mr-1" />}
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Pet Allowed */}
            <div>
                <label className="block text-sm font-semibold text-fog-700 mb-3">🐾 Bawa Hewan</label>
                <div className="flex gap-2">
                    {[
                        { value: null, label: 'Semua' },
                        { value: true, label: 'Boleh' },
                        { value: false, label: 'Tidak' },
                    ].map((option) => (
                        <button
                            key={String(option.value)}
                            onClick={() => setPetAllowed(option.value)}
                            className={cn(
                                "flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all",
                                petAllowed === option.value
                                    ? "bg-pine-500 text-white"
                                    : "bg-fog-100 text-fog-600 hover:bg-fog-200"
                            )}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* View Type */}
            <div>
                <label className="block text-sm font-semibold text-fog-700 mb-3">Tipe View</label>
                <div className="grid grid-cols-2 gap-2">
                    {viewTypes.map((type) => (
                        <button
                            key={String(type.value)}
                            onClick={() => setViewType(type.value)}
                            className={cn(
                                "py-2.5 px-4 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2",
                                viewType === type.value
                                    ? "bg-pine-500 text-white"
                                    : "bg-fog-100 text-fog-600 hover:bg-fog-200"
                            )}
                        >
                            <type.icon className="w-4 h-4" />
                            {type.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Capacity */}
            <div>
                <label className="block text-sm font-semibold text-fog-700 mb-3">Kapasitas Tamu</label>
                <div className="grid grid-cols-3 gap-2">
                    {capacityOptions.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => setMinCapacity(option.value)}
                            className={cn(
                                "py-2.5 px-3 rounded-xl text-sm font-medium transition-all",
                                minCapacity === option.value
                                    ? "bg-pine-500 text-white"
                                    : "bg-fog-100 text-fog-600 hover:bg-fog-200"
                            )}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-80 shrink-0">
                <div className="bg-white rounded-2xl p-6 shadow-card sticky top-24">
                    <div className="flex items-center gap-2 mb-6">
                        <SlidersHorizontal className="w-5 h-5 text-pine-500" />
                        <h3 className="font-semibold text-fog-800">Filter</h3>
                        {activeFilters > 0 && (
                            <span className="px-2 py-0.5 bg-pine-100 text-pine-600 text-xs font-medium rounded-full">
                                {activeFilters}
                            </span>
                        )}
                    </div>
                    <FilterContent />
                </div>
            </div>

            {/* Mobile Filter Button */}
            <button
                onClick={() => setIsMobileOpen(true)}
                className="lg:hidden fixed bottom-24 right-4 z-40 bg-pine-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 font-medium"
            >
                <SlidersHorizontal className="w-5 h-5" />
                Filter
                {activeFilters > 0 && (
                    <span className="w-6 h-6 bg-white text-pine-600 rounded-full flex items-center justify-center text-sm font-bold">
                        {activeFilters}
                    </span>
                )}
            </button>

            {/* Mobile Filter Modal */}
            {isMobileOpen && (
                <div className="lg:hidden fixed inset-0 z-50">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileOpen(false)} />
                    <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[80vh] overflow-auto">
                        <div className="sticky top-0 bg-white p-4 border-b border-fog-100 flex items-center justify-between">
                            <h3 className="font-semibold text-fog-800">Filter</h3>
                            <button onClick={() => setIsMobileOpen(false)}>
                                <X className="w-6 h-6 text-fog-600" />
                            </button>
                        </div>
                        <div className="p-6">
                            <FilterContent />
                        </div>
                        <div className="sticky bottom-0 bg-white p-4 border-t border-fog-100">
                            <button
                                onClick={() => setIsMobileOpen(false)}
                                className="w-full btn-primary"
                            >
                                Terapkan Filter
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
