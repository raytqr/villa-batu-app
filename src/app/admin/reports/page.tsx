'use client';

import { useState } from 'react';
import { useBookingStore } from '@/store/useBookingStore';
import { formatPrice } from '@/lib/utils';
import {
    DollarSign, TrendingUp, TrendingDown, Download
} from 'lucide-react';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';

export default function AdminReportsPage() {
    const { bookings } = useBookingStore();
    const [selectedMonth, setSelectedMonth] = useState(new Date());

    // Filter bookings for the selected month and NOT cancelled
    const monthBookings = bookings.filter(b => {
        const bookingDate = new Date(b.createdAt);
        return bookingDate.getMonth() === selectedMonth.getMonth() &&
            bookingDate.getFullYear() === selectedMonth.getFullYear() &&
            b.status !== 'cancelled';
    });

    const totalRevenue = monthBookings.reduce((sum, b) => sum + b.totalPrice, 0);
    const totalProfit = monthBookings.reduce((sum, b) => sum + (b.profit || 0), 0);
    const totalOwnerShare = totalRevenue - totalProfit;
    const profitMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;

    const handlePrintPDF = () => {
        window.print();
    };

    return (
        <div className="p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 print:hidden">
                <div>
                    <h1 className="text-2xl font-bold text-fog-800">Laporan Keuangan</h1>
                    <p className="text-fog-500">Ringkasan pendapatan dan profit bulanan</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setSelectedMonth(new Date(selectedMonth.setMonth(selectedMonth.getMonth() - 1)))}
                        className="p-2 hover:bg-fog-100 rounded-lg"
                    >
                        Prev
                    </button>
                    <div className="bg-white px-4 py-2 rounded-xl border border-fog-200 font-medium">
                        {format(selectedMonth, 'MMMM yyyy', { locale: idLocale })}
                    </div>
                    <button
                        onClick={() => setSelectedMonth(new Date(selectedMonth.setMonth(selectedMonth.getMonth() + 1)))}
                        className="p-2 hover:bg-fog-100 rounded-lg"
                    >
                        Next
                    </button>
                    <button
                        onClick={handlePrintPDF}
                        className="ml-2 btn-primary flex items-center gap-2"
                    >
                        <Download className="w-4 h-4" />
                        <span>Export PDF</span>
                    </button>
                </div>
            </div>

            {/* Financial Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-fog-100">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                            <DollarSign className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-sm text-fog-500">Total Pendapatan (Omzet)</p>
                            <h3 className="text-2xl font-bold text-fog-800">{formatPrice(totalRevenue)}</h3>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-emerald-600 font-medium">
                        <TrendingUp className="w-4 h-4" />
                        <span>+12% dari bulan lalu</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-fog-100">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                            <TrendingDown className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-fog-500">Setor ke Owner (Modal)</p>
                            <h3 className="text-2xl font-bold text-fog-800">{formatPrice(totalOwnerShare)}</h3>
                        </div>
                    </div>
                    <p className="text-sm text-fog-500">Biaya dasar villa & operasional</p>
                </div>

                <div className="bg-gradient-to-br from-pine-600 to-emerald-600 p-6 rounded-2xl shadow-lg text-white">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className="text-pine-100 text-sm">Total Profit (Cuan)</p>
                            <h3 className="text-2xl font-bold">{formatPrice(totalProfit)}</h3>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-pine-100">Margin Profit</p>
                        <span className="font-bold text-lg">{profitMargin.toFixed(1)}%</span>
                    </div>
                </div>
            </div>

            {/* Transaction List Table */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-fog-100 flex justify-between items-center">
                    <h3 className="font-bold text-lg text-fog-800">Rincian Transaksi</h3>
                    <span className="text-sm text-fog-500">{monthBookings.length} Transaksi</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-fog-50 text-fog-600 text-sm">
                            <tr>
                                <th className="p-4 font-medium">Tanggal</th>
                                <th className="p-4 font-medium">Booking ID</th>
                                <th className="p-4 font-medium">Tamu</th>
                                <th className="p-4 font-medium text-right">Harga Jual</th>
                                <th className="p-4 font-medium text-right">Harga Owner</th>
                                <th className="p-4 font-medium text-right">Profit</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-fog-100">
                            {monthBookings.map((b) => (
                                <tr key={b.id} className="hover:bg-fog-50 transition-colors text-sm">
                                    <td className="p-4 text-fog-600">{format(new Date(b.createdAt), 'dd/MM/yyyy')}</td>
                                    <td className="p-4 font-medium text-fog-800">{b.bookingId}</td>
                                    <td className="p-4 text-fog-600">{b.guestName}</td>
                                    <td className="p-4 text-right font-medium text-fog-800">{formatPrice(b.totalPrice)}</td>
                                    <td className="p-4 text-right text-fog-500">{formatPrice(b.totalPrice - (b.profit || 0))}</td>
                                    <td className="p-4 text-right font-bold text-emerald-600">{formatPrice(b.profit || 0)}</td>
                                </tr>
                            ))}
                            {monthBookings.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-fog-500">
                                        Tidak ada transaksi bulan ini
                                    </td>
                                </tr>
                            )}
                        </tbody>
                        {monthBookings.length > 0 && (
                            <tfoot className="bg-fog-50 font-bold text-fog-800">
                                <tr>
                                    <td colSpan={3} className="p-4 text-right">Total</td>
                                    <td className="p-4 text-right">{formatPrice(totalRevenue)}</td>
                                    <td className="p-4 text-right text-fog-600">{formatPrice(totalOwnerShare)}</td>
                                    <td className="p-4 text-right text-emerald-600">{formatPrice(totalProfit)}</td>
                                </tr>
                            </tfoot>
                        )}
                    </table>
                </div>
            </div>

            {/* Print Styles */}
            <style jsx global>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    div.p-6 {
                        visibility: visible;
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                    }
                    div.p-6 * {
                        visibility: visible;
                    }
                    .print\\:hidden {
                        display: none !important;
                    }
                }
            `}</style>
        </div>
    );
}
