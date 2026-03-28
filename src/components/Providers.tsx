"use client";

import { AdminProvider } from "@/components/AdminContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <AdminProvider>{children}</AdminProvider>;
}
