// app/providers.tsx
"use client";

import { StateProvider } from "@/context/state";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <StateProvider>{children}</StateProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
