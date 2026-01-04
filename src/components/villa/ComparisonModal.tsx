'use client';

import { X, Star, Users, BedDouble, Waves, Car, MapPin, Share2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCompareStore } from '@/store/useCompareStore';
import { formatPrice } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function ComparisonModal() {
    const { villas, isOpen, closeModal, removeVilla, clearAll } = useCompareStore();

    const handleShare = () => {
        const text = villas.map(v =>
            `🏡 ${v.name}\n💰 ${formatPrice(v.price)}/malam\n👥 ${v.capacity} tamu | 🛏️ ${v.bedrooms} kamar\n⭐ ${v.rating} (${v.reviewCount} review)\n`
        ).join('\n');

        const message = `Bandingkan Villa di VillaBatu:\n\n${text}\nCek selengkapnya di villabatu.id`;

        if (navigator.share) {
            navigator.share({ text: message });
        } else {
            navigator.clipboard.writeText(message);
            alert('Link berhasil disalin!');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-4 md:inset-10 lg:inset-20 bg-white rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-fog-100">
                            <div>
                                <h2 className="text-2xl font-bold text-fog-800">Bandingkan Villa</h2>
                                <p className="text-fog-500">Bandingkan hingga 3 villa sekaligus</p>
                            </div>
                            <div className="flex items-center gap-3">
                                {villas.length > 0 && (
                                    <>
                                        <button
                                            onClick={handleShare}
                                            className="flex items-center gap-2 px-4 py-2 bg-pine-50 text-pine-600 rounded-xl font-medium hover:bg-pine-100 transition-colors"
                                        >
                                            <Share2 className="w-4 h-4" />
                                            <span className="hidden sm:inline">Bagikan</span>
                                        </button>
                                        <button
                                            onClick={clearAll}
                                            className="px-4 py-2 text-fog-500 hover:text-red-500 font-medium transition-colors"
                                        >
                                            Hapus Semua
                                        </button>
                                    </>
                                )}
                                <button
                                    onClick={closeModal}
                                    className="p-2 hover:bg-fog-100 rounded-full transition-colors"
                                >
                                    <X className="w-6 h-6 text-fog-600" />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-auto p-6">
                            {villas.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center">
                                    <div className="w-24 h-24 bg-fog-100 rounded-full flex items-center justify-center mb-4">
                                        <Star className="w-12 h-12 text-fog-300" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-fog-800 mb-2">Belum ada villa</h3>
                                    <p className="text-fog-500 mb-6">Klik tombol "Compare" pada villa untuk menambahkan</p>
                                    <button
                                        onClick={closeModal}
                                        className="btn-primary"
                                    >
                                        Cari Villa
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {villas.map((villa) => (
                                        <div key={villa.id} className="bg-fog-50 rounded-2xl overflow-hidden">
                                            {/* Image */}
                                            <div className="relative h-48">
                                                <Image
                                                    src={villa.images[0]}
                                                    alt={villa.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                                <button
                                                    onClick={() => removeVilla(villa.id)}
                                                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors"
                                                >
                                                    <X className="w-4 h-4 text-red-500" />
                                                </button>
                                            </div>

                                            {/* Details */}
                                            <div className="p-5 space-y-4">
                                                <div>
                                                    <h3 className="font-bold text-lg text-fog-800 mb-1">{villa.name}</h3>
                                                    <div className="flex items-center gap-1 text-fog-500 text-sm">
                                                        <MapPin className="w-4 h-4" />
                                                        <span>{villa.location.area}</span>
                                                    </div>
                                                </div>

                                                {/* Price */}
                                                <div className="bg-white rounded-xl p-3">
                                                    <p className="text-pine-600 font-bold text-xl">{formatPrice(villa.price)}</p>
                                                    <p className="text-fog-500 text-sm">/malam</p>
                                                </div>

                                                {/* Features */}
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div className="flex items-center gap-2 text-fog-600">
                                                        <Users className="w-4 h-4 text-pine-500" />
                                                        <span className="text-sm">{villa.capacity} tamu</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-fog-600">
                                                        <BedDouble className="w-4 h-4 text-pine-500" />
                                                        <span className="text-sm">{villa.bedrooms} kamar</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-fog-600">
                                                        <Waves className="w-4 h-4 text-pine-500" />
                                                        <span className="text-sm">{villa.hasPool ? villa.poolSize || 'Ada' : 'Tidak ada'}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-fog-600">
                                                        <Car className="w-4 h-4 text-pine-500" />
                                                        <span className="text-sm">Parkir gratis</span>
                                                    </div>
                                                </div>

                                                {/* Rating */}
                                                <div className="flex items-center gap-2 pt-3 border-t border-fog-200">
                                                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                                                    <span className="font-semibold">{villa.rating}</span>
                                                    <span className="text-fog-500 text-sm">({villa.reviewCount} review)</span>
                                                </div>

                                                {/* CTA */}
                                                <Link
                                                    href={`/villa/${villa.slug}`}
                                                    onClick={closeModal}
                                                    className="block w-full text-center btn-primary"
                                                >
                                                    Lihat Detail
                                                </Link>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Add More Placeholder */}
                                    {villas.length < 3 && (
                                        <div
                                            onClick={closeModal}
                                            className="border-2 border-dashed border-fog-300 rounded-2xl flex flex-col items-center justify-center p-10 cursor-pointer hover:border-pine-500 hover:bg-pine-50/50 transition-colors"
                                        >
                                            <div className="w-16 h-16 bg-fog-100 rounded-full flex items-center justify-center mb-4">
                                                <span className="text-3xl text-fog-400">+</span>
                                            </div>
                                            <p className="text-fog-500 text-center">Tambah villa untuk dibandingkan</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
