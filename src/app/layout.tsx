'use client';

import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ComparisonModal } from "@/components/villa/ComparisonModal";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  return (
    <html lang="id">
      <head>
        <title>VillaBatu - Premium Villa Rental di Kota Batu</title>
        <meta name="description" content="Platform booking villa terpercaya di Kota Batu. Temukan 500+ villa premium dengan view pegunungan, kolam renang, dan fasilitas lengkap untuk liburan keluarga." />
      </head>
      <body className="antialiased">
        {!isAdminPage && <Navbar />}
        <main className={isAdminPage ? "" : "min-h-screen"}>
          {children}
        </main>
        {!isAdminPage && <Footer />}
        {!isAdminPage && <ComparisonModal />}
      </body>
    </html>
  );
}
