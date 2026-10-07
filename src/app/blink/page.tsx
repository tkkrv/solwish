"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Connection, Transaction, clusterApiUrl } from "@solana/web3.js";

// Интерфейс формата ответа Solana Action
interface ActionData {
  icon: string;
  title: string;
  description: string;
  label: string;
  links?: {
    actions: Array<{
      label: string;
      href: string;
      parameters: Array<{ name: string; label: string; required: boolean }>;
    }>;
  };
}

// Внутренний компонент: здесь происходит вся логика конкретного желания
function BlinkContent() {
  const searchParams = useSearchParams();
  // 1. Извлекаем id из ссылки (?id=wish_xxx). Если параметра нет — берем дефолтный "flowers"
  const wishId = searchParams.get("id") || "flowers";

  const { publicKey, signTransaction } = useWallet();
  const [data, setData] = useState<ActionData | null>(null);
  const [senderName, setSenderName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [txSuccess, setTxSuccess] = useState<string | null>(null);

  // 2. Подгружаем данные конкретного желания при изменении wishId
  useEffect(() => {
    fetch(`/api/actions/gift?id=${wishId}`)
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Ошибка загрузки Action:", err));
  }, [wishId]);

  // 3. Обработка клика по кнопке оплаты
  const handleSendGift = async () => {
    if (!publicKey || !signTransaction) {
      alert("Сначала подключите кошелек Phantom!");
      return;
    }

    try {
      setLoading(true);

      // Отправляем запрос на наш динамический Action API с выбранным wishId
      const postUrl = `/api/actions/gift?id=${wishId}&senderName=${encodeURIComponent(
        senderName || "Друг"
      )}&message=${encodeURIComponent(message || "С наилучшими пожеланиями!")}`;

      const res = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ account: publicKey.toBase58() }),
      });

      const { transaction: txBase64 } = await res.json();
      
      // Десериализуем транзакцию из Base64
      const tx = Transaction.from(Buffer.from(txBase64, "base64"));
      
      // Запрашиваем подпись у Phantom
      const signedTx = await signTransaction(tx);

      // Отправляем сырую подписанную транзакцию в сеть Solana Devnet
      const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
      const signature = await connection.sendRawTransaction(signedTx.serialize());
      await connection.confirmTransaction(signature, "confirmed");

      // Фиксируем хэш транзакции для вывода ссылки на Solana Explorer
      setTxSuccess(signature);
    } catch (err: any) {
      alert("Ошибка транзакции: " + (err?.message || err));
    } finally {
      setLoading(false);
    }
  };

  // Экран ожидания ответа от API
  if (!data) {
    return (
      <div className="min-h-screen bg-[#0d0e15] text-white flex items-center justify-center font-sans">
        Загрузка Solana Blink...
      </div>
    );
  }

  // Отрисовка нативной карточки Blink
  return (
    <div className="min-h-screen bg-[#0d0e15] flex flex-col items-center justify-center p-4 font-sans text-white">
      {/* Верхняя строка: статус сети + кнопка коннекта */}
      <div className="w-full max-w-sm mb-3 flex items-center justify-between px-2 text-xs text-zinc-400">
        <span className="flex items-center gap-1.5 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Solana Blink (Devnet)
        </span>
        <WalletMultiButton style={{ background: "transparent", padding: 0, height: "auto", fontSize: "12px" }} />
      </div>

      {/* Карточка подарка по стилю Dialect Blinks */}
      <div className="w-full max-w-sm bg-[#161822] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
        <img src={data.icon} alt={data.title} className="w-full h-48 object-cover" />
        
        <div className="p-5 flex flex-col gap-4">
          <div>
            <h2 className="text-lg font-bold text-white">{data.title}</h2>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{data.description}</p>
          </div>

          {!txSuccess ? (
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Ваше имя (например: Бека)"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full bg-[#0d0e15] border border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 transition-colors"
              />

              <textarea
                placeholder="Текст поздравления"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={2}
                className="w-full bg-[#0d0e15] border border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 transition-colors resize-none"
              />

              <button
                onClick={handleSendGift}
                disabled={loading}
                className="w-full mt-1 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50 text-white font-medium text-sm py-3 rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-[0.98]"
              >
                {loading ? "Подписание в блокчейне..." : data.links?.actions[0]?.label || "Подарить"}
              </button>
            </div>
          ) : (
            <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-4 text-center">
              <p className="text-emerald-400 text-sm font-semibold mb-1">Подарок успешно отправлен!</p>
              <p className="text-zinc-400 text-xs mb-3">Memo-открытка сохранена в сети Solana</p>
              <a
                href={`https://explorer.solana.com/tx/${txSuccess}?cluster=devnet`}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-violet-400 underline hover:text-violet-300 break-all"
              >
                Посмотреть в Solana Explorer →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Главный экспортируемый компонент: оборачивает контент в Suspense
export default function NativeBlinkView() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0d0e15] text-white flex items-center justify-center font-sans">Загрузка...</div>}>
      <BlinkContent />
    </Suspense>
  );
}