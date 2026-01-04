import { HeroSection } from '@/components/home/HeroSection';
import { RecommendedVillas } from '@/components/home/RecommendedVillas';
import { FeaturedCollections } from '@/components/home/FeaturedCollections';
import { Testimonials } from '@/components/home/Testimonials';
import { villas } from '@/lib/mock-data';
import Link from 'next/link';
import { ArrowRight, Shield, Clock, Headphones, CreditCard } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Recommended Villas */}
      <RecommendedVillas villas={villas} />

      {/* Featured Collections */}
      <FeaturedCollections villas={villas} />

      {/* Why Choose Us */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-fog-800 mb-4">
              Kenapa Pilih VillaBatu?
            </h2>
            <p className="text-fog-500 max-w-2xl mx-auto">
              Kami menyediakan pengalaman booking villa terbaik dengan berbagai keunggulan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: 'Terpercaya',
                description: 'Semua villa sudah diverifikasi dan memiliki standar kualitas tinggi',
              },
              {
                icon: Clock,
                title: 'Booking Cepat',
                description: 'Proses booking instan via WhatsApp, konfirmasi dalam hitungan menit',
              },
              {
                icon: CreditCard,
                title: 'Harga Transparan',
                description: 'Tidak ada biaya tersembunyi, harga yang tertera adalah harga final',
              },
              {
                icon: Headphones,
                title: 'Support 24/7',
                description: 'Tim customer service siap membantu kapanpun Anda butuhkan',
              },
            ].map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 bg-pine-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-pine-500" />
                </div>
                <h3 className="font-bold text-lg text-fog-800 mb-2">{feature.title}</h3>
                <p className="text-fog-500 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-earth-500 to-earth-600">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Siap untuk Liburan Impian?
          </h2>
          <p className="text-earth-100 max-w-2xl mx-auto mb-8">
            Temukan villa sempurna untuk Anda dan keluarga. Booking sekarang dan dapatkan pengalaman menginap tak terlupakan di Kota Batu.
          </p>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 bg-white text-earth-600 font-semibold px-8 py-4 rounded-2xl hover:bg-fog-50 transition-colors shadow-lg"
          >
            <span>Cari Villa Sekarang</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
