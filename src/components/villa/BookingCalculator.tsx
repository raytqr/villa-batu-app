'use client';

import { useState, useMemo } from 'react';
import { Calendar, Minus, Plus, Check, MessageCircle, ExternalLink, User, Phone, Mail } from 'lucide-react';
import { Villa, AddOn } from '@/lib/types';
import { addOns as allAddOns, WHATSAPP_NUMBER } from '@/lib/mock-data';
import { formatPrice, generateWhatsAppLink, calculateNights } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { useCompareStore } from '@/store/useCompareStore';
import { useBookingStore } from '@/store/useBookingStore';
import { generateBookingId } from '@/lib/booking-utils';

interface BookingCalculatorProps {
    villa: Villa;
}

interface AddOnWithQty extends AddOn {
    quantity: number;
}

export function BookingCalculator({ villa }: BookingCalculatorProps) {
    const [checkIn, setCheckIn] = useState<string>('');
    const [checkOut, setCheckOut] = useState<string>('');
    const [guestName, setGuestName] = useState('');
    const [guestPhone, setGuestPhone] = useState('');
    const [guestEmail, setGuestEmail] = useState('');
    const [notes, setNotes] = useState('');
    const [addOnsQty, setAddOnsQty] = useState<AddOnWithQty[]>(
        allAddOns.map(a => ({ ...a, quantity: 0 }))
    );
    const { addVilla, isInCompare } = useCompareStore();
    const { addBooking } = useBookingStore();
    const inCompare = isInCompare(villa.id);

    const nights = useMemo(() => {
        if (!checkIn || !checkOut) return 1;
        return calculateNights(new Date(checkIn), new Date(checkOut));
    }, [checkIn, checkOut]);

    // Dynamic pricing based on date
    const priceInfo = useMemo(() => {
        if (!checkIn) {
            return { price: villa.price, type: 'normal', label: 'Harga Normal' };
        }

        const checkInDate = new Date(checkIn);
        const dayOfWeek = checkInDate.getDay(); // 0=Sunday, 5=Friday, 6=Saturday

        // Check if weekend (Friday=5, Saturday=6, Sunday=0)
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 5 || dayOfWeek === 6;

        if (isWeekend && villa.weekendPrice) {
            return { price: villa.weekendPrice, type: 'weekend', label: 'Harga Weekend' };
        }

        return { price: villa.price, type: 'normal', label: 'Harga Normal' };
    }, [checkIn, villa.price, villa.weekendPrice]);

    const basePrice = priceInfo.price * nights;
    const addOnsTotal = addOnsQty.reduce((sum, addon) => sum + (addon.price * addon.quantity), 0);
    const totalPrice = basePrice + addOnsTotal;

    // Split bill berdasarkan kapasitas villa, bukan jumlah tamu
    const pricePerPerson = Math.ceil(totalPrice / villa.capacity);

    const updateAddOnQty = (addonId: string, delta: number) => {
        setAddOnsQty(prev => prev.map(addon => {
            if (addon.id === addonId) {
                const newQty = Math.max(0, Math.min(10, addon.quantity + delta));
                return { ...addon, quantity: newQty };
            }
            return addon;
        }));
    };

    const selectedAddOns = addOnsQty.filter(a => a.quantity > 0);

    const handleBooking = () => {
        if (!checkIn || !checkOut || !guestName || !guestPhone) {
            alert('Mohon lengkapi data check-in, check-out, nama, dan nomor HP.');
            return;
        }

        const bookingId = generateBookingId();
        const addOnsList = selectedAddOns.map(a =>
            a.quantity > 1 ? `${a.name} x${a.quantity}` : a.name
        );

        // Calculate Profit (Selling Price - Owner Price)
        // Determine if using weekend or high season owner price
        let ownerBasePriceRate = villa.ownerPrice;
        if (priceInfo.type === 'weekend') ownerBasePriceRate = villa.ownerWeekendPrice;
        if (priceInfo.type === 'high-season') ownerBasePriceRate = villa.ownerHighSeasonPrice;

        const totalOwnerPrice = ownerBasePriceRate * nights; // Add-ons profit logic usually belongs to calo fully or split, for now assume add-ons are flow-through or full profit. Let's assume add-ons are 100% revenue for now or handled separately. For simplicity, profit = (BaseSell - BaseBuy) + AddOns.

        const profit = (basePrice - totalOwnerPrice); // Simple profit calc on room rate

        // Create Booking Record in Store
        addBooking({
            id: bookingId, // Use readable ID as primary key for simplicity, or generate UUID
            bookingId: bookingId,
            villaId: villa.id,
            guestName,
            guestPhone,
            guestEmail,
            checkIn,
            checkOut,
            guests: villa.capacity, // Default to max capacity or add guest input if needed
            addOns: selectedAddOns,
            totalPrice,
            status: 'pending',
            paymentStatus: 'unpaid',
            profit,
            notes,
            customerPhone: guestPhone,
            history: [{
                action: 'created',
                timestamp: new Date().toISOString(),
                note: 'Booking created via website'
            }],
            createdAt: new Date().toISOString(),
        });

        // WhatsApp Redirect
        const waMessage = `Halo Villa Batu, saya ingin booking:
*ID Booking: ${bookingId}*
Villa: ${villa.name}
Check-in: ${checkIn}
Check-out: ${checkOut}
Nama: ${guestName}
Tamu: ${villa.capacity} Orang (Max)
Add-ons: ${addOnsList.length > 0 ? addOnsList.join(', ') : '-'}
Catatan: ${notes || '-'}
Total: ${formatPrice(totalPrice)}

Mohon info ketersediaan. Terima kasih.`;

        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`, '_blank');
    };

    const handleCompare = () => {
        if (!inCompare) {
            addVilla(villa);
        }
    };

    return (
        <div className="bg-white rounded-3xl shadow-card p-6 sticky top-24">
            {/* Price Header */}
            <div className="mb-6">
                <div className="flex items-baseline gap-2 flex-wrap">
                    {villa.originalPrice && villa.originalPrice > priceInfo.price && (
                        <span className="text-lg text-fog-400 line-through">{formatPrice(villa.originalPrice)}</span>
                    )}
                    <span className="text-3xl font-bold text-fog-800">{formatPrice(priceInfo.price)}</span>
                    <span className="text-fog-500">/malam</span>
                </div>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                    {villa.originalPrice && villa.originalPrice > priceInfo.price && (
                        <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded">
                            Hemat {Math.round((1 - priceInfo.price / villa.originalPrice) * 100)}%
                        </span>
                    )}
                    {priceInfo.type === 'weekend' && (
                        <span className="px-2 py-0.5 bg-amber-500 text-white text-xs font-bold rounded">
                            🎉 Weekend Price
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-1 mt-2">
                    <span className="text-amber-500">★</span>
                    <span className="font-medium">{villa.rating}</span>
                    <span className="text-fog-500">({villa.reviewCount} review)</span>
                </div>
            </div>

            {/* Date Selection */}
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="relative">
                    <label className="block text-xs font-medium text-fog-600 mb-1">Check-in</label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fog-400" />
                        <input
                            type="date"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full pl-10 pr-3 py-2.5 border border-fog-200 rounded-xl text-sm bg-white text-fog-800 focus:border-pine-500 focus:ring-2 focus:ring-pine-500/20 outline-none"
                        />
                    </div>
                </div>
                <div className="relative">
                    <label className="block text-xs font-medium text-fog-600 mb-1">Check-out</label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fog-400" />
                        <input
                            type="date"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            min={checkIn || new Date().toISOString().split('T')[0]}
                            className="w-full pl-10 pr-3 py-2.5 border border-fog-200 rounded-xl text-sm bg-white text-fog-800 focus:border-pine-500 focus:ring-2 focus:ring-pine-500/20 outline-none"
                        />
                    </div>
                </div>
            </div>

            {/* Capacity Info */}
            <div className="mb-6 p-3 bg-pine-50 rounded-xl border border-pine-100">
                <p className="text-sm text-pine-700 font-medium">
                    🏠 Kapasitas: <span className="font-bold">{villa.capacity} tamu</span>
                </p>
            </div>

            {/* Add-ons with Quantity */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-fog-700 mb-3">Tambahan (Opsional)</label>
                <div className="space-y-2">
                    {addOnsQty.map((addon) => (
                        <div
                            key={addon.id}
                            className={cn(
                                "flex items-center justify-between p-3 rounded-xl border transition-all",
                                addon.quantity > 0
                                    ? "border-pine-500 bg-pine-50"
                                    : "border-fog-200"
                            )}
                        >
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-fog-700 text-sm">{addon.name}</p>
                                <p className="text-xs text-fog-500 truncate">{addon.description}</p>
                                <p className="text-pine-600 font-medium text-xs mt-0.5">
                                    {formatPrice(addon.price)}/item
                                </p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0 ml-3">
                                <button
                                    onClick={() => updateAddOnQty(addon.id, -1)}
                                    disabled={addon.quantity === 0}
                                    className="w-7 h-7 rounded-lg border border-fog-200 flex items-center justify-center hover:bg-fog-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                    <Minus className="w-3 h-3" />
                                </button>
                                <span className="w-6 text-center font-semibold text-sm">{addon.quantity}</span>
                                <button
                                    onClick={() => updateAddOnQty(addon.id, 1)}
                                    disabled={addon.quantity >= 10}
                                    className="w-7 h-7 rounded-lg border border-fog-200 flex items-center justify-center hover:bg-fog-100 transition-colors disabled:opacity-30"
                                >
                                    <Plus className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-fog-50 rounded-2xl p-4 mb-4 space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="text-fog-600">{formatPrice(villa.price)} x {nights} malam</span>
                    <span className="text-fog-700">{formatPrice(basePrice)}</span>
                </div>
                {selectedAddOns.map((addon) => (
                    <div key={addon.id} className="flex justify-between text-sm">
                        <span className="text-fog-600">{addon.name} x{addon.quantity}</span>
                        <span className="text-fog-700">{formatPrice(addon.price * addon.quantity)}</span>
                    </div>
                ))}
                <div className="pt-2 border-t border-fog-200">
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span className="text-pine-600">{formatPrice(totalPrice)}</span>
                    </div>
                </div>
            </div>

            {/* Split Bill Feature */}
            <div className="bg-gradient-to-r from-earth-50 to-amber-50 rounded-2xl p-4 mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-earth-700 font-medium">💡 Split Bill</p>
                        <p className="text-xs text-earth-600">Patungan untuk {villa.capacity} orang</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xl font-bold text-earth-700">{formatPrice(pricePerPerson)}</p>
                        <p className="text-xs text-earth-600">/orang</p>
                    </div>
                </div>
            </div>

            {/* Guest Details Form */}
            <div className="mb-6 space-y-3 p-4 bg-fog-50 rounded-2xl border border-fog-100">
                <h3 className="font-semibold text-fog-800 text-sm mb-2">Data Pemesan</h3>
                <div className="space-y-3">
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fog-400" />
                        <input
                            type="text"
                            placeholder="Nama Lengkap"
                            value={guestName}
                            onChange={(e) => setGuestName(e.target.value)}
                            className="w-full pl-10 pr-3 py-2 border border-fog-200 rounded-xl text-sm focus:border-pine-500 outline-none"
                        />
                    </div>
                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fog-400" />
                        <input
                            type="tel"
                            placeholder="Nomor WhatsApp"
                            value={guestPhone}
                            onChange={(e) => setGuestPhone(e.target.value)}
                            className="w-full pl-10 pr-3 py-2 border border-fog-200 rounded-xl text-sm focus:border-pine-500 outline-none"
                        />
                    </div>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fog-400" />
                        <input
                            type="email"
                            placeholder="Email (Opsional)"
                            value={guestEmail}
                            onChange={(e) => setGuestEmail(e.target.value)}
                            className="w-full pl-10 pr-3 py-2 border border-fog-200 rounded-xl text-sm focus:border-pine-500 outline-none"
                        />
                    </div>
                    <div>
                        <textarea
                            placeholder="Catatan Tambahan (Opsional)"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={2}
                            className="w-full px-3 py-2 border border-fog-200 rounded-xl text-sm focus:border-pine-500 outline-none resize-none"
                        />
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
                <button
                    onClick={handleBooking}
                    className="w-full btn-primary flex items-center justify-center gap-2 py-4 text-lg"
                >
                    <MessageCircle className="w-5 h-5" />
                    <span>Buat Pesanan</span>
                </button>

                <button
                    onClick={handleCompare}
                    disabled={inCompare}
                    className={cn(
                        "w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold transition-all border-2",
                        inCompare
                            ? "border-pine-500 bg-pine-50 text-pine-600 cursor-default"
                            : "border-fog-300 hover:border-pine-500 hover:bg-pine-50 text-fog-700"
                    )}
                >
                    {inCompare ? (
                        <>
                            <Check className="w-5 h-5" />
                            <span>Di Perbandingan</span>
                        </>
                    ) : (
                        <>
                            <Plus className="w-5 h-5" />
                            <span>Bandingkan Villa</span>
                        </>
                    )}
                </button>
            </div>

            <p className="text-center text-xs text-fog-500 mt-3">
                Gratis pembatalan dalam 24 jam
            </p>
        </div>
    );
}
