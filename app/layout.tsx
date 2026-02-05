import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QuantOver - Your Adorable AI Trading Bestie 💖",
  description: "RAG-powered quantitative finance platform with the cutest pink theme! Upload financial docs, get optimized trading strategies with ML-powered backtests. For simulation & education only!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
