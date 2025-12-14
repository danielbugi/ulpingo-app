// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { heroui } from '@heroui/react';
import SessionProvider from '@/components/SessionProvider';
import UserMenu from '@/components/UserMenu';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ulpingo - Aprenda Hebraico',
  description:
    'Aprenda Hebraico de forma divertida e eficaz com flashcards e spaced repetition',
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
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🇮🇱</span>
                  <h1 className="text-xl font-bold text-gradient">Ulpingo</h1>
                </div>
                <UserMenu />
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="pt-16">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
