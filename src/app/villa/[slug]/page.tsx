import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
    MapPin,
    Star,
    Users,
    BedDouble,
    Bath,
    Waves,
    ChevronLeft,
    Check,
    Mountain,
    Building,
    TreeDeciduous
} from 'lucide-react';
import { villas } from '@/lib/mock-data';
import { formatPrice } from '@/lib/utils';
import { BookingCalculator } from '@/components/villa/BookingCalculator';
import { VillaCard } from '@/components/villa/VillaCard';
import { ReviewsSection } from '@/components/villa/ReviewsSection';

// Generate static params for all villas
export async function generateStaticParams() {
    return villas.map((villa) => ({
        slug: villa.slug,
    }));
}

interface VillaDetailPageProps {
    params: { slug: string };
}

export default function VillaDetailPage({ params }: VillaDetailPageProps) {
    const villa = villas.find((v) => v.slug === params.slug);

    if (!villa) {
        notFound();
    }

    const similarVillas = villas
        .filter((v) => v.id !== villa.id && (v.viewType === villa.viewType || v.location.area === villa.location.area))
        .slice(0, 3);

    const viewIcons = {
        mountain: Mountain,
        city: Building,
        garden: TreeDeciduous,
        'rice-field': TreeDeciduous,
    };

    const ViewIcon = viewIcons[villa.viewType];

    return (
        <div className="pt-20 min-h-screen bg-fog-50">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-fog-100">
                <div className="container-custom py-4">
                    <Link href="/search" className="inline-flex items-center gap-2 text-fog-600 hover:text-pine-600 transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                        <span>Kembali ke pencarian</span>
                    </Link>
                </div>
            </div>

            <div className="container-custom py-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-fog-800 mb-2">{villa.name}</h1>
                        <div className="flex flex-wrap items-center gap-4 text-fog-600">
                            <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                <span>{villa.location.area}, Batu</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                <span className="font-medium">{villa.rating}</span>
                                <span>({villa.reviewCount} review)</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Gallery */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="md:col-span-2 md:row-span-2 relative h-64 md:h-full rounded-2xl overflow-hidden">
                        <Image
                            src={villa.images[0]}
                            alt={villa.name}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                    {villa.images.slice(1, 5).map((image, index) => (
                        <div key={index} className="relative h-40 md:h-48 rounded-2xl overflow-hidden">
                            <Image
                                src={image}
                                alt={`${villa.name} ${index + 2}`}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-500"
                            />
                            {index === 3 && villa.images.length > 5 && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <span className="text-white font-semibold">+{villa.images.length - 5} foto</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Quick Info */}
                        <div className="bg-white rounded-3xl p-6 shadow-card">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div className="text-center p-4 bg-fog-50 rounded-2xl">
                                    <Users className="w-8 h-8 text-pine-500 mx-auto mb-2" />
                                    <p className="text-2xl font-bold text-fog-800">{villa.capacity}</p>
                                    <p className="text-fog-500 text-sm">Tamu</p>
                                </div>
                                <div className="text-center p-4 bg-fog-50 rounded-2xl">
                                    <BedDouble className="w-8 h-8 text-pine-500 mx-auto mb-2" />
                                    <p className="text-2xl font-bold text-fog-800">{villa.bedrooms}</p>
                                    <p className="text-fog-500 text-sm">Kamar Tidur</p>
                                </div>
                                <div className="text-center p-4 bg-fog-50 rounded-2xl">
                                    <Bath className="w-8 h-8 text-pine-500 mx-auto mb-2" />
                                    <p className="text-2xl font-bold text-fog-800">{villa.bathrooms}</p>
                                    <p className="text-fog-500 text-sm">Kamar Mandi</p>
                                </div>
                                <div className="text-center p-4 bg-fog-50 rounded-2xl">
                                    <ViewIcon className="w-8 h-8 text-pine-500 mx-auto mb-2" />
                                    <p className="text-2xl font-bold text-fog-800 capitalize">{villa.viewType.replace('-', ' ')}</p>
                                    <p className="text-fog-500 text-sm">View</p>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-3xl p-6 shadow-card">
                            <h2 className="text-xl font-bold text-fog-800 mb-4">Tentang Villa Ini</h2>
                            <p className="text-fog-600 leading-relaxed">{villa.description}</p>
                        </div>

                        {/* Amenities */}
                        <div className="bg-white rounded-3xl p-6 shadow-card">
                            <h2 className="text-xl font-bold text-fog-800 mb-4">Fasilitas</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {villa.amenities.map((amenity) => (
                                    <div key={amenity.id} className="flex items-center gap-3 p-3 bg-fog-50 rounded-xl">
                                        <Check className="w-5 h-5 text-pine-500" />
                                        <span className="text-fog-700">{amenity.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Pool Info */}
                        {villa.hasPool && villa.poolSize && (
                            <div className="bg-gradient-to-r from-pine-500 to-pine-600 rounded-3xl p-6 text-white">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                                        <Waves className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-1">Private Swimming Pool</h3>
                                        <p className="text-pine-100">Ukuran kolam: {villa.poolSize}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Location */}
                        <div className="bg-white rounded-3xl p-6 shadow-card">
                            <h2 className="text-xl font-bold text-fog-800 mb-4">Lokasi</h2>
                            <div className="flex items-start gap-3 mb-4">
                                <MapPin className="w-5 h-5 text-pine-500 mt-1" />
                                <div>
                                    <p className="font-medium text-fog-800">{villa.location.address}</p>
                                    <p className="text-fog-500">{villa.location.area}, Kota Batu</p>
                                </div>
                            </div>
                            <div className="rounded-2xl overflow-hidden">
                                <iframe
                                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${villa.location.coordinates
                                        ? `${villa.location.coordinates.lat},${villa.location.coordinates.lng}`
                                        : encodeURIComponent(villa.location.address + ', Kota Batu, Jawa Timur')
                                        }`}
                                    width="100%"
                                    height="256"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="w-full"
                                />
                            </div>
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(villa.location.address + ', Kota Batu, Jawa Timur')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 mt-4 py-3 bg-fog-100 hover:bg-fog-200 rounded-xl text-fog-700 font-medium transition-colors"
                            >
                                <MapPin className="w-4 h-4" />
                                <span>Buka di Google Maps</span>
                            </a>
                        </div>
                    </div>

                    {/* Sidebar - Booking Calculator */}
                    <div className="lg:col-span-1">
                        <BookingCalculator villa={villa} />
                    </div>
                </div>

                {/* Reviews Section */}
                <ReviewsSection villaId={villa.id} rating={villa.rating} reviewCount={villa.reviewCount} />

                {/* Similar Villas */}
                {similarVillas.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold text-fog-800 mb-6">Villa Serupa</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {similarVillas.map((v, index) => (
                                <VillaCard key={v.id} villa={v} index={index} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile Floating Book Button */}
            <div className="fab">
                <div className="bg-white rounded-2xl shadow-lg p-4 flex items-center justify-between">
                    <div>
                        <p className="text-pine-600 font-bold text-xl">{formatPrice(villa.price)}</p>
                        <p className="text-fog-500 text-sm">/malam</p>
                    </div>
                    <button className="btn-primary">
                        Book via WhatsApp
                    </button>
                </div>
            </div>
        </div>
    );
}
