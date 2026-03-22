"use client";

import type { ReactNode } from "react";
import EventPopup from "./EventPopup";

interface HomeClientProps {
  children: ReactNode;
}

export default function HomeClient({ children }: HomeClientProps) {
  return (
    <>
      <EventPopup />
      {children}
    </>
  );
}

