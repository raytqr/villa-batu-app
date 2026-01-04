'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
    ChevronLeft,
    Save,
    Upload,
    X,
    Check,
    Trash2
} from 'lucide-react';
import { villas, amenities as allAmenities } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function AdminVillaEditPage() {
    const params = useParams();
    const villa = villas.find(v => v.id === params.id);

    const [formData, setFormData] = useState({
        name: villa?.name || '',
        shortDescription: villa?.shortDescription || '',
        description: villa?.description || '',
        price: villa?.price || 0,
        originalPrice: villa?.originalPrice || 0, // For strikethrough/discount display
        weekendPrice: villa?.weekendPrice || 0,
        highSeasonPrice: villa?.highSeasonPrice || 0,
        capacity: villa?.capacity || 1,
        bedrooms: villa?.bedrooms || 1,
        bathrooms: villa?.bathrooms || 1,
        hasPool: villa?.hasPool || false,
        poolSize: villa?.poolSize || '',
        viewType: villa?.viewType || 'mountain',
        area: villa?.location.area || '',
        address: villa?.location.address || '',
        isRecommended: villa?.isRecommended || false,
        isTrending: villa?.isTrending || false,
        isLuxury: villa?.isLuxury || false,
        isBudget: villa?.isBudget || false,
        amenityIds: villa?.amenities.map(a => a.id) || [],
        rating: villa?.rating || 4.5,
        reviewCount: villa?.reviewCount || 0,
        lat: villa?.location.coordinates?.lat || -7.8712,
        lng: villa?.location.coordinates?.lng || 112.5273,
    });

    const discountPercent = formData.originalPrice > formData.price
        ? Math.round((1 - formData.price / formData.originalPrice) * 100)
        : 0;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would save to a database
        console.log('Saving villa:', formData);
        alert('Villa berhasil disimpan! (Demo only)');
    };

    const toggleAmenity = (amenityId: string) => {
        if (formData.amenityIds.includes(amenityId)) {
            setFormData({
                ...formData,
                amenityIds: formData.amenityIds.filter(id => id !== amenityId)
            });
        } else {
            setFormData({
                ...formData,
                amenityIds: [...formData.amenityIds, amenityId]
            });
        }
    };

    if (!villa) {
        return (
            <div className="p-8 text-center">
                <p className="text-fog-500">Villa tidak ditemukan</p>
                <Link href="/admin/villas" className="text-pine-600 hover:underline">
                    Kembali ke daftar villa
                </Link>
            </div>
        );
    }

    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/villas"
                        className="p-2 hover:bg-fog-100 rounded-lg transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6 text-fog-600" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-fog-800">Edit Villa</h1>
                        <p className="text-fog-500">{villa.name}</p>
                    </div>
                </div>
                <button
                    onClick={handleSubmit}
                    className="btn-primary flex items-center gap-2"
                >
                    <Save className="w-5 h-5" />
                    <span>Simpan</span>
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Info */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-fog-800 mb-6">Informasi Dasar</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-fog-700 mb-2">Nama Villa</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="input-field"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-fog-700 mb-2">Deskripsi Singkat</label>
                            <input
                                type="text"
                                value={formData.shortDescription}
                                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                                className="input-field"
                                maxLength={100}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-fog-700 mb-2">Deskripsi Lengkap</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={4}
                                className="input-field resize-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Rating & Configuration */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-fog-800 mb-6">Rating & Lokasi</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-fog-700 mb-2">Rating (0 - 5)</label>
                            <input
                                type="number"
                                min="0"
                                max="5"
                                step="0.1"
                                value={formData.rating}
                                onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                                className="input-field"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-fog-700 mb-2">Total Review</label>
                            <input
                                type="number"
                                min="0"
                                value={formData.reviewCount}
                                onChange={(e) => setFormData({ ...formData, reviewCount: parseInt(e.target.value) })}
                                className="input-field"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-fog-700 mb-2">Latitude (Map)</label>
                            <input
                                type="number"
                                step="any"
                                value={formData.lat}
                                onChange={(e) => setFormData({ ...formData, lat: parseFloat(e.target.value) })}
                                className="input-field"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-fog-700 mb-2">Longitude (Map)</label>
                            <input
                                type="number"
                                step="any"
                                value={formData.lng}
                                onChange={(e) => setFormData({ ...formData, lng: parseFloat(e.target.value) })}
                                className="input-field"
                            />
                        </div>
                    </div>
                </div>

                {/* Images */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-fog-800 mb-6">Foto Villa</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {villa.images.map((image, index) => (
                            <div key={index} className="relative aspect-video rounded-xl overflow-hidden group">
                                <Image
                                    src={image}
                                    alt={`Photo ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                                <button className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                        <button className="aspect-video rounded-xl border-2 border-dashed border-fog-300 flex flex-col items-center justify-center gap-2 hover:border-pine-500 hover:bg-pine-50/50 transition-colors">
                            <Upload className="w-8 h-8 text-fog-400" />
                            <span className="text-sm text-fog-500">Upload</span>
                        </button>
                    </div>
                </div>

                {/* Pricing */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-fog-800 mb-6">Harga</h2>

                    {/* Discount Pricing Section */}
                    <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-200">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="font-semibold text-fog-800">🏷️ Harga Diskon (Coret)</h3>
                                <p className="text-sm text-fog-500">Tampilkan harga asli yang dicoret dengan harga diskon</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setFormData({
                                    ...formData,
                                    originalPrice: formData.originalPrice > 0 ? 0 : formData.price + 1000000
                                })}
                                className={cn(
                                    "w-12 h-6 rounded-full transition-colors relative",
                                    formData.originalPrice > 0 ? "bg-red-500" : "bg-fog-300"
                                )}
                            >
                                <span className={cn(
                                    "absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform",
                                    formData.originalPrice > 0 ? "translate-x-6" : "translate-x-0.5"
                                )} />
                            </button>
                        </div>

                        {formData.originalPrice > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-fog-700 mb-2">
                                        Harga Asli (Dicoret)
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.originalPrice}
                                        onChange={(e) => setFormData({ ...formData, originalPrice: parseInt(e.target.value) || 0 })}
                                        className="input-field"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-fog-700 mb-2">
                                        Harga Jual (Diskon)
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                                        className="input-field"
                                    />
                                </div>
                                <div className="flex items-end">
                                    <div className="w-full p-3 bg-white rounded-xl border border-red-200 text-center">
                                        <p className="text-sm text-fog-500">Diskon</p>
                                        <p className="text-2xl font-bold text-red-500">-{discountPercent}%</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-fog-700 mb-2">Harga Normal (/malam)</label>
                            <input
                                type="number"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                                className="input-field"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-fog-700 mb-2">Harga Weekend (/malam)</label>
                            <input
                                type="number"
                                value={formData.weekendPrice}
                                onChange={(e) => setFormData({ ...formData, weekendPrice: parseInt(e.target.value) })}
                                className="input-field"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-fog-700 mb-2">Harga High Season (/malam)</label>
                            <input
                                type="number"
                                value={formData.highSeasonPrice}
                                onChange={(e) => setFormData({ ...formData, highSeasonPrice: parseInt(e.target.value) })}
                                className="input-field"
                            />
                        </div>
                    </div>
                </div>

                {/* Capacity & Features */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-fog-800 mb-6">Kapasitas & Fitur</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-fog-700 mb-2">Kapasitas Tamu</label>
                            <input
                                type="number"
                                value={formData.capacity}
                                onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                                className="input-field"
                                min={1}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-fog-700 mb-2">Kamar Tidur</label>
                            <input
                                type="number"
                                value={formData.bedrooms}
                                onChange={(e) => setFormData({ ...formData, bedrooms: parseInt(e.target.value) })}
                                className="input-field"
                                min={1}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-fog-700 mb-2">Kamar Mandi</label>
                            <input
                                type="number"
                                value={formData.bathrooms}
                                onChange={(e) => setFormData({ ...formData, bathrooms: parseInt(e.target.value) })}
                                className="input-field"
                                min={1}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-fog-700 mb-2">Tipe View</label>
                            <select
                                value={formData.viewType}
                                onChange={(e) => setFormData({ ...formData, viewType: e.target.value as "mountain" | "city" | "garden" | "rice-field" })}
                                className="input-field"
                            >
                                <option value="mountain">Gunung</option>
                                <option value="city">Kota</option>
                                <option value="garden">Taman</option>
                                <option value="rice-field">Sawah</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center justify-between p-4 bg-fog-50 rounded-xl">
                            <span className="font-medium text-fog-700">Kolam Renang</span>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, hasPool: !formData.hasPool })}
                                className={cn(
                                    "w-12 h-6 rounded-full transition-colors relative",
                                    formData.hasPool ? "bg-pine-500" : "bg-fog-300"
                                )}
                            >
                                <span className={cn(
                                    "absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform",
                                    formData.hasPool ? "translate-x-6" : "translate-x-0.5"
                                )} />
                            </button>
                        </div>
                        {formData.hasPool && (
                            <div>
                                <label className="block text-sm font-medium text-fog-700 mb-2">Ukuran Kolam</label>
                                <input
                                    type="text"
                                    value={formData.poolSize}
                                    onChange={(e) => setFormData({ ...formData, poolSize: e.target.value })}
                                    placeholder="contoh: 8x4 meter"
                                    className="input-field"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Location */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-fog-800 mb-6">Lokasi</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-fog-700 mb-2">Area</label>
                            <input
                                type="text"
                                value={formData.area}
                                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                                className="input-field"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-fog-700 mb-2">Alamat Lengkap</label>
                            <input
                                type="text"
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                className="input-field"
                            />
                        </div>
                    </div>
                </div>

                {/* Display Settings */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-fog-800 mb-6">Pengaturan Tampilan</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { key: 'isRecommended', label: 'Tampilkan di Homepage', color: 'pine' },
                            { key: 'isTrending', label: 'Tandai sebagai Trending', color: 'orange' },
                            { key: 'isLuxury', label: 'Tandai sebagai Luxury', color: 'amber' },
                            { key: 'isBudget', label: 'Tandai sebagai Budget', color: 'green' },
                        ].map((option) => (
                            <button
                                key={option.key}
                                type="button"
                                onClick={() => setFormData({ ...formData, [option.key]: !formData[option.key as keyof typeof formData] })}
                                className={cn(
                                    "p-4 rounded-xl border-2 text-left transition-all",
                                    formData[option.key as keyof typeof formData]
                                        ? `border-${option.color}-500 bg-${option.color}-50`
                                        : "border-fog-200 hover:border-fog-300"
                                )}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className={cn(
                                        "w-5 h-5 rounded-md border-2 flex items-center justify-center",
                                        formData[option.key as keyof typeof formData]
                                            ? `border-${option.color}-500 bg-${option.color}-500`
                                            : "border-fog-300"
                                    )}>
                                        {formData[option.key as keyof typeof formData] && <Check className="w-3 h-3 text-white" />}
                                    </span>
                                </div>
                                <p className="font-medium text-fog-800 text-sm">{option.label}</p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Amenities */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-fog-800 mb-6">Fasilitas</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {allAmenities.map((amenity) => {
                            const isSelected = formData.amenityIds.includes(amenity.id);
                            return (
                                <button
                                    key={amenity.id}
                                    type="button"
                                    onClick={() => toggleAmenity(amenity.id)}
                                    className={cn(
                                        "flex items-center gap-3 p-3 rounded-xl border transition-all",
                                        isSelected
                                            ? "border-pine-500 bg-pine-50"
                                            : "border-fog-200 hover:border-fog-300"
                                    )}
                                >
                                    <div className={cn(
                                        "w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0",
                                        isSelected
                                            ? "border-pine-500 bg-pine-500"
                                            : "border-fog-300"
                                    )}>
                                        {isSelected && <Check className="w-3 h-3 text-white" />}
                                    </div>
                                    <span className={cn(
                                        "text-sm font-medium",
                                        isSelected ? "text-pine-700" : "text-fog-700"
                                    )}>
                                        {amenity.name}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                    <button
                        type="button"
                        className="flex items-center gap-2 text-red-500 hover:text-red-600 font-medium"
                    >
                        <Trash2 className="w-5 h-5" />
                        <span>Hapus Villa</span>
                    </button>
                    <div className="flex gap-3">
                        <Link
                            href="/admin/villas"
                            className="px-6 py-3 border border-fog-200 rounded-xl font-medium text-fog-700 hover:bg-fog-50 transition-colors"
                        >
                            Batal
                        </Link>
                        <button type="submit" className="btn-primary flex items-center gap-2">
                            <Save className="w-5 h-5" />
                            <span>Simpan Perubahan</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
