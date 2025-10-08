import type { Metadata } from 'next';
import { Inter, Rubik } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });
const rubik = Rubik({ subsets: ['latin', 'hebrew'] });

export const metadata: Metadata = {
  title: 'Ulpingo - Aprenda Hebraico',
  description:
    'Aprenda hebraico de forma divertida e interativa com flashcards e jogos',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.className} ${rubik.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
