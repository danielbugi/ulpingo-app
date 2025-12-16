// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';
import { heroui } from '@heroui/react';
import SessionProvider from '@/components/SessionProvider';
import UserMenu from '@/components/UserMenu';
import SignupPrompt from '@/components/SignupPrompt';
import '@/lib/dev-utils'; // Dev utilities for debugging

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://ulpingo.app'),
  title: {
    default: 'Ulpingo - Aprenda Hebraico Grátis com Flashcards | Curso Online',
    template: '%s | Ulpingo',
  },
  description:
    'Aprenda hebraico do zero com flashcards interativos, áudio nativo e repetição espaçada. Método eficaz para brasileiros. 100% gratuito. Comece agora!',
  keywords: [
    'aprender hebraico',
    'hebraico online',
    'curso de hebraico gratis',
    'hebraico para brasileiros',
    'flashcards hebraico',
    'vocabulário hebraico',
    'app hebraico',
    'aprender hebraico do zero',
    'עברית',
    'hebrew learning',
  ],
  authors: [{ name: 'Ulpingo' }],
  creator: 'Ulpingo',
  publisher: 'Ulpingo',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://ulpingo.app',
    title: 'Ulpingo - Aprenda Hebraico Grátis com Flashcards',
    description:
      'Aprenda hebraico do zero com flashcards interativos, áudio nativo e repetição espaçada. Método eficaz para brasileiros. 100% gratuito.',
    siteName: 'Ulpingo',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ulpingo - Aprenda Hebraico',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ulpingo - Aprenda Hebraico Grátis',
    description:
      'Aprenda hebraico do zero com flashcards interativos e áudio nativo. 100% gratuito!',
    images: ['/og-image.png'],
    creator: '@ulpingo',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: 'https://ulpingo.app',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={inter.className}>
        <SessionProvider>
          {/* Navigation Bar */}
          <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <Link
                  href="/"
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <span className="text-2xl">🇮🇱</span>
                  <h1 className="text-xl font-bold text-gradient">Ulpingo</h1>
                </Link>
                <UserMenu />
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="pt-16">{children}</main>

          {/* Signup Prompt Modal */}
          <SignupPrompt />
        </SessionProvider>
      </body>
    </html>
  );
}
