import Link from 'next/link';
import {
    Facebook,
    Instagram,
    Twitter,
    Youtube,
    Mail,
    Phone,
    MapPin,
    Send,
    ChevronRight
} from 'lucide-react';

export function Footer() {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { href: '/', label: 'Beranda' },
        { href: '/search', label: 'Cari Villa' },
        { href: '/search?collection=trending', label: 'Villa Trending' },
        { href: '/search?collection=luxury', label: 'Villa Luxury' },
        { href: '/search?collection=budget', label: 'Villa Budget' },
    ];

    const destinations = [
        { href: '/search?area=panderman', label: 'Panderman' },
        { href: '/search?area=selecta', label: 'Selecta' },
        { href: '/search?area=jatim-park', label: 'Jatim Park' },
        { href: '/search?area=paralayang', label: 'Paralayang' },
        { href: '/search?area=coban-rondo', label: 'Coban Rondo' },
    ];

    const socialLinks = [
        { href: '#', icon: Facebook, label: 'Facebook' },
        { href: '#', icon: Instagram, label: 'Instagram' },
        { href: '#', icon: Twitter, label: 'Twitter' },
        { href: '#', icon: Youtube, label: 'Youtube' },
    ];

    return (
        <footer className="bg-fog-900 text-fog-100">
            {/* Main Footer */}
            <div className="container-custom py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand & Description */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-pine-500 to-pine-600 rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-xl">V</span>
                            </div>
                            <div>
                                <p className="font-bold text-xl text-white">VillaBatu</p>
                                <p className="text-xs text-fog-400">Premium Stays</p>
                            </div>
                        </div>
                        <p className="text-fog-400 text-sm leading-relaxed mb-6">
                            Platform booking villa terpercaya di Kota Batu. Temukan pengalaman staycation terbaik dengan berbagai pilihan villa premium untuk keluarga dan grup.
                        </p>
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    className="w-10 h-10 bg-fog-800 hover:bg-pine-500 rounded-full flex items-center justify-center transition-colors"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Link Cepat</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-fog-400 hover:text-pine-400 transition-colors flex items-center gap-2 text-sm"
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Destinations */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Destinasi</h4>
                        <ul className="space-y-3">
                            {destinations.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-fog-400 hover:text-pine-400 transition-colors flex items-center gap-2 text-sm"
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Newsletter */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Hubungi Kami</h4>
                        <ul className="space-y-3 mb-6">
                            <li className="flex items-start gap-3 text-fog-400 text-sm">
                                <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
                                <span>Jl. Panderman No. 123, Kota Batu, Jawa Timur 65311</span>
                            </li>
                            <li className="flex items-center gap-3 text-fog-400 text-sm">
                                <Phone className="w-5 h-5 shrink-0" />
                                <span>+62 812-3456-7890</span>
                            </li>
                            <li className="flex items-center gap-3 text-fog-400 text-sm">
                                <Mail className="w-5 h-5 shrink-0" />
                                <span>hello@villabatu.id</span>
                            </li>
                        </ul>

                        {/* Newsletter */}
                        <h5 className="font-medium text-white mb-3 text-sm">Newsletter</h5>
                        <form className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Email kamu"
                                className="flex-1 px-4 py-2.5 bg-fog-800 rounded-xl text-sm text-white placeholder:text-fog-500 focus:outline-none focus:ring-2 focus:ring-pine-500"
                            />
                            <button
                                type="submit"
                                className="p-2.5 bg-pine-500 hover:bg-pine-600 rounded-xl transition-colors"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-fog-800">
                <div className="container-custom py-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-fog-500 text-sm">
                        © {currentYear} VillaBatu. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-fog-500">
                        <Link href="#" className="hover:text-pine-400 transition-colors">
                            Syarat & Ketentuan
                        </Link>
                        <Link href="#" className="hover:text-pine-400 transition-colors">
                            Kebijakan Privasi
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
