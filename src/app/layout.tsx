import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Lovelace Memorial Cup - 3rd Annual Golf Tournament 2026",
  description: "Join us for the 3rd Annual Lovelace Memorial Cup golf tournament in July 2026 at Sycamore Ridge Golf Course. Supporting families battling cancer with love and community.",
  keywords: "golf tournament, memorial cup, charity golf, cancer support, Sycamore Ridge Golf Course, 2026",
  authors: [{ name: "Lovelace Memorial Cup Organization" }],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' }
    ],
    apple: { url: '/favicon.svg', type: 'image/svg+xml' },
  },
  openGraph: {
    title: "Lovelace Memorial Cup - 3rd Annual Golf Tournament 2026",
    description: "Supporting families battling cancer through community and golf",
    type: "website",
    locale: "en_US",
    siteName: "Lovelace Memorial Cup",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lovelace Memorial Cup - 3rd Annual Golf Tournament 2026",
    description: "Supporting families battling cancer through community and golf",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.variable} ${inter.variable} font-sans antialiased bg-ivory-100 text-midnight-900`}
      >
        {children}
      </body>
    </html>
  );
}
