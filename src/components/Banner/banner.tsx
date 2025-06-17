'use client';

import { useEffect, useState } from 'react';
import { useChainId } from 'wagmi';
import styles from './banner.module.css';

const CHAIN_NAMES: Record<number, string> = {
  1: 'Ethereum Mainnet',
  11155111: 'Sepolia Testnet',
  137: 'Polygon',
  80001: 'Polygon Mumbai',
  42161: 'Arbitrum',
  421614: 'Arbitrum Sepolia',
  10: 'Optimism',
  11155420: 'Optimism Sepolia',
  59144: 'Linea',
  59140: 'Linea Sepolia',
};

interface PriceInfo {
  symbol: string;
  price: number;
  change: number;
}

export default function ChainBanner() {
  const chainId = useChainId();
  const [prices, setPrices] = useState<PriceInfo[]>([]);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true'
        );
        const data = await res.json();
        const formatted: PriceInfo[] = [
          {
            symbol: 'BTC',
            price: data.bitcoin.usd,
            change: data.bitcoin.usd_24h_change,
          },
          {
            symbol: 'ETH',
            price: data.ethereum.usd,
            change: data.ethereum.usd_24h_change,
          },
          {
            symbol: 'SOL',
            price: data.solana.usd,
            change: data.solana.usd_24h_change,
          },
        ];
        setPrices(formatted);
      } catch (error) {
        console.error('Failed to fetch crypto prices:', error);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.bannerContainer}>
      <div className={styles.scrollText}>
        <span className={styles.greenDot}>🟢</span>
       

        {prices.map((coin) => (
          <span key={coin.symbol} className={styles.token}>
            <span className={styles.tokenSymbol}>{coin.symbol}:</span>
            ${coin.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}{' '}
            <span className={coin.change >= 0 ? styles.positive : styles.negative}>
              ({coin.change >= 0 ? '+' : ''}
              {coin.change.toFixed(2)}%)
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
