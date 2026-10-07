import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Цветы завянут — SolWish нет",
  description: "Децентрализованный вишлист на Solana. Исполняйте желания и отправляйте подарки в 1 клик через Solana Blink.",
  openGraph: {
    title: "Цветы завянут — SolWish нет | SolWish",
    description: "Исполняйте желания в 1 клик с памятной открыткой на блокчейне Solana.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800",
        width: 800,
        height: 600,
        alt: "SolWish Gift",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Цветы завянут — SolWish нет | SolWish",
    description: "Исполняйте желания в 1 клик с памятной открыткой на блокчейне Solana.",
    images: ["https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800"],
  },
};

export default function BlinkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}