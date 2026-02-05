import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QuantOver: Money Maestro's Trading Strategy Optimizer",
  description: "RAG-powered quantitative finance platform with a luxurious vault-inspired UI. Optimize trading strategies, manage risk, and analyze portfolios with ML-powered insights. For educational purposes only.",
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
