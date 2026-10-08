'use client';

import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { LanguageProvider } from '@/context/LanguageContext';

// Импорт базовых стилей модалки Solana кошельков
import '@solana/wallet-adapter-react-ui/styles.css';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  // Эндпоинт devnet кластера Solana
  const endpoint = useMemo(() => clusterApiUrl('devnet'), []);

  // Поддерживаемые кошельки
  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}