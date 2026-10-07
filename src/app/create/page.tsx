"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function CreateWishPage() {
  const { publicKey } = useWallet();
  const [creatorName, setCreatorName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amountSol, setAmountSol] = useState("0.1");
  const [iconUrl, setIconUrl] = useState("");
  const [createdUrl, setCreatedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!publicKey) {
      alert("Сначала подключите ваш Phantom кошелек!");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          creatorName,
          title,
          description,
          amountSol: parseFloat(amountSol),
          recipientWallet: publicKey.toBase58(),
          iconUrl: iconUrl || "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800",
        }),
      });

      const data = await res.json();
      if (data.wish) {
        const blinkLink = `${window.location.origin}/blink?id=${data.wish.id}`;
        setCreatedUrl(blinkLink);
      }
    } catch {
      alert("Ошибка при создании желания");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0e15] text-white p-6 flex flex-col items-center justify-center font-sans">
      <div className="w-full max-w-md bg-[#161822] border border-zinc-800 rounded-2xl p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            Создать SolWish
          </h1>
          <WalletMultiButton style={{ height: "36px", fontSize: "12px", borderRadius: "10px" }} />
        </div>

        {!createdUrl ? (
          <form onSubmit={handleCreate} className="flex flex-col gap-4">
            <div>
              <label className="text-xs text-zinc-400 block mb-1">Ваше имя / никнейм</label>
              <input
                type="text"
                required
                placeholder="Например: Айнура"
                value={creatorName}
                onChange={(e) => setCreatorName(e.target.value)}
                className="w-full bg-[#0d0e15] border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-400 block mb-1">Название подарка</label>
              <input
                type="text"
                required
                placeholder="Например: Книга по Rust / Билет на хакатон"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#0d0e15] border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-violet-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-zinc-400 block mb-1">Сумма (SOL)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={amountSol}
                  onChange={(e) => setAmountSol(e.target.value)}
                  className="w-full bg-[#0d0e15] border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-violet-500"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-400 block mb-1">Фото (URL)</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={iconUrl}
                  onChange={(e) => setIconUrl(e.target.value)}
                  className="w-full bg-[#0d0e15] border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-zinc-400 block mb-1">Описание подарка</label>
              <textarea
                rows={2}
                placeholder="Поздравление или детали подарка..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-[#0d0e15] border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-violet-500 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !publicKey}
              className="mt-2 w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-40 text-white font-medium text-sm py-3 rounded-xl transition-all shadow-lg shadow-indigo-500/20"
            >
              {loading ? "Генерация Blink..." : publicKey ? "Сгенерировать Solana Blink" : "Сначала подключите кошелек"}
            </button>
          </form>
        ) : (
          <div className="flex flex-col gap-4 text-center">
            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-xl">
              ✓
            </div>
            <h2 className="text-lg font-bold">Блинк готов!</h2>
            <p className="text-xs text-zinc-400">
              Поделитесь ссылкой. Даритель сможет исполнить желание в 1 клик прямо на ваш кошелек.
            </p>
            <div className="bg-[#0d0e15] p-3 rounded-xl border border-zinc-800 break-all text-xs text-violet-400 font-mono">
              {createdUrl}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigator.clipboard.writeText(createdUrl)}
                className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-2.5 rounded-xl text-xs font-medium transition-colors"
              >
                Скопировать
              </button>
              <a
                href={createdUrl}
                target="_blank"
                className="flex-1 bg-violet-600 hover:bg-violet-500 text-white py-2.5 rounded-xl text-xs font-medium text-center transition-colors"
              >
                Открыть →
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}