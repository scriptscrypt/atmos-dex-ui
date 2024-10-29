"use client";

import { ReactNode } from "react";

import { TooltipProvider } from "@/components/ui/tooltip";

import useMode from "@/hooks/useMode";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const { isDarkMode } = useMode();

  return (
    <TooltipProvider delayDuration={0}>
      <DialogProvider>{children}</DialogProvider>
    </TooltipProvider>
  );
}

// Add this custom DialogProvider to handle dialog context if needed
interface DialogProviderProps {
  children: ReactNode;
}

function DialogProvider({ children }: DialogProviderProps) {
  return <div className="relative">{children}</div>;
}
