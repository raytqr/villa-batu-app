'use client';

import Image from 'next/image';
import { Star, ThumbsUp } from 'lucide-react';
import { villaReviews } from '@/lib/mock-data';

interface ReviewsSectionProps {
    villaId: string;
    rating: number;
    reviewCount: number;
}

export function ReviewsSection({ villaId, rating, reviewCount }: ReviewsSectionProps) {
    const reviews = villaReviews[villaId] || [];

    if (reviews.length === 0) return null;

    return (
        <div className="mt-16">
            <h2 className="text-2xl font-bold text-fog-800 mb-6">Ulasan Tamu</h2>

            <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-2">
                    <Star className="w-8 h-8 fill-amber-400 text-amber-400" />
                    <span className="text-3xl font-bold text-fog-800">{rating}</span>
                </div>
                <div className="w-px h-8 bg-fog-200" />
                <div>
                    <p className="font-bold text-fog-800">{reviewCount} Ulasan</p>
                    <p className="text-sm text-fog-500">Rating rata-rata</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.map((review) => (
                    <div key={review.id} className="bg-white p-6 rounded-2xl border border-fog-100 shadow-sm">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-fog-100">
                                <Image
                                    src={review.avatar}
                                    alt={review.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-fog-800">{review.name}</h4>
                                <div className="flex items-center gap-2 text-sm text-fog-500">
                                    <div className="flex items-center text-amber-400">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'text-fog-200'}`}
                                            />
                                        ))}
                                    </div>
                                    <span>•</span>
                                    <span>{review.date}</span>
                                </div>
                            </div>
                        </div>
                        <p className="text-fog-600 leading-relaxed mb-4">
                            &quot;{review.comment}&quot;
                        </p>
                        <div className="flex items-center gap-2 text-sm text-fog-400 hover:text-fog-600 cursor-pointer w-fit">
                            <ThumbsUp className="w-4 h-4" />
                            <span>Membantu</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
