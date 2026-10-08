'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { useLanguage } from '@/context/LanguageContext';
import { useWallet } from '@solana/wallet-adapter-react';

export default function CreateWishPage() {
  const { t } = useLanguage();
  const { publicKey } = useWallet();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleUseMyWallet = () => {
    if (publicKey) {
      setRecipient(publicKey.toBase58());
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount || !recipient) return;

    // Генерируем параметры для ссылки Blink
    const params = new URLSearchParams({
      title,
      amount,
      to: recipient,
      ...(description ? { desc: description } : {}),
      ...(imageUrl ? { img: imageUrl } : {}),
    });

    const blinkUrl = `${window.location.origin}/blink?${params.toString()}`;
    setGeneratedLink(blinkUrl);
  };

  const handleCopy = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] text-slate-100 relative">
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
            {t.createTitle}
          </h1>
          <p className="text-sm sm:text-base text-slate-400">
            {t.createSubtitle}
          </p>
        </div>

        {/* Notice Card */}
        <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs sm:text-sm text-purple-300 flex items-center gap-2 mb-6">
          <span>⚡</span>
          <span>{t.directP2PNotice}</span>
        </div>

        {!generatedLink ? (
          <form onSubmit={handleCreate} className="space-y-5 p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
            {/* Title */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                {t.itemTitleLabel} *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t.itemTitlePlaceholder}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors text-sm"
              />
            </div>

            {/* Target Amount */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                {t.amountLabel} *
              </label>
              <input
                type="number"
                step="0.01"
                min="0.001"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={t.amountPlaceholder}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors text-sm"
              />
            </div>

            {/* Recipient Address */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  {t.recipientLabel} *
                </label>
                {publicKey && (
                  <button
                    type="button"
                    onClick={handleUseMyWallet}
                    className="text-xs text-emerald-400 hover:text-emerald-300 font-medium underline"
                  >
                    {t.useConnectedWallet}
                  </button>
                )}
              </div>
              <input
                type="text"
                required
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder={t.recipientPlaceholder}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors text-sm font-mono"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                {t.descriptionLabel}
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t.descriptionPlaceholder}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors text-sm"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                {t.imageUrlLabel}
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder={t.imageUrlPlaceholder}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white font-bold transition-all shadow-lg shadow-purple-600/30 text-sm sm:text-base mt-2"
            >
              {t.submitCreateBtn}
            </button>
          </form>
        ) : (
          /* Result Card */
          <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.04] border border-emerald-500/30 backdrop-blur-xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-3xl mx-auto">
              ✨
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {t.createdSuccessTitle}
              </h2>
              <p className="text-sm text-slate-400 max-w-md mx-auto">
                {t.createdSuccessSubtitle}
              </p>
            </div>

            <div className="p-3 bg-black/40 rounded-xl border border-white/10 font-mono text-xs text-slate-300 break-all select-all">
              {generatedLink}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleCopy}
                className="flex-1 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm transition-all"
              >
                {copied ? t.copiedText : t.copyLinkBtn}
              </button>
              <a
                href={generatedLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all flex items-center justify-center gap-1"
              >
                <span>↗</span>
                <span>{t.openBlinkBtn}</span>
              </a>
            </div>

            <button
              onClick={() => setGeneratedLink(null)}
              className="text-xs text-slate-400 hover:text-white underline pt-2"
            >
              ← Создать еще одно желание
            </button>
          </div>
        )}
      </main>
    </div>
  );
}