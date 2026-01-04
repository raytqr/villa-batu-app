'use client';

import { Star } from 'lucide-react';
import { Villa } from '@/lib/types';
import { VillaCard } from '@/components/villa/VillaCard';
import { motion } from 'framer-motion';

interface RecommendedVillasProps {
    villas: Villa[];
}

export function RecommendedVillas({ villas }: RecommendedVillasProps) {
    const recommendedVillas = villas.filter(v => v.isRecommended);

    if (recommendedVillas.length === 0) return null;

    return (
        <section className="section-padding bg-white">
            <div className="container-custom">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-pine-50 rounded-full text-pine-600 font-medium mb-4">
                        <Star className="w-4 h-4 fill-current" />
                        <span>Rekomendasi Pilihan</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-fog-800 mb-4">
                        Villa Terbaik untuk Anda
                    </h2>
                    <p className="text-fog-500 max-w-2xl mx-auto">
                        Dipilih berdasarkan rating tertinggi, fasilitas terlengkap, dan review terbaik dari tamu kami
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {recommendedVillas.slice(0, 6).map((villa, index) => (
                        <VillaCard key={villa.id} villa={villa} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
