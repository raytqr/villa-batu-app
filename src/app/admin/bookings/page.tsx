'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useBookingStore } from '@/store/useBookingStore';
import { villas } from '@/lib/mock-data';
import { formatPrice } from '@/lib/utils';
import {
    Search, Filter, CheckCircle, XCircle, Clock,
    MoreHorizontal, Edit, Trash2, Phone, Calendar as CalendarIcon,
    FileText, User, MessageCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';

export default function AdminBookingsPage() {
    const { bookings, updateBookingStatus } = useBookingStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');

    const filteredBookings = bookings.filter(booking => {
        const matchesSearch =
            booking.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.guestPhone.includes(searchTerm);

        const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const getVillaName = (id: string) => villas.find(v => v.id === id)?.name || 'Unknown Villa';

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'confirmed':
                return <span className="px-2 py-1 bg-emerald-100 text-emerald-600 rounded-lg text-xs font-bold flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Confirmed</span>;
            case 'pending':
                return <span className="px-2 py-1 bg-amber-100 text-amber-600 rounded-lg text-xs font-bold flex items-center gap-1"><Clock className="w-3 h-3" /> Pending</span>;
            case 'cancelled':
                return <span className="px-2 py-1 bg-red-100 text-red-600 rounded-lg text-xs font-bold flex items-center gap-1"><XCircle className="w-3 h-3" /> Cancelled</span>;
            default:
                return <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-bold">{status}</span>;
        }
    };

    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-fog-800">Manajemen Booking</h1>
                    <p className="text-fog-500">Kelola pesanan masuk dan konfirmasi pembayaran</p>
                </div>
                <div className="flex gap-2">
                    <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-fog-100 flex items-center gap-2">
                        <span className="text-sm font-medium text-fog-600">Total Profit:</span>
                        <span className="text-lg font-bold text-emerald-600">
                            {formatPrice(bookings.reduce((sum, b) => b.status !== 'cancelled' ? sum + (b.profit || 0) : sum, 0))}
                        </span>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-2xl shadow-sm mb-6 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fog-400" />
                    <input
                        type="text"
                        placeholder="Cari Booking ID, Nama Tamu, atau No HP..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-fog-200 rounded-xl focus:border-pine-500 outline-none"
                    />
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
                    <Filter className="w-4 h-4 text-fog-400 shrink-0" />
                    {(['all', 'pending', 'confirmed', 'cancelled'] as const).map(status => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${statusFilter === status
                                    ? 'bg-pine-500 text-white'
                                    : 'bg-fog-100 text-fog-600 hover:bg-fog-200'
                                }`}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Bookings List */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {filteredBookings.length === 0 ? (
                    <div className="p-12 text-center text-fog-500">
                        <FileText className="w-12 h-12 mx-auto mb-4 text-fog-300" />
                        <p>Belum ada data booking yang sesuai.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-fog-100">
                        {filteredBookings.map((booking) => (
                            <div key={booking.id} className="p-6 hover:bg-fog-50 transition-colors group">
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                                    {/* Booking Info */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="font-mono text-sm font-bold text-pine-600 bg-pine-50 px-2 py-1 rounded">
                                                {booking.bookingId}
                                            </span>
                                            {getStatusBadge(booking.status)}
                                            <span className="text-xs text-fog-400">
                                                {format(new Date(booking.createdAt), 'dd MMM yyyy, HH:mm', { locale: idLocale })}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-bold text-fog-800 mb-1">
                                            {getVillaName(booking.villaId)}
                                        </h3>
                                        <div className="flex items-center gap-4 text-sm text-fog-600 mb-2">
                                            <div className="flex items-center gap-1">
                                                <CalendarIcon className="w-4 h-4 text-fog-400" />
                                                {format(new Date(booking.checkIn), 'dd MMM')} - {format(new Date(booking.checkOut), 'dd MMM yyyy')}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <User className="w-4 h-4 text-fog-400" />
                                                {booking.guestName}
                                            </div>
                                        </div>
                                        {booking.notes && (
                                            <p className="text-sm text-fog-500 italic bg-fog-50 p-2 rounded-lg inline-block">
                                                "{booking.notes}"
                                            </p>
                                        )}
                                    </div>

                                    {/* Financials */}
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 border-l border-fog-100 pl-6 lg:w-1/3">
                                        <div className="space-y-1">
                                            <p className="text-xs text-fog-500">Total Harga</p>
                                            <p className="font-bold text-fog-800 text-lg">{formatPrice(booking.totalPrice)}</p>
                                            <div className="flex gap-2 text-xs">
                                                <span className="text-emerald-600 font-medium">Cuan: {formatPrice(booking.profit)}</span>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-2 w-full sm:w-auto">
                                            {booking.status === 'pending' && (
                                                <button
                                                    onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                                                    className="flex-1 sm:flex-none px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-bold transition-colors"
                                                >
                                                    ACC Booking
                                                </button>
                                            )}
                                            <button className="p-2 text-fog-400 hover:text-pine-600 hover:bg-pine-50 rounded-lg transition-colors" title="Hubungi Tamu">
                                                <MessageCircle className="w-5 h-5" />
                                            </button>
                                            <Link href={`/admin/bookings/${booking.id}`} className="p-2 text-fog-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit / Detail">
                                                <Edit className="w-5 h-5" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
