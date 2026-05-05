// layout.tsx - Layout gốc của ứng dụng đặt vé xe buýt
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BusGo - Đặt Vé Xe Buýt Trực Tuyến",
  description: "Đặt vé xe buýt nhanh chóng, tiện lợi và an toàn. Hàng nghìn tuyến đường trên toàn quốc.",
  keywords: "đặt vé xe buýt, xe khách, vé xe online, di chuyển",
};

import { Dancing_Script, Be_Vietnam_Pro } from 'next/font/google';


const bodyFont = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '700'],
  variable: '--font-body',
});

const displayFont = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '700'],
  variable: '--font-display',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        {/* Google Fonts - Dùng Sora (hiện đại) + DM Sans (dễ đọc) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans&display=swap" rel="stylesheet"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${displayFont.variable} ${bodyFont.variable}`}>
        {children}
      </body>
    </html>
  );
}