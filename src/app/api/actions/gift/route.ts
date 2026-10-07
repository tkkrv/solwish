import {
  ActionGetResponse,
  ActionPostRequest,
  ActionPostResponse,
  ACTIONS_CORS_HEADERS,
  createPostResponse,
} from "@solana/actions";
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { wishStore } from "@/lib/store";

const MEMO_PROGRAM_ID = new PublicKey(
  "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"
);

export async function OPTIONS() {
  return new Response(null, { headers: ACTIONS_CORS_HEADERS });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const wishId = url.searchParams.get("id") || "flowers";
  const wish = wishStore.get(wishId) || wishStore.get("flowers")!;

  const baseHref = `${url.protocol}//${url.host}/api/actions/gift?id=${wish.id}`;

  const payload: ActionGetResponse = {
    type: "action",
    icon: wish.iconUrl,
    title: wish.title,
    description: wish.description,
    label: "Подарить",
    links: {
      actions: [
        {
          label: `Подарить за ${wish.amountSol} SOL`,
          href: `${baseHref}&amount=${wish.amountSol}&senderName={senderName}&message={message}`,
          parameters: [
            {
              name: "senderName",
              label: "Ваше имя (например: Бека)",
              required: true,
            },
            {
              name: "message",
              label: "Текст поздравления",
              required: true,
            },
          ],
        },
      ],
    },
  };

  return Response.json(payload, { headers: ACTIONS_CORS_HEADERS });
}

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    const wishId = url.searchParams.get("id") || "flowers";
    const wish = wishStore.get(wishId) || wishStore.get("flowers")!;

    const body: ActionPostRequest = await req.json();
    const sender = new PublicKey(body.account);
    const recipient = new PublicKey(wish.recipientWallet);

    const senderName = url.searchParams.get("senderName") || "Друг";
    const message = url.searchParams.get("message") || "С наилучшими пожеланиями!";
    const amountSol = parseFloat(url.searchParams.get("amount") || String(wish.amountSol));

    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    const transferIx = SystemProgram.transfer({
      fromPubkey: sender,
      toPubkey: recipient,
      lamports: Math.round(amountSol * LAMPORTS_PER_SOL),
    });

    const memoData = JSON.stringify({
      app: "SolWish",
      wishId: wish.id,
      to: wish.creatorName,
      from: senderName,
      msg: message,
      date: new Date().toISOString(),
    });

    const memoIx = new TransactionInstruction({
      keys: [{ pubkey: sender, isSigner: true, isWritable: true }],
      programId: MEMO_PROGRAM_ID,
      data: Buffer.from(memoData, "utf-8"),
    });

    const transaction = new Transaction().add(transferIx, memoIx);
    transaction.feePayer = sender;
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;

    const response: ActionPostResponse = await createPostResponse({
      fields: {
        transaction,
        message: `Подарок отправлен! Открытка сохранена в блокчейне.`,
      },
    });

    return Response.json(response, { headers: ACTIONS_CORS_HEADERS });
  } catch (err: any) {
    return Response.json(
      { error: err?.message || "Ошибка сервера" },
      { status: 400, headers: ACTIONS_CORS_HEADERS }
    );
  }
}