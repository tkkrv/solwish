'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useLanguage, Locale } from '@/context/LanguageContext';

const WalletMultiButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

export default function Navbar() {
  const { locale, setLocale } = useLanguage();

  const languages: { code: Locale; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'ru', label: 'RU' },
    { code: 'kk', label: 'KZ' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0b0c10]/85 border-b border-white/10 transition-all">
      <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-emerald-400 p-[1px] shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#0d0e15] rounded-[11px] flex items-center justify-center">
              <span className="text-xl">✨</span>
            </div>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xl font-bold bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              SolWish
            </span>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-400">
              Devnet Live
            </span>
          </div>
        </Link>

        {/* Right side: Language Switcher & Wallet */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Language Switcher */}
          <div className="flex items-center p-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLocale(lang.code)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-all duration-200 ${
                  locale === lang.code
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          {/* Wallet Button */}
          <div className="wallet-adapter-wrapper">
            <WalletMultiButtonDynamic className="!bg-gradient-to-r !from-purple-600 !to-indigo-600 hover:!from-purple-500 hover:!to-indigo-500 !rounded-xl !h-10 !px-4 !text-xs sm:!text-sm !font-semibold !transition-all !shadow-lg !shadow-purple-600/25" />
          </div>

        </div>
      </div>
    </header>
  );
}