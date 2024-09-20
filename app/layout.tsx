import Image from 'next/image';
import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Trade Entry Calculator",
  description: "Calculate your trade entries, exits, and potential profits with ease.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-black">
          <div className="container mx-auto flex items-center justify-center">
            <Image src="/logo.png" alt="Logo" width={120} height={120} className="py-1" />
          </div>
        </header>
        {children}
      </body>
    </html>
  )
}
