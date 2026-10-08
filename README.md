# 🌸 SolWish — The Everlasting On-Chain Gifting Protocol

> **"Flowers will fade, SolWish won’t."**  
> SolWish is a decentralized, zero-fee social gifting protocol on Solana. It enables anyone to create interactive wishlists and receive direct P2P crypto gifts accompanied by permanent, immutable greeting cards recorded directly into the Solana ledger using the SPL Memo Program.

---

## 🌟 Overview & Key Problem

Traditional social gifting platforms suffer from high middleman fees (often 5%–15%), delayed bank payouts, custodial risk, and transient greeting messages that get lost or deleted over time.

**SolWish solves this by:**
1. **Zero-Platform Fees & Instant P2P Settlement:** Funds transfer directly from the sender's wallet to the recipient's wallet with zero custodial risk or platform cuts.
2. **Everlasting Greeting Cards (SPL Memo v2):** Greetings and metadata are embedded directly inside the Solana transaction payload, creating an unalterable, perpetual keepsake verifiable on Solana Explorer.
3. **Solana Actions & Blinks Integration:** Wishlists are fully compatible with Solana Actions and Blinks, enabling 1-click gifting natively across Twitter/X, Discord, Telegram, and any Blink-supported surface.

---

## ✨ Features

- **Decentralized Wishlist Creation:** Set up a dream item, target funding amount in SOL, and assign any Solana destination wallet.
- **On-Chain Keepsake (SPL Memo):** Every contribution packages a `SystemProgram.transfer` alongside an `SPL Memo` instruction encoding a structured JSON greeting (`app`, `wishId`, `to`, `from`, `msg`, `date`).
- **Dynamic Gifting & Custom Contributions:** Supporters can gift custom SOL amounts and write personalized wishes.
- **Native Blink Viewer:** Standalone UI crafted in accordance with the Dialect Blink specification.
- **Multilingual Support:** Fully localized for English, Russian, and Kazakh communities.

---

## 🏗️ Architecture & How It Works

### Transaction Flow

[ Giver / Supporter ]
│
▼
[ Solana Action / Blink ]  ── (Sender Name, Message, Amount)
│
▼
[ POST /api/actions/gift ] ──> Builds Solana Transaction:
├── Ix 1: SystemProgram.transfer (Sender ➜ Recipient)
└── Ix 2: SPL Memo Program (JSON greeting payload)
│
▼
[ Wallet Signature (Phantom / Solflare) ]
│
▼
[ Solana Devnet Ledger ] ────> Immutable, verifiable on Solana Explorer


### SPL Memo On-Chain Payload
Each gift embeds an indelible JSON record:
```json
{
  "app": "SolWish",
  "wishId": "wish_sample123",
  "to": "Recipient Name",
  "from": "Giver Name",
  "msg": "Happy Birthday! Wishing you all the best!",
  "date": "2026-10-08T18:45:48.588Z"
}
🛠️ Tech Stack
Framework: Next.js (App Router, TypeScript)

Styling: Tailwind CSS

Blockchain & SDKs:

@solana/web3.js

@solana/wallet-adapter-react & @solana/wallet-adapter-react-ui

@solana/actions

SPL Memo Program v2: MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr

Deployment: Vercel

🚀 Getting Started Locally
Prerequisites
Node.js (v18 or higher recommended)

A Solana wallet extension (e.g., Phantom or Solflare) set to Devnet.

Installation
Clone the repository:

Bash
git clone [https://github.com/](https://github.com/)<your-username>/solwish.git
cd solwish
Install dependencies:

Bash
npm install
Configure Environment Variables:
Create a .env.local file in the root directory (optional for Supabase storage):

Фрагмент кода
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
Run the development server:

Bash
npm run dev
Open http://localhost:3000 in your browser.

🧪 Testing on Solana Devnet
Switch your Phantom / Solflare wallet network to Devnet.

Request Devnet SOL via solana airdrop 1 or an official Solana Devnet faucet.

Navigate to /create to generate a new Wishlist Blink.

Open the generated Blink URL (/blink?id=...), enter your name, an on-chain note, and complete the transaction.

Click "View in Solana Explorer" to inspect the confirmation and witness the SPL Memo greeting payload preserved on-chain.

📜 License
Distributed under the MIT License. See LICENSE for more information.
