export interface Wish {
  id: string;
  title: string;
  description: string;
  amountSol: number;
  recipientWallet: string;
  iconUrl: string;
  creatorName: string;
}

declare global {
  var __SOLWISH_STORE__: Map<string, Wish> | undefined;
}

if (!global.__SOLWISH_STORE__) {
  global.__SOLWISH_STORE__ = new Map<string, Wish>();

  // Базовый подарок по умолчанию
  global.__SOLWISH_STORE__.set("flowers", {
    id: "flowers",
    title: "Букет нежных пионов",
    description: "Вишлист Айнуры. Отправьте букет и прикрепите поздравление, которое запишется в блокчейн Solana.",
    amountSol: 0.15,
    recipientWallet: "CMRQj9uYjKGe3sL3V7j84R8s8x8X8X8X8X8X8X8X8X8X",
    iconUrl: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=800",
    creatorName: "Айнура",
  });
}

export const wishStore = global.__SOLWISH_STORE__;