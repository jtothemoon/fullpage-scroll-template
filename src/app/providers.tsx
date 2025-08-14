"use client";

import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/components/contexts";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider 
      attribute="class" 
      enableSystem={true} 
      defaultTheme="system"
      enableColorScheme={false}
    >
      <LanguageProvider defaultLanguage="en">
        {children}
      </LanguageProvider>
    </ThemeProvider>
  );
}