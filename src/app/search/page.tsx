'use client';

import { Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { FilterBar } from '@/components/villa/FilterBar';
import { VillaCard } from '@/components/villa/VillaCard';
import { useFilterStore } from '@/store/useFilterStore';
import { villas } from '@/lib/mock-data';
import { Search, SortDesc } from 'lucide-react';

function SearchContent() {
    const searchParams = useSearchParams();
    const { priceRange, hasPool, viewType, minCapacity, area } = useFilterStore();

    // Get query params for collections
    const collection = searchParams.get('collection');
    const areaParam = searchParams.get('area');

    const filteredVillas = useMemo(() => {
        let result = [...villas];

        // Filter by collection
        if (collection === 'trending') {
            result = result.filter(v => v.isTrending);
        } else if (collection === 'luxury') {
            result = result.filter(v => v.isLuxury);
        } else if (collection === 'budget') {
            result = result.filter(v => v.isBudget);
        }

        // Filter by area (from URL or store)
        const activeArea = areaParam || area;
        if (activeArea) {
            result = result.filter(v => v.location.area.toLowerCase().replace(' ', '-') === activeArea);
        }

        // Filter by price range
        result = result.filter(v => v.price >= priceRange[0] && v.price <= priceRange[1]);

        // Filter by pool
        if (hasPool !== null) {
            result = result.filter(v => v.hasPool === hasPool);
        }

        // Filter by view type
        if (viewType) {
            result = result.filter(v => v.viewType === viewType);
        }

        // Filter by capacity
        if (minCapacity > 1) {
            result = result.filter(v => v.capacity >= minCapacity);
        }

        return result;
    }, [collection, areaParam, area, priceRange, hasPool, viewType, minCapacity]);

    const getTitle = () => {
        if (collection === 'trending') return 'Villa Trending';
        if (collection === 'luxury') return 'Villa Luxury';
        if (collection === 'budget') return 'Villa Budget Friendly';
        if (areaParam || area) return `Villa di ${areaParam || area}`;
        return 'Semua Villa';
    };

    return (
        <div className="pt-20 min-h-screen bg-fog-50">
            {/* Header */}
            <div className="bg-white border-b border-fog-100">
                <div className="container-custom py-8">
                    <h1 className="text-3xl font-bold text-fog-800 mb-2">{getTitle()}</h1>
                    <p className="text-fog-500">{filteredVillas.length} villa ditemukan</p>
                </div>
            </div>

            {/* Content */}
            <div className="container-custom py-8">
                <div className="flex gap-8">
                    {/* Filter Sidebar */}
                    <FilterBar />

                    {/* Results */}
                    <div className="flex-1">
                        {/* Sort Bar */}
                        <div className="bg-white rounded-2xl p-4 mb-6 flex items-center justify-between shadow-sm">
                            <div className="flex items-center gap-2 text-fog-600">
                                <Search className="w-5 h-5" />
                                <span>{filteredVillas.length} villa tersedia</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <SortDesc className="w-5 h-5 text-fog-400" />
                                <select className="bg-transparent text-fog-700 font-medium focus:outline-none cursor-pointer">
                                    <option>Paling Populer</option>
                                    <option>Harga Terendah</option>
                                    <option>Harga Tertinggi</option>
                                    <option>Rating Tertinggi</option>
                                </select>
                            </div>
                        </div>

                        {/* Villa Grid */}
                        {filteredVillas.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredVillas.map((villa, index) => (
                                    <VillaCard key={villa.id} villa={villa} index={index} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl p-12 text-center">
                                <div className="w-24 h-24 bg-fog-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="w-12 h-12 text-fog-300" />
                                </div>
                                <h3 className="text-xl font-semibold text-fog-800 mb-2">
                                    Tidak ada villa ditemukan
                                </h3>
                                <p className="text-fog-500">
                                    Coba ubah filter pencarian Anda untuk menemukan villa yang sesuai
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="min-h-screen pt-20 flex items-center justify-center text-fog-500">Loading...</div>}>
            <SearchContent />
        </Suspense>
    );
}
