import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import "@solana/wallet-adapter-react-ui/styles.css";

import { WalletContextProvider } from "@/components/WalletContextProvider";

export const metadata: Metadata = {
  title: "SolWish — Цветы завянут, SolWish нет",
  description:
    "Децентрализованный протокол вишлистов на базе Solana Actions & Blinks и Telegram Mini Apps.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className="bg-[#07080b] text-[#f2f4f8] antialiased">
        <WalletContextProvider>{children}</WalletContextProvider>
      </body>
    </html>
  );
}