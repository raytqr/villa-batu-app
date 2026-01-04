'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Users, BedDouble, Waves, MapPin, Star, GitCompare } from 'lucide-react';
import { Villa } from '@/lib/types';
import { formatPrice, cn } from '@/lib/utils';
import { useCompareStore } from '@/store/useCompareStore';
import { motion } from 'framer-motion';

interface VillaCardProps {
    villa: Villa;
    index?: number;
}

export function VillaCard({ villa, index = 0 }: VillaCardProps) {
    const { addVilla, removeVilla, isInCompare } = useCompareStore();
    const inCompare = isInCompare(villa.id);

    const handleCompareClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (inCompare) {
            removeVilla(villa.id);
        } else {
            addVilla(villa);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
        >
            <Link href={`/villa/${villa.slug}`}>
                <article className="villa-card group cursor-pointer">
                    {/* Image Container */}
                    <div className="relative h-56 md:h-64 overflow-hidden">
                        <Image
                            src={villa.images[0]}
                            alt={villa.name}
                            fill
                            className="object-cover img-hover-zoom group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                            {villa.isTrending && (
                                <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-semibold rounded-full shadow-lg">
                                    🔥 Trending
                                </span>
                            )}
                            {villa.isLuxury && (
                                <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-yellow-400 text-white text-xs font-semibold rounded-full shadow-lg">
                                    ✨ Luxury
                                </span>
                            )}
                            {villa.isBudget && (
                                <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-400 text-white text-xs font-semibold rounded-full shadow-lg">
                                    💰 Budget
                                </span>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="absolute top-3 right-3 flex flex-col gap-2">
                            <button
                                onClick={handleCompareClick}
                                className={cn(
                                    "p-2 rounded-full shadow-lg transition-all duration-200",
                                    inCompare
                                        ? "bg-pine-500 text-white"
                                        : "bg-white/90 text-fog-700 hover:bg-pine-500 hover:text-white"
                                )}
                                title={inCompare ? "Hapus dari perbandingan" : "Tambah ke perbandingan"}
                            >
                                <GitCompare className="w-4 h-4" />
                            </button>
                            <button
                                onClick={(e) => e.preventDefault()}
                                className="p-2 bg-white/90 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-all duration-200 text-fog-700"
                                title="Simpan ke favorit"
                            >
                                <Heart className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Price Badge */}
                        <div className="absolute bottom-3 right-3">
                            <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg">
                                {villa.originalPrice && villa.originalPrice > villa.price && (
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <span className="text-fog-400 text-sm line-through">{formatPrice(villa.originalPrice)}</span>
                                        <span className="px-1.5 py-0.5 bg-red-500 text-white text-xs font-bold rounded">
                                            -{Math.round((1 - villa.price / villa.originalPrice) * 100)}%
                                        </span>
                                    </div>
                                )}
                                <p className="text-pine-600 font-bold text-lg">{formatPrice(villa.price)}</p>
                                <p className="text-fog-500 text-xs text-right">/malam</p>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                        {/* Title & Rating */}
                        <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="font-bold text-lg text-fog-800 group-hover:text-pine-600 transition-colors line-clamp-1">
                                {villa.name}
                            </h3>
                            <div className="flex items-center gap-1 shrink-0">
                                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                <span className="font-semibold text-fog-800">{villa.rating}</span>
                                <span className="text-fog-500 text-sm">({villa.reviewCount})</span>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="flex items-center gap-1 text-fog-500 text-sm mb-4">
                            <MapPin className="w-4 h-4" />
                            <span>{villa.location.area}, Batu</span>
                        </div>

                        {/* Description */}
                        <p className="text-fog-600 text-sm line-clamp-2 mb-4">
                            {villa.shortDescription}
                        </p>

                        {/* Features */}
                        <div className="flex items-center gap-4 pt-4 border-t border-fog-100">
                            <div className="flex items-center gap-1.5 text-fog-600">
                                <Users className="w-4 h-4 text-pine-500" />
                                <span className="text-sm">{villa.capacity} tamu</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-fog-600">
                                <BedDouble className="w-4 h-4 text-pine-500" />
                                <span className="text-sm">{villa.bedrooms} kamar</span>
                            </div>
                            {villa.hasPool && (
                                <div className="flex items-center gap-1.5 text-fog-600">
                                    <Waves className="w-4 h-4 text-pine-500" />
                                    <span className="text-sm">Pool</span>
                                </div>
                            )}
                        </div>
                    </div>
                </article>
            </Link>
        </motion.div>
    );
}
