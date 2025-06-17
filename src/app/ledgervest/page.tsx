// src/app/ledgervest/page.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ledgervest.module.css';

export const metadata = {
  title: 'LedgerVest | My Decentralized Fundraising Platform',
  description: 'Learn how LedgerVest makes decentralized fundraising simple, secure, and transparent.',
};

export default function LedgerVestPage() {
  return (
    <div className="container mx-auto px-4 py-12">

<div className="max-w-4xl mx-auto mb-10">
  <Link href="https://www.myledgervest.com" target="_blank">
    <div className={styles.imageWrapper}>
      <Image
        src="/ledgerVest.webp"
        alt="LedgerVest Preview"
        width={1280}
        height={720}
      />
    </div>
  </Link>
</div>


      <h1 className="text-4xl font-bold mb-6 text-center">LedgerVest Fundraising Platform</h1>

      <p className="text-lg mb-4">
        LedgerVest is a decentralized crowdfunding platform I built from scratch. It integrates smart contracts,
        frontend/backend systems, data visualization, and wallet interactions to enable efficient and transparent fundraising.
      </p>

      <div className="mb-4">
        <p>With LedgerVest, users can:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>Create and manage their own fundraising campaigns</li>
          <li>Contribute ETH using a connected wallet</li>
          <li>Submit spending requests and vote on them democratically</li>
          <li>View campaign stats and history through personal dashboards</li>
        </ul>
      </div>

      <p className="mb-6">
        This project was built using <strong>Next.js</strong>, <strong>Prisma</strong>, <strong>Hardhat</strong>,
        <strong>Neon</strong>, <strong>RainbowKit</strong>, and other modern tools.
      </p>

      <div className="text-center">
        <Link href="https://www.myledgervest.com" target="_blank" className="text-blue-600 underline font-medium">
          Visit the LedgerVest Platform &rarr;
        </Link>
      </div>
    </div>
  );
}
