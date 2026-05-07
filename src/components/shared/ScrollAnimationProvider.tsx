"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function ScrollAnimationProvider({ children }: { children: React.ReactNode }) {
  useScrollAnimation();
  return <>{children}</>;
}
