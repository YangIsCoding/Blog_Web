// src/lib/wagmi.ts
import { createConfig, http } from 'wagmi';
import {
  mainnet,
  sepolia,
  polygon,
  optimism,
  arbitrum,
  base,
  gnosis,
  linea,
} from 'wagmi/chains';
import { injected } from 'wagmi/connectors';

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia, polygon, optimism, arbitrum, base, gnosis, linea],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
    [gnosis.id]: http(),
    [linea.id]: http(),
  },
  ssr: true,
});
