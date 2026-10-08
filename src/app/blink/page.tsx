"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Connection, Transaction, clusterApiUrl } from "@solana/web3.js";

interface ActionData {
  icon: string;
  title: string;
  description: string;
  label: string;
  amountSol?: number;
  creatorName?: string;
  links?: {
    actions: Array<{
      label: string;
      href: string;
      parameters: Array<{ name: string; label: string; required: boolean }>;
    }>;
  };
}

const PRESET_AMOUNTS = ["0.01", "0.05", "0.1", "0.25"];

function BlinkContent() {
  const searchParams = useSearchParams();
  const wishId = searchParams.get("id") || "flowers";

  const { publicKey, signTransaction } = useWallet();
  const [data, setData] = useState<ActionData | null>(null);
  const [senderName, setSenderName] = useState("");
  const [message, setMessage] = useState("");
  const [customAmount, setCustomAmount] = useState<string>("0.05");
  const [recipientName, setRecipientName] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [txSuccess, setTxSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/actions/gift?id=${wishId}`)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        const actionHref = json?.links?.actions?.[0]?.href || "";
        const urlParams = new URLSearchParams(actionHref.split("?")[1] || "");

        const parsedAmount = urlParams.get("amount") || json.amountSol || "0.05";
        setCustomAmount(String(parsedAmount));

        const parsedRecipient = urlParams.get("to") || json.creatorName || json.title || "Получатель";
        setRecipientName(parsedRecipient);
      })
      .catch((err) => console.error("Ошибка загрузки Action:", err));
  }, [wishId]);

  const handleSendGift = async () => {
    if (!publicKey || !signTransaction) {
      alert("Сначала подключите кошелек Phantom!");
      return;
    }

    try {
      setLoading(true);

      const targetAmount = customAmount || "0.01";

      const postUrl = `/api/actions/gift?id=${wishId}&amount=${encodeURIComponent(
        targetAmount
      )}&to=${encodeURIComponent(
        recipientName || "Получатель"
      )}&senderName=${encodeURIComponent(
        senderName || "Друг"
      )}&message=${encodeURIComponent(message || "С наилучшими пожеланиями!")}`;

      const res = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ account: publicKey.toBase58() }),
      });

      const { transaction: txBase64, error } = await res.json();
      if (error || !txBase64) {
        throw new Error(error || "Не удалось получить транзакцию от сервера");
      }

      const tx = Transaction.from(Buffer.from(txBase64, "base64"));
      const signedTx = await signTransaction(tx);

      const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
      const signature = await connection.sendRawTransaction(signedTx.serialize());
      await connection.confirmTransaction(signature, "confirmed");

      setTxSuccess(signature);
    } catch (err: any) {
      alert("Ошибка транзакции: " + (err?.message || err));
    } finally {
      setLoading(false);
    }
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0d0e15] text-white flex items-center justify-center font-sans">
        Загрузка Solana Blink...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0e15] flex flex-col items-center justify-center p-4 font-sans text-white">
      {/* Статус Devnet и Wallet Button */}
      <div className="w-full max-w-sm mb-3 flex items-center justify-between px-2 text-xs text-zinc-400">
        <span className="flex items-center gap-1.5 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Solana Blink (Devnet)
        </span>
        <WalletMultiButton style={{ background: "transparent", padding: 0, height: "auto", fontSize: "12px" }} />
      </div>

      <div className="w-full max-w-sm bg-[#161822] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
        <img src={data.icon} alt={data.title} className="w-full h-44 object-cover" />

        <div className="p-5 flex flex-col gap-4">
          <div>
            <h2 className="text-lg font-bold text-white">{data.title}</h2>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{data.description}</p>
          </div>

          {!txSuccess ? (
            <div className="flex flex-col gap-3.5">
              {/* Выбор суммы с кнопками-пресетами */}
              <div>
                <label className="text-[11px] uppercase font-semibold text-zinc-400 mb-1.5 block">
                  Сумма подарка (SOL)
                </label>
                <div className="grid grid-cols-4 gap-1.5 mb-2">
                  {PRESET_AMOUNTS.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setCustomAmount(amt)}
                      className={`py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                        customAmount === amt
                          ? "bg-violet-600 text-white shadow-md shadow-violet-600/30"
                          : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {amt}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  step="any"
                  min="0.0001"
                  placeholder="Другая сумма"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full bg-[#0d0e15] border border-zinc-700/80 rounded-xl px-3.5 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 transition-colors font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase font-semibold text-zinc-400 mb-1 block">
                  Ваше имя
                </label>
                <input
                  type="text"
                  placeholder="Например: Бека"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full bg-[#0d0e15] border border-zinc-700/80 rounded-xl px-3.5 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase font-semibold text-zinc-400 mb-1 block">
                  Текст открытки (SPL Memo)
                </label>
                <textarea
                  placeholder="Напишите искренние пожелания..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={2}
                  className="w-full bg-[#0d0e15] border border-zinc-700/80 rounded-xl px-3.5 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 transition-colors resize-none"
                />
              </div>

              <button
                onClick={handleSendGift}
                disabled={loading}
                className="w-full mt-1 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50 text-white font-medium text-sm py-3 rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-[0.98]"
              >
                {loading ? "Подписание в блокчейне..." : `Подарить ${customAmount || ""} SOL`}
              </button>
            </div>
          ) : (
            /* Улучшение 2: Красивый экран подтверждения с визуальной открыткой */
            <div className="flex flex-col gap-3">
              <div className="bg-gradient-to-br from-violet-950/60 to-indigo-950/60 border border-violet-500/40 rounded-xl p-4 text-left relative overflow-hidden">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] uppercase tracking-wider text-violet-300 font-semibold flex items-center gap-1">
                    <span>✨</span> SPL Memo Greeting Card
                  </span>
                  <span className="text-[10px] text-zinc-400">Solana Devnet</span>
                </div>
                <div className="text-sm font-semibold text-white mb-1">
                  Для: {recipientName || "Получатель"}
                </div>
                <p className="text-xs text-zinc-200 italic bg-black/30 p-2.5 rounded-lg border border-white/5 my-2">
                  &ldquo;{message || "С наилучшими пожеланиями!"}&rdquo;
                </p>
                <div className="flex justify-between items-center text-[11px] text-zinc-400 mt-2">
                  <span>От: <strong className="text-violet-300">{senderName || "Друг"}</strong></span>
                  <span className="font-mono text-emerald-400">+{customAmount} SOL</span>
                </div>
              </div>

              <a
                href={`https://explorer.solana.com/tx/${txSuccess}?cluster=devnet`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-violet-300 hover:text-white border border-white/10 text-xs font-medium text-center transition-colors flex items-center justify-center gap-1.5"
              >
                Проверить SPL Memo в Explorer ↗[cite: 4]
              </a>

              <button
                type="button"
                onClick={() => setTxSuccess(null)}
                className="text-xs text-zinc-500 hover:text-zinc-400 py-1"
              >
                Отправить ещё один подарок
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function NativeBlinkView() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0d0e15] text-white flex items-center justify-center font-sans">
          Загрузка...
        </div>
      }
    >
      <BlinkContent />
    </Suspense>
  );
}