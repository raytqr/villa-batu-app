import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
}

export function formatPricePerPerson(totalPrice: number, guests: number): string {
    if (guests <= 0) return formatPrice(totalPrice);
    return formatPrice(Math.ceil(totalPrice / guests));
}

export function generateWhatsAppLink(
    phone: string,
    villaName: string,
    checkIn: string,
    checkOut: string,
    guests: number,
    addons: string[]
): string {
    const message = `Halo, saya tertarik dengan *${villaName}*.

📅 Check-in: ${checkIn}
📅 Check-out: ${checkOut}
👥 Jumlah Tamu: ${guests} orang
${addons.length > 0 ? `🎁 Add-ons: ${addons.join(', ')}` : ''}

Apakah villa tersedia untuk tanggal tersebut?`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function calculateNights(checkIn: Date, checkOut: Date): number {
    const diffTime = checkOut.getTime() - checkIn.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function getDateRangeText(checkIn: Date, checkOut: Date): string {
    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    };
    return `${checkIn.toLocaleDateString('id-ID', options)} - ${checkOut.toLocaleDateString('id-ID', options)}`;
}
