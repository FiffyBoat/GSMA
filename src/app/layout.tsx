import type { Metadata } from "next";
import "./globals.css";
import OrchidsInstrumentation from "@/components/OrchidsInstrumentation";
import UnhandledRejectionGuard from "@/components/UnhandledRejectionGuard";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Ga South Municipal Assembly | Official Website",
  description:
    "Official website of the Ga South Municipal Assembly (GSMA), serving residents with integrity and transparency.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <UnhandledRejectionGuard />
        <OrchidsInstrumentation />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
