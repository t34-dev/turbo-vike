// components/providers/root-provider.tsx
import React from "react";
import { ClerkProvider } from "@clerk/clerk-react";
import { QueryProvider } from "./query-provider";
import { I18nProvider } from "./i18-provider";
import { LanguageWrapper } from "@/components/LanguageWrapper";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
        <QueryProvider>
          <I18nProvider>
            <LanguageWrapper>{children}</LanguageWrapper>
          </I18nProvider>
        </QueryProvider>
      </ClerkProvider>
    </ErrorBoundary>
  );
}
