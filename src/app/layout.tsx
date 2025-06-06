import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import "./globals.css";
import { PROD_URL } from "@/config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(PROD_URL),
  title: {
    template: '%s | Pokemon Explorer',
    default: 'Pokemon Explorer - Discover Your Favorite Pokemon',
  },
  description: 'Explore the world of Pokemon with our comprehensive Pokemon database. Search, view stats, and learn more about your favorite Pokemon.',
  keywords: ['Pokemon', 'Pokedex', 'Pokemon Database', 'Pokemon Stats', 'Pokemon Information'],
  openGraph: {
    title: 'Pokemon Explorer',
    description: 'Explore the world of Pokemon with our comprehensive Pokemon database.',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Pokemon Explorer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pokemon Explorer',
    description: 'Explore the world of Pokemon with our comprehensive Pokemon database.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full bg-gray-50`} suppressHydrationWarning>
        <Header />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
