import type { Metadata } from "next";
import "./globals.css";  // Update this line

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
      <body>{children}</body>
    </html>
  )
}
