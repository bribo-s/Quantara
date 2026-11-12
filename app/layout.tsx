import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quantara | AI-Powered Quantitative Market Intelligence",
  description: "Track real-time stock prices, interactive TradingView charts, automated alerts, and AI-driven market insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen bg-[#07090e] text-gray-200">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
