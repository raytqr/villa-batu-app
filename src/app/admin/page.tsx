'use client';

import { Home, Calendar, DollarSign, Users, TrendingUp, Eye, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { villas } from '@/lib/mock-data';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminDashboard() {
    const totalVillas = villas.length;
    const recommendedCount = villas.filter(v => v.isRecommended).length;
    const avgPrice = villas.reduce((sum, v) => sum + v.price, 0) / villas.length;
    const totalBookings = villas.reduce((sum, v) => sum + v.bookedDates.length, 0);

    const stats = [
        {
            label: 'Total Villa',
            value: totalVillas,
            icon: Home,
            color: 'from-pine-500 to-pine-600',
            change: '+2',
            changeType: 'up'
        },
        {
            label: 'Villa Rekomendasi',
            value: recommendedCount,
            icon: TrendingUp,
            color: 'from-amber-500 to-orange-500',
            change: '+1',
            changeType: 'up'
        },
        {
            label: 'Total Booking',
            value: totalBookings,
            icon: Calendar,
            color: 'from-blue-500 to-indigo-500',
            change: '+5',
            changeType: 'up'
        },
        {
            label: 'Rata-rata Harga',
            value: formatPrice(avgPrice),
            icon: DollarSign,
            color: 'from-emerald-500 to-teal-500',
            change: '0%',
            changeType: 'neutral'
        },
    ];

    return (
        <div className="p-6 lg:p-8">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-pine-600 via-pine-500 to-emerald-500 rounded-3xl p-8 mb-8 text-white relative overflow-hidden">
                <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute right-20 bottom-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2" />
                <div className="relative z-10">
                    <p className="text-pine-100 mb-2">Selamat datang kembali,</p>
                    <h1 className="text-3xl font-bold mb-2">Administrator! 👋</h1>
                    <p className="text-pine-100 max-w-lg">
                        Kelola villa, booking, dan pengaturan website dari sini. Ada {totalBookings} booking aktif bulan ini.
                    </p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                            <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className={`flex items-center gap-1 text-sm font-medium ${stat.changeType === 'up' ? 'text-emerald-500' :
                                stat.changeType === 'down' ? 'text-red-500' : 'text-fog-500'
                                }`}>
                                {stat.changeType === 'up' && <ArrowUpRight className="w-4 h-4" />}
                                {stat.changeType === 'down' && <ArrowDownRight className="w-4 h-4" />}
                                {stat.change}
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-fog-800 mb-1">{stat.value}</p>
                        <p className="text-fog-500 text-sm">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Recent Villas */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between p-6 border-b border-fog-100">
                        <h2 className="text-lg font-bold text-fog-800">Villa Terbaru</h2>
                        <Link href="/admin/villas" className="text-pine-600 text-sm font-medium hover:underline flex items-center gap-1">
                            Lihat Semua <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="divide-y divide-fog-100">
                        {villas.slice(0, 4).map((villa) => (
                            <div key={villa.id} className="flex items-center justify-between p-4 hover:bg-fog-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-12 bg-fog-200 rounded-xl overflow-hidden">
                                        <Image src={villa.images[0]} alt={villa.name} width={64} height={48} className="w-full h-full object-cover" unoptimized />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-fog-800">{villa.name}</p>
                                        <p className="text-sm text-fog-500">{villa.location.area} • {villa.capacity} tamu</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-pine-600">{formatPrice(villa.price)}</p>
                                    <p className="text-xs text-fog-500">/malam</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recommended Villas */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between p-6 border-b border-fog-100">
                        <h2 className="text-lg font-bold text-fog-800">Di Homepage</h2>
                        <span className="px-3 py-1 bg-pine-50 text-pine-600 text-sm font-medium rounded-full">
                            {recommendedCount} villa
                        </span>
                    </div>
                    <div className="p-4 space-y-3">
                        {villas.filter(v => v.isRecommended).slice(0, 4).map((villa) => (
                            <div key={villa.id} className="flex items-center gap-3 p-3 bg-fog-50 rounded-xl">
                                <div className="w-12 h-12 bg-fog-200 rounded-lg overflow-hidden shrink-0">
                                    <Image src={villa.images[0]} alt={villa.name} width={48} height={48} className="w-full h-full object-cover" unoptimized />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-fog-800 truncate">{villa.name}</p>
                                    <div className="flex gap-1 mt-1">
                                        {villa.isTrending && <span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-xs rounded-full">Trending</span>}
                                        {villa.isLuxury && <span className="px-2 py-0.5 bg-amber-100 text-amber-600 text-xs rounded-full">Luxury</span>}
                                        {villa.isBudget && <span className="px-2 py-0.5 bg-green-100 text-green-600 text-xs rounded-full">Budget</span>}
                                    </div>
                                </div>
                                <Link href={`/admin/villas/${villa.id}`} className="p-2 hover:bg-white rounded-lg transition-colors shrink-0">
                                    <Eye className="w-4 h-4 text-fog-500" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Booking Reminders */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Today's Bookings */}
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                            <Calendar className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Booking Hari Ini</h3>
                            <p className="text-blue-100 text-sm">{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        {(() => {
                            const today = new Date().toISOString().split('T')[0];
                            const todayBookings = villas.filter(v => v.bookedDates.includes(today));
                            if (todayBookings.length === 0) {
                                return <p className="text-blue-100 py-3">Tidak ada booking hari ini</p>;
                            }
                            return todayBookings.map(villa => (
                                <div key={villa.id} className="bg-white/10 rounded-xl p-3 flex items-center justify-between">
                                    <span className="font-medium">{villa.name}</span>
                                    <span className="px-2 py-1 bg-white/20 rounded-lg text-xs">Check-in/Stay</span>
                                </div>
                            ));
                        })()}
                    </div>
                </div>

                {/* Upcoming Bookings */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-fog-100">
                        <h3 className="font-bold text-lg text-fog-800">Booking Mendatang (7 Hari)</h3>
                    </div>
                    <div className="p-4 space-y-2 max-h-64 overflow-y-auto">
                        {(() => {
                            const today = new Date();
                            const next7Days = Array.from({ length: 7 }, (_, i) => {
                                const date = new Date(today);
                                date.setDate(date.getDate() + i + 1);
                                return date.toISOString().split('T')[0];
                            });

                            const upcomingBookings: { villa: typeof villas[0], date: string }[] = [];
                            villas.forEach(villa => {
                                villa.bookedDates.forEach(date => {
                                    if (next7Days.includes(date)) {
                                        upcomingBookings.push({ villa, date });
                                    }
                                });
                            });

                            upcomingBookings.sort((a, b) => a.date.localeCompare(b.date));

                            if (upcomingBookings.length === 0) {
                                return <p className="text-fog-500 py-3 text-center">Tidak ada booking dalam 7 hari ke depan</p>;
                            }

                            return upcomingBookings.slice(0, 8).map((booking, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-fog-50 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-pine-100 rounded-lg flex items-center justify-center">
                                            <span className="text-pine-600 font-bold text-sm">
                                                {new Date(booking.date).getDate()}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-medium text-fog-800 text-sm">{booking.villa.name}</p>
                                            <p className="text-fog-500 text-xs">
                                                {new Date(booking.date).toLocaleDateString('id-ID', { weekday: 'short', month: 'short' })}
                                            </p>
                                        </div>
                                    </div>
                                    <Link
                                        href={`/admin/calendar?villa=${booking.villa.id}`}
                                        className="text-pine-600 text-xs font-medium hover:underline"
                                    >
                                        Lihat
                                    </Link>
                                </div>
                            ));
                        })()}
                    </div>
                </div>
            </div>

            {/* Quick Links */}
            <h3 className="font-bold text-fog-800 mb-4">Akses Cepat</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { href: '/admin/villas', label: 'Kelola Villa', desc: 'Tambah, edit, hapus', icon: Home, color: 'from-pine-500 to-pine-600' },
                    { href: '/admin/calendar', label: 'Kalender Booking', desc: 'Atur ketersediaan', icon: Calendar, color: 'from-blue-500 to-indigo-500' },
                    { href: '/admin/pricing', label: 'Atur Harga', desc: 'High season & weekend', icon: DollarSign, color: 'from-emerald-500 to-teal-500' },
                    { href: '/admin/settings', label: 'Pengaturan', desc: 'Info website & akun', icon: Users, color: 'from-purple-500 to-pink-500' },
                ].map((item, index) => (
                    <Link
                        key={index}
                        href={item.href}
                        className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group"
                    >
                        <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                            <item.icon className="w-6 h-6 text-white" />
                        </div>
                        <p className="font-semibold text-fog-800 mb-1">{item.label}</p>
                        <p className="text-sm text-fog-500">{item.desc}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
