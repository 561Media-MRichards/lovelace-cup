import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Lovelace Memorial Cup - Golf Tournament 2025",
  description: "Join us for the Lovelace Memorial Cup golf tournament on August 15th, 2025 at Sycamore Ridge Golf Course. Supporting families battling cancer with love and community.",
  keywords: "golf tournament, memorial cup, charity golf, cancer support, Sycamore Ridge Golf Course",
  authors: [{ name: "Lovelace Memorial Cup Organization" }],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' }
    ],
    apple: { url: '/favicon.svg', type: 'image/svg+xml' },
  },
  openGraph: {
    title: "Lovelace Memorial Cup - Golf Tournament 2025",
    description: "Supporting families battling cancer through community and golf",
    type: "website",
    locale: "en_US",
    siteName: "Lovelace Memorial Cup",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lovelace Memorial Cup - Golf Tournament 2025",
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
        className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-cream-50 text-forest-900`}
      >
        {children}
      </body>
    </html>
  );
}
