'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useLanguage } from '@/context/LanguageContext';

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0b0c10]">
      {/* Solana Glow Effects */}
      <div className="absolute top-[-140px] left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-purple-600/25 via-indigo-600/20 to-emerald-400/20 blur-[130px] pointer-events-none rounded-full" />
      
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-12 md:py-20 relative z-10 flex flex-col items-center text-center">
        
        {/* Protocol Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-purple-300 mb-8 backdrop-blur-md shadow-inner">
          {t.badge}
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-[1.1] mb-6">
          {t.heroTitlePrefix}{' '}
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-emerald-400 bg-clip-text text-transparent">
            {t.heroTitleGradient}
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-base sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed mb-10">
          {t.heroSubtitle}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16">
          <Link
            href="/create"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold shadow-xl shadow-purple-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span>🎁</span>
            <span>{t.createWishBtn}</span>
          </Link>
          
          <a
            href="https://t.me/Sol_Wish_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 font-semibold backdrop-blur-md transition-all flex items-center justify-center gap-2 hover:border-white/20"
          >
            <span>✈️</span>
            <span>{t.telegramBtn}</span>
          </a>
        </div>

        {/* Trust Value Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg w-full mb-24">
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center gap-3 backdrop-blur-sm">
            <span className="text-emerald-400 text-lg font-bold">✓</span>
            <span className="text-sm font-medium text-slate-200">{t.p2pBadge}</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center gap-3 backdrop-blur-sm">
            <span className="text-purple-400 text-lg font-bold">📜</span>
            <span className="text-sm font-medium text-slate-200">{t.onChainBadge}</span>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="w-full max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            {t.howItWorks}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mb-12">
            {t.howItWorksSub}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            
            {/* Step 1 */}
            <div className="relative p-6 rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 hover:border-purple-500/50 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                ✍️
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{t.step1Title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{t.step1Desc}</p>
            </div>

            {/* Step 2 */}
            <div className="relative p-6 rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 hover:border-indigo-500/50 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                🔗
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{t.step2Title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{t.step2Desc}</p>
            </div>

            {/* Step 3 */}
            <div className="relative p-6 rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 hover:border-emerald-500/50 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                🎉
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{t.step3Title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{t.step3Desc}</p>
            </div>

          </div>
        </div>

        {/* Call To Action Box */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-purple-900/30 via-indigo-900/20 to-emerald-900/20 border border-white/10 max-w-4xl w-full flex flex-col items-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            {t.readyTitle}
          </h3>
          <p className="text-slate-400 text-sm sm:text-base mb-6 max-w-md">
            {t.readySubtitle}
          </p>
          <Link
            href="/create"
            className="px-8 py-3.5 rounded-xl bg-white text-slate-950 font-bold hover:bg-slate-200 transition-all shadow-lg shadow-white/10"
          >
            {t.createWishBtn}
          </Link>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-xs text-slate-500">
        {t.footerText}
      </footer>
    </div>
  );
}