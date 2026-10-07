"use client";

import { useState } from "react";
import Link from "next/link";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"giver" | "receiver">("giver");

  return (
    <div className="min-h-screen bg-[#07080b] text-[#f2f4f8] font-sans selection:bg-rose-500 selection:text-white relative overflow-x-hidden">
      {/* Декоративная фоновая сетка */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f243015_1px,transparent_1px),linear-gradient(to_bottom,#1f243015_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-rose-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-96 -left-48 w-[400px] h-[400px] bg-violet-600/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 max-w-6xl mx-auto px-6 h-20 flex items-center justify-between border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 to-amber-500 p-[1px] flex items-center justify-center shadow-lg shadow-rose-500/20">
            <div className="w-full h-full bg-[#07080b] rounded-[11px] flex items-center justify-center text-sm font-black text-rose-400">
              SW
            </div>
          </div>
          <span className="font-bold tracking-tight text-lg text-white">
            SolWish<span className="text-rose-500">.</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/create"
            className="hidden sm:inline-flex text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
          >
            [ + Новый вишлист ]
          </Link>
          <WalletMultiButton style={{ height: "36px", fontSize: "12px", borderRadius: "10px" }} />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-20 lg:pt-24 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-400 mb-8 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Solana Actions &amp; Blinks v1.0</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-white mb-6">
              Цветы завянут. <br />
              <span className="italic font-serif font-light text-rose-400/90 underline decoration-rose-500/40 underline-offset-8">
                SolWish
              </span>{" "}
              — никогда.
            </h1>

            <p className="text-zinc-400 text-base sm:text-lg max-w-xl leading-relaxed mb-10 font-normal">
              Децентрализованный протокол вишлистов без комиссий платформ. 
              Публикуйте желания одной ссылкой в Telegram или X — дарители исполняют мечту в 1 клик, 
              а открытка навсегда сохраняется в реестре <span className="text-zinc-200 font-mono text-sm">SPL Memo</span>.
            </p>

            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <Link
                href="/create"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all shadow-xl shadow-white/5 active:scale-[0.98] text-center"
              >
                Создать вишлист бесплатно
              </Link>
              <Link
                href="/blink?id=flowers"
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.09] text-zinc-200 font-medium text-sm transition-all text-center"
              >
                Тестовый перевод (Devnet) →
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-12 mt-12 border-t border-white/[0.08] w-full max-w-lg font-mono">
              <div>
                <div className="text-2xl font-bold text-white">0%</div>
                <div className="text-[11px] text-zinc-500 uppercase tracking-wider mt-0.5">Комиссия сервиса</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">&lt; 1s</div>
                <div className="text-[11px] text-zinc-500 uppercase tracking-wider mt-0.5">Скорость финализации</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-[11px] text-zinc-500 uppercase tracking-wider mt-0.5">On-chain P2P</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="bg-[#12141c] p-1 rounded-xl border border-white/[0.08] flex gap-1 mb-4 shadow-inner">
              <button
                type="button"
                onClick={() => setActiveTab("giver")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === "giver"
                    ? "bg-white/[0.1] text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                👁 Как видит друг (Blink)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("receiver")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === "receiver"
                    ? "bg-white/[0.1] text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                📋 Как видит автор
              </button>
            </div>

            <div className="w-full max-w-sm rounded-3xl bg-[#0f1118] border border-white/[0.12] p-4 shadow-2xl shadow-rose-950/20 backdrop-blur-xl relative group">
              <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/60 px-2 py-0.5 rounded-full border border-white/10 text-[10px] text-zinc-400 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                SPL Memo
              </div>

              {activeTab === "giver" ? (
                <div className="space-y-3.5">
                  <div className="h-44 w-full rounded-2xl overflow-hidden relative">
                    <img
                      src="https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800"
                      alt="Wish Item"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-mono text-white border border-white/10">
                      0.5 SOL (~$80)
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-white">Курс по AI &amp; Смарт-контрактам</h3>
                    <p className="text-xs text-zinc-400 mt-1">Вишлист Азамата. Скиньтесь на обучение будущего Web3-разработчика.</p>
                  </div>

                  <div className="space-y-2 pt-1">
                    <div className="bg-[#171923] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-zinc-300 flex justify-between items-center">
                      <span className="text-zinc-500">Отправитель:</span>
                      <span className="font-mono text-zinc-200">Бека</span>
                    </div>
                    <div className="bg-[#171923] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-zinc-300 italic">
                      &quot;Тащи хакатон, ждём в топе!&quot;
                    </div>
                    <Link
                      href="/blink?id=flowers"
                      className="block text-center w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 font-semibold text-xs text-white shadow-lg shadow-rose-500/20 hover:opacity-95 transition-opacity"
                    >
                      Подарить 0.5 SOL в 1 клик
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 py-2">
                  <div className="border-b border-white/[0.08] pb-3">
                    <span className="text-xs text-zinc-500 font-mono uppercase">Баланс желаний</span>
                    <div className="text-2xl font-bold font-mono text-emerald-400 mt-0.5">0.65 SOL получено</div>
                  </div>
                  <div className="space-y-2.5">
                    <div className="p-3 rounded-xl bg-[#171923] border border-white/[0.06] text-xs">
                      <div className="flex justify-between font-mono text-[11px] text-zinc-400">
                        <span className="text-white font-sans font-medium">Бека</span>
                        <span className="text-emerald-400">+0.50 SOL</span>
                      </div>
                      <p className="text-zinc-400 text-[11px] mt-1 italic">&quot;Тащи хакатон, ждём в топе!&quot;</p>
                    </div>
                    <div className="p-3 rounded-xl bg-[#171923] border border-white/[0.06] text-xs">
                      <div className="flex justify-between font-mono text-[11px] text-zinc-400">
                        <span className="text-white font-sans font-medium">Айнура</span>
                        <span className="text-emerald-400">+0.15 SOL</span>
                      </div>
                      <p className="text-zinc-400 text-[11px] mt-1 italic">&quot;Удачи на демо дне!&quot;</p>
                    </div>
                  </div>
                  <Link
                    href="/create"
                    className="block text-center w-full py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] text-xs text-white font-mono transition-colors"
                  >
                    + Добавить ещё цель
                  </Link>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Механика в 3 шага */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-16 border-t border-white/[0.06]">
        <div className="text-center max-w-xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
            Как работает протокол
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm">
            Никаких депозитных смарт-контрактов со шлюзами вывода. Прямой расчёт в блокчейне.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
          <div className="p-6 rounded-2xl bg-[#0d0e14] border border-white/[0.06] relative">
            <span className="text-xs text-rose-400">01 // CREATION</span>
            <h3 className="font-sans font-bold text-white text-base mt-2 mb-2">Создайте вишлист</h3>
            <p className="font-sans text-xs text-zinc-400 leading-relaxed">
              Укажите желаемый подарок, сумму и привяжите ваш кошелек Solana. Система сгенерирует криптографически верифицированный Blink.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0d0e14] border border-white/[0.06] relative">
            <span className="text-xs text-amber-400">02 // DISTRIBUTION</span>
            <h3 className="font-sans font-bold text-white text-base mt-2 mb-2">Отправьте в чат</h3>
            <p className="font-sans text-xs text-zinc-400 leading-relaxed">
              Ссылка разворачивается в полноценный интерфейс прямо в Twitter/X, Discord или Telegram Mini App без переходов на сторонние сайты.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0d0e14] border border-white/[0.06] relative">
            <span className="text-xs text-emerald-400">03 // SETTLEMENT</span>
            <h3 className="font-sans font-bold text-white text-base mt-2 mb-2">Мгновенный P2P</h3>
            <p className="font-sans text-xs text-zinc-400 leading-relaxed">
              SOL сразу начисляются на ваш адрес через SystemProgram, а тёплые слова записываются в Memo навсегда.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.06] py-8 text-center text-xs text-zinc-600 font-mono">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span>SolWish Protocol • Built for Colosseum Hackathon</span>
          <span className="text-zinc-500">Solana Devnet • Zero Platform Fees</span>
        </div>
      </footer>
    </div>
  );
}