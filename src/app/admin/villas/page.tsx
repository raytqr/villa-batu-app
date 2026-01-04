'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Search, Edit, Trash2, Eye, Star, ToggleLeft, ToggleRight } from 'lucide-react';
import { villas } from '@/lib/mock-data';
import { formatPrice } from '@/lib/utils';

export default function AdminVillasPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [villaList, setVillaList] = useState(villas);

    const filteredVillas = villaList.filter(villa =>
        villa.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        villa.location.area.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleRecommended = (id: string) => {
        setVillaList(villaList.map(v =>
            v.id === id ? { ...v, isRecommended: !v.isRecommended } : v
        ));
    };

    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-fog-800">Kelola Villa</h1>
                    <p className="text-fog-500">{villaList.length} villa terdaftar</p>
                </div>
                <button className="btn-primary flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    <span>Tambah Villa</span>
                </button>
            </div>

            {/* Search & Filter */}
            <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-fog-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari villa..."
                            className="w-full pl-10 pr-4 py-2.5 border border-fog-200 rounded-xl focus:border-pine-500 focus:ring-2 focus:ring-pine-500/20 outline-none"
                        />
                    </div>
                    <select className="px-4 py-2.5 border border-fog-200 rounded-xl focus:border-pine-500 focus:ring-2 focus:ring-pine-500/20 outline-none">
                        <option>Semua Status</option>
                        <option>Aktif</option>
                        <option>Nonaktif</option>
                    </select>
                </div>
            </div>

            {/* Villa Table */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-fog-50 border-b border-fog-100">
                            <tr>
                                <th className="text-left px-6 py-4 font-semibold text-fog-700 text-sm">Villa</th>
                                <th className="text-left px-6 py-4 font-semibold text-fog-700 text-sm">Lokasi</th>
                                <th className="text-left px-6 py-4 font-semibold text-fog-700 text-sm">Harga</th>
                                <th className="text-left px-6 py-4 font-semibold text-fog-700 text-sm">Kapasitas</th>
                                <th className="text-center px-6 py-4 font-semibold text-fog-700 text-sm">Rekomendasi</th>
                                <th className="text-left px-6 py-4 font-semibold text-fog-700 text-sm">Tags</th>
                                <th className="text-right px-6 py-4 font-semibold text-fog-700 text-sm">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-fog-100">
                            {filteredVillas.map((villa) => (
                                <tr key={villa.id} className="hover:bg-fog-50 transition-colors">
                                    {/* Villa Info */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-fog-100">
                                                <Image
                                                    src={villa.images[0]}
                                                    alt={villa.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-medium text-fog-800">{villa.name}</p>
                                                <div className="flex items-center gap-1 text-sm text-fog-500">
                                                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                                    <span>{villa.rating}</span>
                                                    <span>({villa.reviewCount})</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Location */}
                                    <td className="px-6 py-4 text-fog-600">{villa.location.area}</td>

                                    {/* Price */}
                                    <td className="px-6 py-4">
                                        <p className="font-medium text-pine-600">{formatPrice(villa.price)}</p>
                                        <p className="text-xs text-fog-500">/malam</p>
                                    </td>

                                    {/* Capacity */}
                                    <td className="px-6 py-4 text-fog-600">{villa.capacity} tamu</td>

                                    {/* Recommended Toggle */}
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            onClick={() => toggleRecommended(villa.id)}
                                            className="inline-flex items-center justify-center"
                                        >
                                            {villa.isRecommended ? (
                                                <ToggleRight className="w-8 h-8 text-pine-500" />
                                            ) : (
                                                <ToggleLeft className="w-8 h-8 text-fog-300" />
                                            )}
                                        </button>
                                    </td>

                                    {/* Tags */}
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {villa.isTrending && (
                                                <span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-xs font-medium rounded-full">
                                                    Trending
                                                </span>
                                            )}
                                            {villa.isLuxury && (
                                                <span className="px-2 py-0.5 bg-amber-100 text-amber-600 text-xs font-medium rounded-full">
                                                    Luxury
                                                </span>
                                            )}
                                            {villa.isBudget && (
                                                <span className="px-2 py-0.5 bg-green-100 text-green-600 text-xs font-medium rounded-full">
                                                    Budget
                                                </span>
                                            )}
                                        </div>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/villa/${villa.slug}`}
                                                target="_blank"
                                                className="p-2 hover:bg-fog-100 rounded-lg transition-colors"
                                                title="Lihat"
                                            >
                                                <Eye className="w-4 h-4 text-fog-500" />
                                            </Link>
                                            <Link
                                                href={`/admin/villas/${villa.id}`}
                                                className="p-2 hover:bg-fog-100 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <Edit className="w-4 h-4 text-fog-500" />
                                            </Link>
                                            <button
                                                className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Hapus"
                                            >
                                                <Trash2 className="w-4 h-4 text-red-500" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredVillas.length === 0 && (
                    <div className="p-12 text-center">
                        <p className="text-fog-500">Tidak ada villa yang ditemukan</p>
                    </div>
                )}
            </div>
        </div>
    );
}
