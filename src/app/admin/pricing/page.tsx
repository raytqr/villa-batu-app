'use client';

import { useState } from 'react';
import {
    DollarSign, Calendar, Save
} from 'lucide-react';
import { villas } from '@/lib/mock-data';
import { formatPrice, cn } from '@/lib/utils';
import { CustomDropdown } from '@/components/ui/CustomDropdown';

export default function AdminPricingPage() {
    const [selectedVilla, setSelectedVilla] = useState(villas[0].id);
    const villa = villas.find(v => v.id === selectedVilla);

    const [pricing, setPricing] = useState({
        basePrice: villa?.price || 0,
        weekendPrice: villa?.weekendPrice || 0,
        highSeasonPrice: villa?.highSeasonPrice || 0,
        weekendMultiplier: 1.2,
        highSeasonMultiplier: 1.5,
        weekendDays: 'fri-sat-sun' as string,
    });

    const [highSeasonDates, setHighSeasonDates] = useState<{ start: string; end: string }[]>([
        { start: '2026-06-01', end: '2026-06-30' },
        { start: '2026-12-20', end: '2027-01-05' },
    ]);

    const handleVillaChange = (villaId: string) => {
        setSelectedVilla(villaId);
        const newVilla = villas.find(v => v.id === villaId);
        setPricing({
            ...pricing,
            basePrice: newVilla?.price || 0,
            weekendPrice: newVilla?.weekendPrice || 0,
            highSeasonPrice: newVilla?.highSeasonPrice || 0,
        });
    };

    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-fog-800">Pengaturan Harga</h1>
                <p className="text-fog-500">Atur harga normal, weekend, dan high season</p>
            </div>

            {/* Villa Selector */}
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
                <label className="block text-sm font-medium text-fog-700 mb-2">Pilih Villa</label>
                <div className="w-full md:w-96">
                    <CustomDropdown
                        options={villas.map(v => ({ value: v.id, label: v.name }))}
                        value={selectedVilla}
                        onChange={handleVillaChange}
                        placeholder="Pilih Villa"
                        variant="admin"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Base Pricing */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-pine-100 rounded-xl flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-pine-600" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-fog-800">Harga Dasar</h2>
                            <p className="text-sm text-fog-500">Harga per malam</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-fog-700 mb-2">Harga Normal</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-fog-500">Rp</span>
                                <input
                                    type="number"
                                    value={pricing.basePrice}
                                    onChange={(e) => setPricing({ ...pricing, basePrice: parseInt(e.target.value) })}
                                    className="input-field pl-12"
                                />
                            </div>
                            <p className="text-xs text-fog-500 mt-1">Berlaku Senin - Kamis</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-fog-700 mb-2">Harga Weekend</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-fog-500">Rp</span>
                                <input
                                    type="number"
                                    value={pricing.weekendPrice}
                                    onChange={(e) => setPricing({ ...pricing, weekendPrice: parseInt(e.target.value) })}
                                    className="input-field pl-12"
                                />
                            </div>
                        </div>

                        {/* Weekend Days Selection */}
                        <div>
                            <label className="block text-sm font-medium text-fog-700 mb-2">Hari Weekend</label>
                            <div className="grid grid-cols-2 gap-2">
                                {[
                                    { value: 'fri-sat-sun', label: 'Jum - Sab - Ming' },
                                    { value: 'fri-sat', label: 'Jum - Sab' },
                                    { value: 'sat-sun', label: 'Sab - Ming' },
                                    { value: 'sat', label: 'Sabtu saja' },
                                ].map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => setPricing({ ...pricing, weekendDays: option.value })}
                                        className={cn(
                                            "px-3 py-2.5 rounded-xl text-sm font-medium border-2 transition-all",
                                            pricing.weekendDays === option.value
                                                ? "border-pine-500 bg-pine-50 text-pine-700"
                                                : "border-fog-200 text-fog-600 hover:border-fog-300"
                                        )}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-fog-700 mb-2">Harga High Season</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-fog-500">Rp</span>
                                <input
                                    type="number"
                                    value={pricing.highSeasonPrice}
                                    onChange={(e) => setPricing({ ...pricing, highSeasonPrice: parseInt(e.target.value) })}
                                    className="input-field pl-12"
                                />
                            </div>
                            <p className="text-xs text-fog-500 mt-1">Berlaku di tanggal yang ditentukan</p>
                        </div>
                    </div>
                </div>

                {/* High Season Dates */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-fog-800">Periode High Season</h2>
                            <p className="text-sm text-fog-500">Tanggal berlaku harga high season</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {highSeasonDates.map((period, index) => (
                            <div key={index} className="p-4 bg-fog-50 rounded-xl">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="font-medium text-fog-700">Periode {index + 1}</span>
                                    <button
                                        onClick={() => setHighSeasonDates(highSeasonDates.filter((_, i) => i !== index))}
                                        className="text-red-500 hover:text-red-600 text-sm"
                                    >
                                        Hapus
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs text-fog-500 mb-1">Mulai</label>
                                        <input
                                            type="date"
                                            value={period.start}
                                            onChange={(e) => {
                                                const newDates = [...highSeasonDates];
                                                newDates[index].start = e.target.value;
                                                setHighSeasonDates(newDates);
                                            }}
                                            className="input-field text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-fog-500 mb-1">Sampai</label>
                                        <input
                                            type="date"
                                            value={period.end}
                                            onChange={(e) => {
                                                const newDates = [...highSeasonDates];
                                                newDates[index].end = e.target.value;
                                                setHighSeasonDates(newDates);
                                            }}
                                            className="input-field text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}

                        <button
                            onClick={() => setHighSeasonDates([...highSeasonDates, { start: '', end: '' }])}
                            className="w-full py-3 border-2 border-dashed border-fog-300 rounded-xl text-fog-500 hover:border-pine-500 hover:text-pine-600 transition-colors"
                        >
                            + Tambah Periode
                        </button>
                    </div>
                </div>

                {/* Price Preview */}
                <div className="lg:col-span-2 bg-gradient-to-r from-pine-500 to-pine-600 rounded-2xl p-6 text-white">
                    <h3 className="text-lg font-bold mb-4">Preview Harga: {villa?.name}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white/10 rounded-xl p-4">
                            <p className="text-pine-100 text-sm mb-1">Harga Normal</p>
                            <p className="text-2xl font-bold">{formatPrice(pricing.basePrice)}</p>
                            <p className="text-pine-200 text-xs">/malam (Sen-Kam)</p>
                        </div>
                        <div className="bg-white/10 rounded-xl p-4">
                            <p className="text-pine-100 text-sm mb-1">Harga Weekend</p>
                            <p className="text-2xl font-bold">{formatPrice(pricing.weekendPrice)}</p>
                            <p className="text-pine-200 text-xs">/malam (Jum-Ming)</p>
                        </div>
                        <div className="bg-white/10 rounded-xl p-4">
                            <p className="text-pine-100 text-sm mb-1">Harga High Season</p>
                            <p className="text-2xl font-bold">{formatPrice(pricing.highSeasonPrice)}</p>
                            <p className="text-pine-200 text-xs">/malam (Periode khusus)</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="mt-6 flex justify-end">
                <button className="btn-primary flex items-center gap-2">
                    <Save className="w-5 h-5" />
                    <span>Simpan Perubahan</span>
                </button>
            </div>
        </div>
    );
}
