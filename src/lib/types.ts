export interface Villa {
    id: string;
    name: string;
    slug: string;
    description: string;
    shortDescription: string;
    images: string[];
    price: number;
    originalPrice?: number; // Strikethrough price (fake higher price for discount display)
    weekendPrice?: number;
    highSeasonPrice?: number;
    // Owner Base Prices (Harga Kulakan)
    ownerPrice: number;
    ownerWeekendPrice: number;
    ownerHighSeasonPrice: number;
    capacity: number;
    bedrooms: number;
    bathrooms: number;
    poolSize?: string;
    hasPool: boolean;
    petAllowed: boolean;
    viewType: 'mountain' | 'city' | 'garden' | 'rice-field';
    amenities: Amenity[];
    location: {
        address: string;
        area: string;
        coordinates?: {
            lat: number;
            lng: number;
        };
    };
    rating: number;
    reviewCount: number;
    isRecommended: boolean;
    isTrending: boolean;
    isBudget: boolean;
    isLuxury: boolean;
    bookedDates: string[]; // ISO date strings
    createdAt: string;
    updatedAt: string;
}

export interface Amenity {
    id: string;
    name: string;
    icon: string;
    category: 'general' | 'kitchen' | 'bathroom' | 'outdoor' | 'entertainment';
}

export interface AddOn {
    id: string;
    name: string;
    description: string;
    price: number;
    icon: string;
}

export interface Booking {
    id: string;
    villaId: string;
    guestName: string;
    guestPhone: string;
    guestEmail: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    addOns: AddOn[];
    totalPrice: number;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    paymentStatus: 'unpaid' | 'down-payment' | 'paid';
    notes?: string;
    bookingId: string; // User readable ID e.g., INV-2410-AK39
    customerPhone: string;
    profit: number; // Selling Price - Owner Price
    history: {
        action: 'created' | 'updated' | 'status_change' | 'rescheduled';
        timestamp: string;
        note?: string;
    }[];
    createdAt: string;
}

export interface PricingRule {
    id: string;
    villaId: string;
    type: 'weekend' | 'high-season' | 'custom';
    startDate?: string;
    endDate?: string;
    priceMultiplier?: number;
    fixedPrice?: number;
    daysOfWeek?: number[]; // 0-6, Sunday-Saturday
}

export interface Review {
    id: string;
    villaId: string;
    guestName: string;
    rating: number;
    comment: string;
    createdAt: string;
}

export interface FilterState {
    checkIn: Date | null;
    checkOut: Date | null;
    priceRange: [number, number];
    hasPool: boolean | null;
    petAllowed: boolean | null;
    viewType: Villa['viewType'] | null;
    minCapacity: number;
    area: string | null;
}
