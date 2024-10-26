import React from "react";
import { ClerkProvider } from "@clerk/clerk-react";
import { QueryProvider } from "./query-provider";
import { I18nProvider } from "@/components/providers/i18-provider";

export function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
      <QueryProvider>
        <I18nProvider>{children}</I18nProvider>
      </QueryProvider>
    </ClerkProvider>
  );
}
