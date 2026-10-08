import type { Metadata } from 'next';
import './globals.css';
import ClientProviders from '@/components/ClientProviders';

export const metadata: Metadata = {
  title: 'SolWish — Decentralized P2P Wishlists on Solana',
  description: 'Flowers will fade, SolWish won’t. Zero-fee social gifting protocol powered by Solana Blinks & SPL Memo.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0b0c10] text-slate-100 min-h-screen selection:bg-purple-500 selection:text-white antialiased">
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}