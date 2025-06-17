'use client';

import { useEffect, useState } from 'react';
import {
  useAccount,
  useSendTransaction,
  useConnect,
  useChainId,
  useChains,
} from 'wagmi';
import { parseEther } from 'viem';
import { injected } from 'wagmi/connectors';
import { AutoReconnect } from '@/components/AutoConnect';

export default function DonatePage() {
  const [amount, setAmount] = useState('0.01');
  const [isMobileShort, setIsMobileShort] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const chainId = useChainId();
  const chains = useChains();
  const { sendTransaction, data, status, error, isPending } = useSendTransaction();

  const supportedChains = [
    { id: 1, name: 'mainnet', explorer: 'https://etherscan.io/tx/' },
    { id: 137, name: 'polygon', explorer: 'https://polygonscan.com/tx/' },
    { id: 11155111, name: 'sepolia', explorer: 'https://sepolia.etherscan.io/tx/' },
  ];

  const currentChain = isConnected
    ? supportedChains.find((c) => c.id === chainId)
    : undefined;

  const explorerBaseUrl = currentChain?.explorer ?? '';

  useEffect(() => {
    setHasMounted(true);
    const handleResize = () => setIsMobileShort(window.innerWidth < 460);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const displayAddress = () => {
    if (!address) return '';
    return isMobileShort
      ? `${address.slice(0, 6)}...${address.slice(-4)}`
      : address;
  };

  const handleDonate = () => {
    const value = parseEther(amount || '0');
    sendTransaction({
      to: '0xaada21fD544dA24B3b96E465C4c7074f4D6E8632',
      value,
    });
  };

  return (
    <>
      <AutoReconnect />

      <div className="container mx-auto px-4 py-12 max-w-xl text-center">
        <h1 className="text-3xl font-bold mb-4">Support My Work</h1>

        {/* 🧠 說服性段落 */}
        <div className="text-left text-gray-700 mb-8 space-y-4 text-sm leading-relaxed">
          <p>
            This project is built with passion to help more people understand and explore the power of decentralized technology.
          </p>
          <p>
            Your donation helps cover infrastructure costs, development time, and ensures this platform remains free and open for everyone.
          </p>
          <p>
            Even a small amount makes a big difference. If you’ve found value in this project, please consider donating to keep it running and growing.
          </p>
          <p>
            Donations are secure and easy through your crypto wallet.
          </p>
        </div>

        <p className="mb-4 text-gray-700">
          We accept donations on:{' '}
          <span className="font-semibold text-blue-600">
            {supportedChains.map((c) => c.name).join(', ')}
          </span>
        </p>

        <p className="mb-6 text-sm text-gray-500">
          {hasMounted && isConnected && chainId ? (
            <>
              {"You're on "}
              <span className="font-semibold text-blue-600">
                {
                  supportedChains.find((c) => c.id === chainId)?.name ??
                  chains.find((c) => c.id === chainId)?.name ??
                  `Chain ID ${chainId}`
                }
              </span>
              {supportedChains.every((c) => c.id !== chainId) && (
                <>
                  , however we do not support this blockchain.
                </>
              )}
            </>
          ) : (
            'Not connected or loading chain info...'
          )}
        </p>

        {!isConnected ? (
          <button
            onClick={() => connect({ connector: injected() })}
            className="cybr-btn"
            aria-label="Connect Wallet"
          >
            Connect Wallet<span aria-hidden>_</span>
            <span aria-hidden className="cybr-btn__glitch">Connect Wallet_</span>
          </button>
        ) : (
          <>
            <div className="w-full text-center mb-4">
              <p className="text-sm text-gray-500">Your wallet:</p>
              <p className="break-words break-normal max-w-full font-mono text-xs text-white mx-auto px-4">
                {displayAddress()}
              </p>
            </div>

            <div className="mb-4">
              <input
                type="number"
                min="0.001"
                step="0.001"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border rounded px-4 py-2 w-40 text-center"
              />{' '}
              <span>ETH</span>
            </div>

            <button
              onClick={handleDonate}
              disabled={isPending}
              className="cybr-btn disabled:opacity-50"
              aria-label="Donate ETH"
            >
              {isPending ? (
                <>
                  Sending<span aria-hidden>_</span>
                  <span aria-hidden className="cybr-btn__glitch">Sending_</span>
                </>
              ) : (
                <>
                  Donate<span aria-hidden>_</span>
                  <span aria-hidden className="cybr-btn__glitch">Donate_</span>
                </>
              )}
            </button>

            {status === 'success' &&
              typeof data === 'string' && (
                <p className="mt-4 text-green-600 font-medium">
                  Transaction sent!{' '}
                  <a
                    href={`${explorerBaseUrl}${data}`}
                    target="_blank"
                    className="underline text-blue-600"
                    rel="noopener noreferrer"
                  >
                    View on {currentChain?.name ?? 'Explorer'}
                  </a>
                </p>
              )}

            {status === 'error' && (
              <p className="mt-4 text-red-600 font-medium">Error: {error?.message}</p>
            )}
          </>
        )}
      </div>
    </>
  );
}
