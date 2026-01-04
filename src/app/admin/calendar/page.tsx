'use client';

import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { villas } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function AdminCalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedVilla, setSelectedVilla] = useState(villas[0].id);
    const [blockedDates, setBlockedDates] = useState<string[]>(
        villas[0].bookedDates
    );



    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const monthNames = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

    const days = useMemo(() => {
        const result = [];

        // Add empty cells for days before the first day of month
        for (let i = 0; i < firstDayOfMonth; i++) {
            result.push(null);
        }

        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            result.push({
                day,
                dateStr,
                isBlocked: blockedDates.includes(dateStr),
                isPast: new Date(dateStr) < new Date(new Date().toDateString()),
            });
        }

        return result;
    }, [year, month, daysInMonth, firstDayOfMonth, blockedDates]);

    const toggleDate = (dateStr: string) => {
        if (blockedDates.includes(dateStr)) {
            setBlockedDates(blockedDates.filter(d => d !== dateStr));
        } else {
            setBlockedDates([...blockedDates, dateStr]);
        }
    };

    const goToPreviousMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const handleVillaChange = (villaId: string) => {
        setSelectedVilla(villaId);
        const newVilla = villas.find(v => v.id === villaId);
        setBlockedDates(newVilla?.bookedDates || []);
    };

    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-fog-800">Kalender Booking</h1>
                <p className="text-fog-500">Kelola ketersediaan tanggal untuk setiap villa</p>
            </div>

            {/* Villa Selector */}
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
                <label className="block text-sm font-medium text-fog-700 mb-2">Pilih Villa</label>
                <select
                    value={selectedVilla}
                    onChange={(e) => handleVillaChange(e.target.value)}
                    className="w-full md:w-96 input-field"
                >
                    {villas.map((v) => (
                        <option key={v.id} value={v.id}>{v.name}</option>
                    ))}
                </select>
            </div>

            {/* Calendar */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={goToPreviousMonth}
                        className="p-2 hover:bg-fog-100 rounded-lg transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6 text-fog-600" />
                    </button>
                    <h2 className="text-xl font-bold text-fog-800">
                        {monthNames[month]} {year}
                    </h2>
                    <button
                        onClick={goToNextMonth}
                        className="p-2 hover:bg-fog-100 rounded-lg transition-colors"
                    >
                        <ChevronRight className="w-6 h-6 text-fog-600" />
                    </button>
                </div>

                {/* Day Names */}
                <div className="grid grid-cols-7 gap-2 mb-2">
                    {dayNames.map((day) => (
                        <div key={day} className="text-center text-sm font-medium text-fog-500 py-2">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-2">
                    {days.map((dayData, index) => {
                        if (!dayData) {
                            return <div key={index} className="aspect-square" />;
                        }

                        return (
                            <button
                                key={dayData.dateStr}
                                onClick={() => !dayData.isPast && toggleDate(dayData.dateStr)}
                                disabled={dayData.isPast}
                                className={cn(
                                    "aspect-square rounded-xl flex flex-col items-center justify-center transition-all border-2",
                                    dayData.isPast
                                        ? "bg-fog-50 text-fog-300 cursor-not-allowed border-transparent"
                                        : dayData.isBlocked
                                            ? "bg-red-100 border-red-500 text-red-700 hover:bg-red-200"
                                            : "bg-green-50 border-green-500 text-green-700 hover:bg-green-100"
                                )}
                            >
                                <span className="text-lg font-semibold">{dayData.day}</span>
                                {!dayData.isPast && (
                                    <span className="text-xs mt-0.5">
                                        {dayData.isBlocked ? 'Booked' : 'Open'}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Legend */}
                <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-fog-100">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-green-500" />
                        <span className="text-sm text-fog-600">Tersedia</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-red-500" />
                        <span className="text-sm text-fog-600">Booked/Blocked</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-fog-200" />
                        <span className="text-sm text-fog-600">Lewat</span>
                    </div>
                </div>

                {/* Info */}
                <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                    <p className="text-blue-700 text-sm">
                        💡 <strong>Tips:</strong> Klik tanggal untuk toggle status ketersediaan.
                        Tanggal yang di-block tidak akan bisa dipilih oleh tamu.
                    </p>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 flex flex-wrap gap-4">
                <button className="px-4 py-2 bg-white border border-fog-200 rounded-xl text-fog-700 hover:bg-fog-50 transition-colors">
                    Block Weekend Bulan Ini
                </button>
                <button className="px-4 py-2 bg-white border border-fog-200 rounded-xl text-fog-700 hover:bg-fog-50 transition-colors">
                    Unblock Semua Tanggal
                </button>
                <button className="btn-primary">
                    Simpan Perubahan
                </button>
            </div>
        </div>
    );
}
