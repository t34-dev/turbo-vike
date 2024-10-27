import React from "react";
import { ClerkProvider } from "@clerk/clerk-react";
import { QueryProvider } from "./query-provider";
import { I18nProvider } from "./i18-provider";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { WgmProvider } from "@/components/providers/wagmi-provider";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

export function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
        <WgmProvider>
          <QueryProvider>
            <RainbowKitProvider>
              <I18nProvider>{children}</I18nProvider>
            </RainbowKitProvider>
          </QueryProvider>
        </WgmProvider>
      </ClerkProvider>
    </ErrorBoundary>
  );
}
