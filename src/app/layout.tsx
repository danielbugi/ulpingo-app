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
