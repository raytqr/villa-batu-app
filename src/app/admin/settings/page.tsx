'use client';

import { useState } from 'react';
import {
    Save,
    Globe,
    Phone,
    Mail,
    MapPin,
    MessageCircle,
    Facebook,
    Instagram,
    Youtube,
    Image as ImageIcon,
    Shield
} from 'lucide-react';

export default function AdminSettingsPage() {
    const [siteSettings, setSiteSettings] = useState({
        siteName: 'VillaBatu',
        tagline: 'Premium Villa Rental di Kota Batu',
        description: 'Platform booking villa terpercaya di Kota Batu. Temukan 500+ villa premium dengan view pegunungan, kolam renang, dan fasilitas lengkap untuk liburan keluarga.',
        phone: '+62 812-3456-7890',
        whatsapp: '6281234567890',
        email: 'hello@villabatu.id',
        address: 'Jl. Panderman No. 123, Kota Batu, Jawa Timur 65311',
        facebook: 'https://facebook.com/villabatu',
        instagram: 'https://instagram.com/villabatu',
        youtube: 'https://youtube.com/villabatu',
    });

    const [adminSettings, setAdminSettings] = useState({
        adminName: 'Administrator',
        adminEmail: 'admin@villabatu.id',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleSaveSite = () => {
        console.log('Saving site settings:', siteSettings);
        alert('Pengaturan website berhasil disimpan! (Demo only)');
    };

    const handleSaveAdmin = () => {
        console.log('Saving admin settings:', adminSettings);
        alert('Pengaturan admin berhasil disimpan! (Demo only)');
    };

    return (
        <div className="p-6 lg:p-8 max-w-5xl">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-fog-800">Pengaturan</h1>
                <p className="text-fog-500">Kelola informasi website dan akun admin</p>
            </div>

            <div className="space-y-8">
                {/* Site Information */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="px-6 py-4 bg-gradient-to-r from-pine-500 to-pine-600 flex items-center gap-3">
                        <Globe className="w-5 h-5 text-white" />
                        <h2 className="text-lg font-semibold text-white">Informasi Website</h2>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-fog-700 mb-2">Nama Website</label>
                                <input
                                    type="text"
                                    value={siteSettings.siteName}
                                    onChange={(e) => setSiteSettings({ ...siteSettings, siteName: e.target.value })}
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-fog-700 mb-2">Tagline</label>
                                <input
                                    type="text"
                                    value={siteSettings.tagline}
                                    onChange={(e) => setSiteSettings({ ...siteSettings, tagline: e.target.value })}
                                    className="input-field"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-fog-700 mb-2">Deskripsi Website</label>
                            <textarea
                                rows={3}
                                value={siteSettings.description}
                                onChange={(e) => setSiteSettings({ ...siteSettings, description: e.target.value })}
                                className="input-field resize-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 flex items-center gap-3">
                        <Phone className="w-5 h-5 text-white" />
                        <h2 className="text-lg font-semibold text-white">Informasi Kontak</h2>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-fog-700 mb-2">
                                    <Phone className="w-4 h-4 inline mr-2" />
                                    Nomor Telepon
                                </label>
                                <input
                                    type="text"
                                    value={siteSettings.phone}
                                    onChange={(e) => setSiteSettings({ ...siteSettings, phone: e.target.value })}
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-fog-700 mb-2">
                                    <MessageCircle className="w-4 h-4 inline mr-2" />
                                    Nomor WhatsApp (untuk booking)
                                </label>
                                <input
                                    type="text"
                                    value={siteSettings.whatsapp}
                                    onChange={(e) => setSiteSettings({ ...siteSettings, whatsapp: e.target.value })}
                                    placeholder="Contoh: 6281234567890"
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-fog-700 mb-2">
                                    <Mail className="w-4 h-4 inline mr-2" />
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={siteSettings.email}
                                    onChange={(e) => setSiteSettings({ ...siteSettings, email: e.target.value })}
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-fog-700 mb-2">
                                    <MapPin className="w-4 h-4 inline mr-2" />
                                    Alamat
                                </label>
                                <input
                                    type="text"
                                    value={siteSettings.address}
                                    onChange={(e) => setSiteSettings({ ...siteSettings, address: e.target.value })}
                                    className="input-field"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Media */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 flex items-center gap-3">
                        <Instagram className="w-5 h-5 text-white" />
                        <h2 className="text-lg font-semibold text-white">Media Sosial</h2>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-fog-700 mb-2">
                                    <Facebook className="w-4 h-4 inline mr-2" />
                                    Facebook
                                </label>
                                <input
                                    type="url"
                                    value={siteSettings.facebook}
                                    onChange={(e) => setSiteSettings({ ...siteSettings, facebook: e.target.value })}
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-fog-700 mb-2">
                                    <Instagram className="w-4 h-4 inline mr-2" />
                                    Instagram
                                </label>
                                <input
                                    type="url"
                                    value={siteSettings.instagram}
                                    onChange={(e) => setSiteSettings({ ...siteSettings, instagram: e.target.value })}
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-fog-700 mb-2">
                                    <Youtube className="w-4 h-4 inline mr-2" />
                                    YouTube
                                </label>
                                <input
                                    type="url"
                                    value={siteSettings.youtube}
                                    onChange={(e) => setSiteSettings({ ...siteSettings, youtube: e.target.value })}
                                    className="input-field"
                                />
                            </div>
                        </div>
                        <button
                            onClick={handleSaveSite}
                            className="btn-primary flex items-center gap-2"
                        >
                            <Save className="w-5 h-5" />
                            <span>Simpan Pengaturan Website</span>
                        </button>
                    </div>
                </div>

                {/* Admin Account */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="px-6 py-4 bg-gradient-to-r from-fog-700 to-fog-800 flex items-center gap-3">
                        <Shield className="w-5 h-5 text-white" />
                        <h2 className="text-lg font-semibold text-white">Akun Administrator</h2>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-fog-700 mb-2">Nama Admin</label>
                                <input
                                    type="text"
                                    value={adminSettings.adminName}
                                    onChange={(e) => setAdminSettings({ ...adminSettings, adminName: e.target.value })}
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-fog-700 mb-2">Email Admin</label>
                                <input
                                    type="email"
                                    value={adminSettings.adminEmail}
                                    onChange={(e) => setAdminSettings({ ...adminSettings, adminEmail: e.target.value })}
                                    className="input-field"
                                />
                            </div>
                        </div>

                        <div className="pt-6 border-t border-fog-100">
                            <h3 className="font-semibold text-fog-800 mb-4">Ubah Password</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-fog-700 mb-2">Password Lama</label>
                                    <input
                                        type="password"
                                        value={adminSettings.currentPassword}
                                        onChange={(e) => setAdminSettings({ ...adminSettings, currentPassword: e.target.value })}
                                        className="input-field"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-fog-700 mb-2">Password Baru</label>
                                    <input
                                        type="password"
                                        value={adminSettings.newPassword}
                                        onChange={(e) => setAdminSettings({ ...adminSettings, newPassword: e.target.value })}
                                        className="input-field"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-fog-700 mb-2">Konfirmasi Password</label>
                                    <input
                                        type="password"
                                        value={adminSettings.confirmPassword}
                                        onChange={(e) => setAdminSettings({ ...adminSettings, confirmPassword: e.target.value })}
                                        className="input-field"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleSaveAdmin}
                            className="btn-primary flex items-center gap-2"
                        >
                            <Save className="w-5 h-5" />
                            <span>Simpan Pengaturan Admin</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
