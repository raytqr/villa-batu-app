import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Booking } from '@/lib/types';

interface BookingStore {
    bookings: Booking[];
    addBooking: (booking: Booking) => void;
    updateBookingStatus: (id: string, status: Booking['status']) => void;
    updatePaymentStatus: (id: string, status: Booking['paymentStatus']) => void;
    updateBookingDetails: (id: string, updates: Partial<Booking>) => void;
    rescheduleBooking: (id: string, newCheckIn: string, newCheckOut: string) => void;
    addHistoryLog: (id: string, log: Booking['history'][number]) => void;
    getBookingsByStatus: (status: Booking['status']) => Booking[];
    getBookingById: (id: string) => Booking | undefined;
}

export const useBookingStore = create<BookingStore>()(
    persist(
        (set, get) => ({
            bookings: [],

            addBooking: (booking) => set((state) => ({
                bookings: [booking, ...state.bookings]
            })),

            updateBookingStatus: (id, status) => set((state) => ({
                bookings: state.bookings.map(b =>
                    b.id === id
                        ? {
                            ...b,
                            status,
                            history: [
                                ...b.history,
                                {
                                    action: 'status_change',
                                    timestamp: new Date().toISOString(),
                                    note: `Status changed to ${status}`
                                }
                            ]
                        }
                        : b
                )
            })),

            updatePaymentStatus: (id, status) => set((state) => ({
                bookings: state.bookings.map(b =>
                    b.id === id
                        ? {
                            ...b,
                            paymentStatus: status,
                            history: [
                                ...b.history,
                                {
                                    action: 'updated',
                                    timestamp: new Date().toISOString(),
                                    note: `Payment status updated to ${status}`
                                }
                            ]
                        }
                        : b
                )
            })),

            updateBookingDetails: (id, updates) => set((state) => ({
                bookings: state.bookings.map(b =>
                    b.id === id
                        ? {
                            ...b,
                            ...updates,
                            history: [
                                ...b.history,
                                {
                                    action: 'updated',
                                    timestamp: new Date().toISOString(),
                                    note: 'Booking details updated'
                                }
                            ]
                        }
                        : b
                )
            })),

            rescheduleBooking: (id, newCheckIn, newCheckOut) => set((state) => ({
                bookings: state.bookings.map(b =>
                    b.id === id
                        ? {
                            ...b,
                            checkIn: newCheckIn,
                            checkOut: newCheckOut,
                            status: 'pending', // Reset to pending potentially
                            history: [
                                ...b.history,
                                {
                                    action: 'rescheduled',
                                    timestamp: new Date().toISOString(),
                                    note: `Rescheduled to ${newCheckIn} - ${newCheckOut}`
                                }
                            ]
                        }
                        : b
                )
            })),

            addHistoryLog: (id, log) => set((state) => ({
                bookings: state.bookings.map(b =>
                    b.id === id
                        ? { ...b, history: [...b.history, log] }
                        : b
                )
            })),

            getBookingsByStatus: (status) => get().bookings.filter(b => b.status === status),

            getBookingById: (id) => get().bookings.find(b => b.id === id || b.bookingId === id),
        }),
        {
            name: 'booking-storage',
        }
    )
);
