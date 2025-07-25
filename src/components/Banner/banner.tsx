'use client';

import { useEffect, useState } from 'react';
import styles from './banner.module.css';

interface PriceInfo {
  symbol: string;
  price: number;
  change: number;
}

export default function ChainBanner() {
  const [prices, setPrices] = useState<PriceInfo[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true'
        );
        if (!res.ok) throw new Error('Failed to fetch prices');

        const data = await res.json();
        setPrices([
          { symbol: 'BTC', price: data.bitcoin.usd, change: data.bitcoin.usd_24h_change },
          { symbol: 'ETH', price: data.ethereum.usd, change: data.ethereum.usd_24h_change },
          { symbol: 'SOL', price: data.solana.usd, change: data.solana.usd_24h_change },
        ]);
      } catch (err) {
        console.error('❌ Crypto price fetch failed:', err);
        setPrices([]); // fallback
      }
    };

    fetchPrices(); // 初始載入一次
    const interval = setInterval(fetchPrices, 60 * 30 * 1000); // 每小時一次
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.bannerContainer} onClick={() => setIsPaused((prev) => !prev)}>
      <div className={styles.scrollWrapper}>
        <div
          className={`${styles.scrollText} ${
            isPaused ? styles.scrollPaused : styles.scrollRunning
          }`}
        >
          <span className={styles.greenDot}>
            Don&apos;t be scared!&nbsp;Believe in Love &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;🌏
          </span>

          {prices.length === 0 ? (
            <span className={styles.token}>⚠️ Price feed unavailable</span>
          ) : (
            prices.map((coin) => (
              <span key={coin.symbol} className={styles.token}>
                <span className={styles.tokenSymbol}>{coin.symbol}:</span>
                ${coin.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                <span className={coin.change >= 0 ? styles.positive : styles.negative}>
                  ({coin.change >= 0 ? '+' : ''}
                  {coin.change.toFixed(2)}%)
                </span>
              </span>
            ))
          )}

          <span className={styles.greenDot}>🌎</span>
        </div>
      </div>
    </div>
  );
}
