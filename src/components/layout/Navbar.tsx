'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Search, Mountain, GitCompare } from 'lucide-react';
import { useCompareStore } from '@/store/useCompareStore';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { villas, openModal } = useCompareStore();
    const pathname = usePathname();
    const router = useRouter();

    // Pages that have dark hero background
    const hasDarkHero = pathname === '/';
    const showSolidNavbar = isScrolled || !hasDarkHero;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                    showSolidNavbar
                        ? "bg-white/95 backdrop-blur-lg shadow-sm"
                        : "bg-gradient-to-b from-black/50 to-transparent"
                )}
            >
                <div className="container-custom">
                    <nav className="flex items-center justify-between h-16 md:h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2.5 group">
                            <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-all transform rotate-3 group-hover:rotate-0 duration-300",
                                showSolidNavbar
                                    ? "bg-gradient-to-br from-pine-500 to-pine-600"
                                    : "bg-white/20 backdrop-blur-sm"
                            )}>
                                <Mountain className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <span className={cn(
                                    "text-xl font-bold font-serif tracking-tight",
                                    showSolidNavbar ? "text-fog-800" : "text-white"
                                )}>
                                    VillaBatu
                                </span>
                                <p className={cn(
                                    "text-[10px] tracking-widest uppercase",
                                    showSolidNavbar ? "text-pine-600" : "text-pine-100"
                                )}>
                                    Luxury & Nature
                                </p>
                            </div>
                        </Link>

                        {/* Center - Search Bar */}
                        <div className="hidden md:flex flex-1 max-w-xl mx-8">
                            <button
                                onClick={() => router.push('/search')}
                                className={cn(
                                    "w-full flex items-center gap-3 px-5 py-2.5 rounded-full transition-all text-left",
                                    showSolidNavbar
                                        ? "bg-fog-100 hover:bg-fog-200 text-fog-500"
                                        : "bg-white/15 hover:bg-white/25 text-white/80 backdrop-blur-sm"
                                )}
                            >
                                <Search className="w-4 h-4" />
                                <span className="text-sm">Cari villa, lokasi, atau fasilitas...</span>
                            </button>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                            {/* Mobile Search */}
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className={cn(
                                    "md:hidden p-2.5 rounded-xl transition-all",
                                    showSolidNavbar
                                        ? "bg-fog-100 hover:bg-fog-200 text-fog-600"
                                        : "bg-white/15 hover:bg-white/25 text-white backdrop-blur-sm"
                                )}
                            >
                                <Search className="w-5 h-5" />
                            </button>

                            {/* Compare Button */}
                            <button
                                onClick={openModal}
                                className={cn(
                                    "relative p-2.5 rounded-xl transition-all",
                                    showSolidNavbar
                                        ? "bg-fog-100 hover:bg-fog-200 text-fog-600"
                                        : "bg-white/15 hover:bg-white/25 text-white backdrop-blur-sm"
                                )}
                            >
                                <GitCompare className="w-5 h-5" />
                                {villas.length > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-pine-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                                        {villas.length}
                                    </span>
                                )}
                            </button>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className={cn(
                                    "md:hidden p-2.5 rounded-xl transition-all",
                                    showSolidNavbar
                                        ? "bg-fog-100 hover:bg-fog-200 text-fog-600"
                                        : "bg-white/15 hover:bg-white/25 text-white backdrop-blur-sm"
                                )}
                            >
                                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                        </div>
                    </nav>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-white border-t border-fog-100 shadow-lg"
                        >
                            <div className="container-custom py-4 space-y-2">
                                <Link
                                    href="/"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={cn(
                                        "block px-4 py-3 rounded-xl font-medium transition-colors",
                                        pathname === '/'
                                            ? "bg-pine-50 text-pine-600"
                                            : "text-fog-700 hover:bg-fog-50"
                                    )}
                                >
                                    Beranda
                                </Link>
                                <Link
                                    href="/search"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={cn(
                                        "block px-4 py-3 rounded-xl font-medium transition-colors",
                                        pathname === '/search'
                                            ? "bg-pine-50 text-pine-600"
                                            : "text-fog-700 hover:bg-fog-50"
                                    )}
                                >
                                    Cari Villa
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* Search Modal */}
            <AnimatePresence>
                {isSearchOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSearchOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        />
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="fixed top-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-2xl z-50"
                        >
                            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                                <div className="flex items-center gap-3 p-4 border-b border-fog-100">
                                    <Search className="w-5 h-5 text-fog-400" />
                                    <input
                                        type="text"
                                        placeholder="Cari villa berdasarkan nama, lokasi..."
                                        autoFocus
                                        className="flex-1 text-lg outline-none placeholder:text-fog-400"
                                    />
                                    <button
                                        onClick={() => setIsSearchOpen(false)}
                                        className="p-2 hover:bg-fog-100 rounded-lg"
                                    >
                                        <X className="w-5 h-5 text-fog-500" />
                                    </button>
                                </div>
                                <div className="p-4">
                                    <p className="text-sm text-fog-500 mb-3">Kategori</p>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                                        {[
                                            { label: 'Trending 🔥', href: '/search?collection=trending' },
                                            { label: 'Luxury ✨', href: '/search?collection=luxury' },
                                            { label: 'Budget 💰', href: '/search?collection=budget' },
                                            { label: 'Semua Villa', href: '/search' },
                                        ].map((item) => (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                onClick={() => setIsSearchOpen(false)}
                                                className="px-4 py-3 bg-fog-100 hover:bg-pine-100 hover:text-pine-600 rounded-xl text-sm font-medium text-center transition-colors"
                                            >
                                                {item.label}
                                            </Link>
                                        ))}
                                    </div>
                                    <p className="text-sm text-fog-500 mb-3">Fasilitas</p>
                                    <div className="flex flex-wrap gap-2">
                                        {['Pool', 'Karaoke', 'BBQ', 'View Gunung', 'PS5', 'Billiard'].map((term) => (
                                            <Link
                                                key={term}
                                                href={`/search?q=${encodeURIComponent(term)}`}
                                                onClick={() => setIsSearchOpen(false)}
                                                className="px-3 py-1.5 bg-fog-100 hover:bg-pine-100 hover:text-pine-600 rounded-lg text-sm transition-colors"
                                            >
                                                {term}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
