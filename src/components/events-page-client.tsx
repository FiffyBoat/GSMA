"use client";

import type { ReactNode } from "react";

interface EventsPageClientProps {
  navbar: ReactNode;
  children: ReactNode;
}

export default function EventsPageClient({ navbar, children }: EventsPageClientProps) {
  return (
    <>
      {navbar}
      {children}
    </>
  );
}
