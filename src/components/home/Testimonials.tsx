'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { testimonials } from '@/lib/mock-data';
import { Star, Quote } from 'lucide-react';

export function Testimonials() {
    return (
        <section className="section-padding bg-gradient-to-br from-pine-600 to-pine-700 overflow-hidden">
            <div className="container-custom">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Apa Kata Mereka?
                    </h2>
                    <p className="text-pine-100 max-w-2xl mx-auto">
                        Ribuan tamu telah mempercayakan liburan mereka kepada VillaBatu
                    </p>
                </motion.div>

                {/* Testimonial Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-3xl p-6 shadow-xl"
                        >
                            {/* Quote Icon */}
                            <Quote className="w-10 h-10 text-pine-100 mb-4" />

                            {/* Rating */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                                ))}
                            </div>

                            {/* Comment */}
                            <p className="text-fog-600 mb-6 leading-relaxed">
                                "{testimonial.comment}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3 pt-4 border-t border-fog-100">
                                <Image
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    width={48}
                                    height={48}
                                    className="rounded-full"
                                />
                                <div>
                                    <p className="font-semibold text-fog-800">{testimonial.name}</p>
                                    <p className="text-fog-500 text-sm">{testimonial.villaName} • {testimonial.date}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
