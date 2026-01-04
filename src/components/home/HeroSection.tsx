'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Calendar, Users, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { areas } from '@/lib/mock-data';
import { CustomDropdown } from '@/components/ui/CustomDropdown';

export function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image (lighter than video) */}
            <div className="absolute inset-0 z-0">
                <div
                    className="w-full h-full bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=75')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
            </div>

            {/* Content */}
            <div className="relative z-10 container-custom text-center px-4 pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6">
                        🏡 500+ Villa Premium di Kota Batu
                    </span>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        Temukan Villa Impian<br />
                        <span className="text-gradient bg-gradient-to-r from-pine-300 to-earth-300 bg-clip-text text-transparent">
                            untuk Liburan Sempurna
                        </span>
                    </h1>

                    <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                        Platform booking villa terpercaya di Kota Batu.
                        Nikmati staycation bersama keluarga dengan view pegunungan yang memukau.
                    </p>
                </motion.div>

                {/* Quick Search */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <QuickSearchBar />
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-wrap justify-center gap-8 mt-16"
                >
                    {[
                        { value: '500+', label: 'Villa' },
                        { value: '10K+', label: 'Tamu Puas' },
                        { value: '4.9', label: 'Rating' },
                        { value: '24/7', label: 'Support' },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <p className="text-3xl md:text-4xl font-bold text-white">{stat.value}</p>
                            <p className="text-white/60 text-sm">{stat.label}</p>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
            >
                <div className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-1.5 h-1.5 bg-white rounded-full"
                    />
                </div>
            </motion.div>
        </section>
    );
}

function QuickSearchBar() {
    const router = useRouter();
    const [selectedArea, setSelectedArea] = useState('');
    const [guests, setGuests] = useState('');
    const [checkIn, setCheckIn] = useState(() => new Date().toISOString().split('T')[0]);

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (selectedArea) params.set('area', selectedArea);
        if (guests) params.set('capacity', guests);
        router.push(`/search?${params.toString()}`);
    };

    const areaOptions = [
        { value: '', label: 'Semua Area' },
        ...areas.map(area => ({ value: area.id, label: area.name }))
    ];

    const guestOptions = [
        { value: '', label: 'Pilih' },
        { value: '2', label: '1-2 tamu' },
        { value: '4', label: '3-4 tamu' },
        { value: '6', label: '5-6 tamu' },
        { value: '10', label: '7-10 tamu' },
        { value: '20', label: '10+ tamu' },
    ];

    return (
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl md:rounded-full p-3 shadow-2xl max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-3 md:gap-0">
                {/* Destination */}
                <div className="flex-1 flex items-center gap-3 px-4 py-2 border-b md:border-b-0 md:border-r border-fog-200">
                    <MapPin className="w-5 h-5 text-pine-500 shrink-0" />
                    <div className="flex-1 min-w-0">
                        <p className="text-xs text-fog-500 font-medium">Lokasi</p>
                        <CustomDropdown
                            options={areaOptions}
                            value={selectedArea}
                            onChange={setSelectedArea}
                            placeholder="Semua Area"
                            variant="hero"
                        />
                    </div>
                </div>

                {/* Check-in Date */}
                <div className="flex-1 flex items-center gap-3 px-4 py-2 border-b md:border-b-0 md:border-r border-fog-200">
                    <Calendar className="w-5 h-5 text-pine-500 shrink-0" />
                    <div className="flex-1">
                        <p className="text-xs text-fog-500 font-medium">Check-in</p>
                        <input
                            type="date"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            className="w-full text-fog-800 font-medium bg-transparent focus:outline-none cursor-pointer"
                        />
                    </div>
                </div>

                {/* Guests */}
                <div className="flex-1 flex items-center gap-3 px-4 py-2">
                    <Users className="w-5 h-5 text-pine-500 shrink-0" />
                    <div className="flex-1 min-w-0">
                        <p className="text-xs text-fog-500 font-medium">Tamu</p>
                        <CustomDropdown
                            options={guestOptions}
                            value={guests}
                            onChange={setGuests}
                            placeholder="Pilih"
                            variant="hero"
                        />
                    </div>
                </div>

                {/* Search Button */}
                <button
                    onClick={handleSearch}
                    className="btn-primary flex items-center justify-center gap-2 md:rounded-full md:ml-2"
                >
                    <Search className="w-5 h-5" />
                    <span>Cari Villa</span>
                </button>
            </div>
        </div>
    );
}
