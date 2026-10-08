'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useWallet } from '@solana/wallet-adapter-react';
import { useLanguage } from '@/context/LanguageContext';

export default function CreateWishlistPage() {
  const { publicKey } = useWallet();
  const { t } = useLanguage();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [description, setDescription] = useState('');
  const [iconUrl, setIconUrl] = useState('');

  const [loading, setLoading] = useState(false);
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [createdWishTitle, setCreatedWishTitle] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const handleUseMyWallet = () => {
    if (publicKey) {
      setRecipient(publicKey.toBase58());
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount || !recipient) return;

    try {
      setLoading(true);

      const res = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description: description || undefined,
          amountSol: amount,
          recipientWallet: recipient,
          iconUrl: iconUrl || undefined,
          creatorName: 'Creator',
        }),
      });

      const data = await res.json();

      if (data.success && data.wish?.id) {
        const blinkUrl = `${window.location.origin}/blink?id=${data.wish.id}`;
        setGeneratedLink(blinkUrl);
        setCreatedWishTitle(title);
      } else {
        alert(data.error || 'Ошибка при создании вишлиста');
      }
    } catch (err: any) {
      alert('Не удалось создать вишлист: ' + (err?.message || err));
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareOnTwitter = () => {
    if (!generatedLink) return;
    const tweetText = `I just created a Solana Blink wishlist: "${createdWishTitle}" on @SolWish!\n\nSend a gift with an everlasting on-chain greeting card on @solana:`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(generatedLink)}`;
    window.open(tweetUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] text-slate-100 flex flex-col items-center justify-center p-4 selection:bg-purple-500 selection:text-white">
      <div className="w-full max-w-lg bg-[#12131a] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1"
          >
            ← {t?.navHome || 'Back to Home'}
          </Link>
          <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 font-medium">
            Solana Blink Creator
          </span>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-white mb-2">
          Create a Wishlist
        </h1>
        <p className="text-sm text-slate-400 mb-6">
          Set up your wish, configure your target amount, and get a shareable Solana Blink.
        </p>

        {!generatedLink ? (
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                WHAT IS YOUR WISH / GIFT GOAL? *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. 1C Book, Birthday Fund, New Laptop"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                TARGET AMOUNT (SOL) *
              </label>
              <input
                type="number"
                step="any"
                min="0.0001"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="1.0"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors text-sm"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  RECIPIENT SOLANA WALLET *
                </label>
                {publicKey && (
                  <button
                    type="button"
                    onClick={handleUseMyWallet}
                    className="text-xs text-purple-400 hover:text-purple-300 transition-colors font-medium"
                  >
                    Use my wallet
                  </button>
                )}
              </div>
              <input
                type="text"
                required
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Solana Wallet Address (e.g. CMRQ...)"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors text-sm font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                PERSONAL NOTE / STORY (OPTIONAL)
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell your friends why this wish matters to you..."
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors text-sm resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                COVER IMAGE URL (OPTIONAL)
              </label>
              <input
                type="url"
                value={iconUrl}
                onChange={(e) => setIconUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-sm transition-all shadow-lg shadow-purple-600/20 active:scale-[0.99] disabled:opacity-50 mt-2"
            >
              {loading ? 'Creating Wishlist...' : 'Generate SolWish Blink'}
            </button>
          </form>
        ) : (
          <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-center">
              <span className="text-2xl mb-2 block">🎉</span>
              <h3 className="text-base font-semibold text-white mb-1">
                Your Wishlist Blink is Ready!
              </h3>
              <p className="text-xs text-slate-400">
                Share this link on X or Telegram. Friends can fund it and leave eternal on-chain notes.
              </p>
            </div>

            <div className="p-3 bg-black/40 border border-white/10 rounded-xl font-mono text-xs text-purple-300 break-all select-all">
              {generatedLink}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={copyToClipboard}
                className="py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs transition-colors"
              >
                {copied ? '✓ Copied!' : 'Copy Link'}
              </button>
              <Link
                href={generatedLink}
                className="py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs transition-colors text-center flex items-center justify-center gap-1"
              >
                Open Blink →
              </Link>
            </div>

            {/* Улучшение 3: Кнопка Share on X */}
            <button
              type="button"
              onClick={shareOnTwitter}
              className="w-full py-2.5 rounded-xl bg-[#1d9bf0] hover:bg-[#1a8cd8] text-white font-medium text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Share on X (Twitter)
            </button>

            <button
              type="button"
              onClick={() => {
                setGeneratedLink(null);
                setTitle('');
                setAmount('');
                setDescription('');
                setIconUrl('');
              }}
              className="w-full text-center text-xs text-slate-500 hover:text-slate-400 transition-colors pt-2"
            >
              Create another wish
            </button>
          </div>
        )}
      </div>
    </div>
  );
}