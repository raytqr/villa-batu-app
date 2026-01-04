'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Home as HomeIcon,
    Calendar,
    DollarSign,
    Settings,
    LogOut,
    Menu,
    X,
    Bell,
    User,
    FileText,
    TrendingUp,
    Mountain
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navItems = [
        { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/admin/bookings', label: 'Manajemen Booking', icon: FileText },
        { href: '/admin/reports', label: 'Laporan Keuangan', icon: TrendingUp },
        { href: '/admin/villas', label: 'Kelola Villa', icon: HomeIcon },
        { href: '/admin/calendar', label: 'Kalender', icon: Calendar },
        { href: '/admin/pricing', label: 'Harga', icon: DollarSign },
        { href: '/admin/settings', label: 'Pengaturan', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-fog-100 to-fog-200">
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-fog-200 h-16 flex items-center justify-between px-4 shadow-sm">
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-2 hover:bg-fog-100 rounded-xl"
                >
                    <Menu className="w-6 h-6 text-fog-700" />
                </button>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-pine-500 to-pine-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">V</span>
                    </div>
                    <span className="font-bold text-fog-800">Admin</span>
                </div>
                <Link href="/" className="text-pine-600 text-sm font-medium hover:underline">
                    Lihat Site
                </Link>
            </div>

            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-fog-900 to-fog-800 z-50 transform transition-transform lg:translate-x-0 shadow-2xl",
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Logo */}
                <div className="h-20 flex items-center justify-between px-6 border-b border-fog-700/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-pine-500 to-pine-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Mountain className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <span className="font-bold text-white text-lg font-serif tracking-tight">VillaBatu</span>
                            <p className="text-xs text-fog-400 uppercase tracking-wider">Admin Panel</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="lg:hidden p-2 hover:bg-fog-700 rounded-lg text-fog-400"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-1">
                    <p className="px-4 py-2 text-xs font-semibold text-fog-500 uppercase tracking-wider">Menu</p>
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsSidebarOpen(false)}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                                    isActive
                                        ? "bg-pine-500 text-white shadow-lg shadow-pine-500/30"
                                        : "text-fog-400 hover:bg-fog-700/50 hover:text-white"
                                )}
                            >
                                <item.icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Section */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-fog-700/50">
                    {/* User Info */}
                    <div className="flex items-center gap-3 px-4 py-3 mb-3 bg-fog-700/30 rounded-xl">
                        <div className="w-10 h-10 bg-gradient-to-br from-earth-500 to-earth-600 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-white text-sm truncate">Administrator</p>
                            <p className="text-xs text-fog-400 truncate">admin@villabatu.id</p>
                        </div>
                    </div>

                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 text-red-400 hover:text-white hover:bg-red-500/20 rounded-xl transition-all"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="lg:ml-72 pt-16 lg:pt-0">
                {/* Top Bar for Desktop */}
                <div className="hidden lg:flex items-center justify-between h-20 px-8 bg-white/80 backdrop-blur-lg border-b border-fog-200">
                    <div>
                        <h1 className="text-xl font-bold text-fog-800">
                            {navItems.find(item => pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href)))?.label || 'Admin'}
                        </h1>
                        <p className="text-sm text-fog-500">Kelola villa dan pengaturan website</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="relative p-2.5 hover:bg-fog-100 rounded-xl transition-colors">
                            <Bell className="w-5 h-5 text-fog-600" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        <div className="flex items-center gap-3 pl-4 border-l border-fog-200">
                            <div className="w-10 h-10 bg-gradient-to-br from-pine-500 to-pine-600 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="font-medium text-fog-800 text-sm">Administrator</p>
                                <p className="text-xs text-fog-500">Super Admin</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Page Content */}
                <div className="min-h-[calc(100vh-5rem)]">
                    {children}
                </div>
            </main>
        </div>
    );
}
