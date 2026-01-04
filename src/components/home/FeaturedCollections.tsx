'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight, Flame, Sparkles, Wallet } from 'lucide-react';
import { Villa } from '@/lib/types';
import { VillaCard } from '@/components/villa/VillaCard';
import { motion } from 'framer-motion';

interface FeaturedCollectionsProps {
    villas: Villa[];
}

export function FeaturedCollections({ villas }: FeaturedCollectionsProps) {
    const collections = [
        {
            id: 'trending',
            title: 'Sedang Trending',
            subtitle: 'Villa paling dicari minggu ini',
            icon: Flame,
            color: 'from-orange-500 to-pink-500',
            villas: villas.filter(v => v.isTrending),
        },
        {
            id: 'luxury',
            title: 'Koleksi Luxury',
            subtitle: 'Pengalaman premium untuk momen spesial',
            icon: Sparkles,
            color: 'from-amber-500 to-yellow-400',
            villas: villas.filter(v => v.isLuxury),
        },
        {
            id: 'budget',
            title: 'Budget Friendly',
            subtitle: 'Liburan hemat tanpa kompromi kualitas',
            icon: Wallet,
            color: 'from-green-500 to-emerald-400',
            villas: villas.filter(v => v.isBudget),
        },
    ];

    return (
        <section className="section-padding bg-fog-50">
            <div className="container-custom">
                <div className="space-y-16">
                    {collections.map((collection, idx) => (
                        <CollectionRow key={collection.id} collection={collection} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
}

interface CollectionRowProps {
    collection: {
        id: string;
        title: string;
        subtitle: string;
        icon: React.ComponentType<{ className?: string }>;
        color: string;
        villas: Villa[];
    };
    index: number;
}

function CollectionRow({ collection, index }: CollectionRowProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = direction === 'left' ? -400 : 400;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    if (collection.villas.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${collection.color} text-white shadow-lg`}>
                        <collection.icon className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-fog-800">{collection.title}</h2>
                        <p className="text-fog-500">{collection.subtitle}</p>
                    </div>
                </div>

                {/* Navigation */}
                <div className="hidden md:flex items-center gap-2">
                    <button
                        onClick={() => scroll('left')}
                        className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
                    >
                        <ChevronLeft className="w-5 h-5 text-fog-600" />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
                    >
                        <ChevronRight className="w-5 h-5 text-fog-600" />
                    </button>
                </div>
            </div>

            {/* Cards Carousel */}
            <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
            >
                {collection.villas.map((villa, villaIdx) => (
                    <div key={villa.id} className="flex-shrink-0 w-[300px] md:w-[340px]">
                        <VillaCard villa={villa} index={villaIdx} />
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
