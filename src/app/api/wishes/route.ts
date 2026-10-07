import { NextResponse } from "next/server";
import { wishStore, Wish } from "@/lib/store";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, amountSol, recipientWallet, iconUrl, creatorName } = body;

    if (!title || !amountSol || !recipientWallet) {
      return NextResponse.json({ error: "Заполните обязательные поля" }, { status: 400 });
    }

    const id = "wish_" + Math.random().toString(36).substring(2, 8);

    const newWish: Wish = {
      id,
      title,
      description: description || "Подарок из вишлиста SolWish",
      amountSol: parseFloat(amountSol),
      recipientWallet,
      iconUrl: iconUrl || "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800",
      creatorName: creatorName || "Аноним",
    };

    wishStore.set(id, newWish);

    return NextResponse.json({ success: true, wish: newWish });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  const wishes = Array.from(wishStore.values());
  return NextResponse.json({ wishes });
}