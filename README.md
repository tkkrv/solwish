# SolWish

> A decentralized peer-to-peer gifting protocol that pairs direct crypto contributions with permanent on-chain greeting cards.

## Problem
Traditional social gifting platforms charge steep intermediary fees (5%–15%), delay payouts, and rely on centralized servers where greeting cards and personal wishes easily get lost or deleted over time.

## Solution
SolWish allows anyone to create a goal-driven wishlist and share it as an interactive link or Solana Blink. Supporters transfer funds directly to the recipient with zero platform fees, embedding an indelible greeting note directly into the payment transaction.

## How it uses Solana
Every contribution bundles two instructions inside a single atomic transaction on Solana Devnet:
1. **`SystemProgram.transfer`**: Moves SOL directly from the giver to the recipient’s wallet.
2. **`SPL Memo Program v2` (`MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr`)**: Writes a structured JSON payload directly onto the ledger:
   ```json
   {
     "app": "SolWish",
     "wishId": "wish_123",
     "to": "Recipient",
     "from": "Sender",
     "msg": "Happy Birthday!",
     "date": "2026-10-08T18:45:48.588Z"
   }
This guarantees an immutable, permanent greeting record verifiable on Solana Explorer.

How to run
Prerequisites
Node.js v18+

Solana wallet (Phantom or Solflare) set to Devnet

Installation
Clone the repository:

Bash
git clone [https://github.com/your-username/solwish.git](https://github.com/your-username/solwish.git)
cd solwish
Install dependencies:

Bash
npm install
Start the development server:

Bash
npm run dev
Open http://localhost:3000 in your browser.

Team
SolWish Team — Developers and community builders based in Aktobe, Kazakhstan.
