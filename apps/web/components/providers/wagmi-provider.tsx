import React from "react";
import { http, createConfig, WagmiProvider } from "wagmi";
import { arbitrum, base, mainnet, optimism, polygon, sepolia } from "wagmi/chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  connectors: [],
});

export const configRainbowkit = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: [mainnet, sepolia, polygon, optimism, arbitrum, base],
  ssr: true,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

export function WgmProvider({ children }: { children: React.ReactNode }) {
  return <WagmiProvider config={configRainbowkit}>{children}</WagmiProvider>;
}
