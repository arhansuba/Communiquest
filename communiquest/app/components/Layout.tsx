import React, { ReactNode } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useWallet } from '@solana/wallet-adapter-react';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, title = 'CommuniQuest' }) => {
  const { connected, publicKey, connect, disconnect } = useWallet();

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-blue-600 text-white">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <a className="text-2xl font-bold">CommuniQuest</a>
          </Link>
          <div className="space-x-4">
            <Link href="/quests"><a>Quests</a></Link>
            <Link href="/leaderboard"><a>Leaderboard</a></Link>
            <Link href="/governance"><a>Governance</a></Link>
            {connected && <Link href="/profile"><a>Profile</a></Link>}
            <button
              onClick={connected ? disconnect : connect}
              className="bg-white text-blue-600 px-4 py-2 rounded"
            >
              {connected ? 'Disconnect' : 'Connect Wallet'}
            </button>
          </div>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-gray-100">
        <div className="container mx-auto px-4 py-4 text-center">
          © 2024 CommuniQuest. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
