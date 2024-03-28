import type { Metadata } from "next";
import Link from 'next/link'
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dýrabúðin",
  description: "Öll dýrin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <ul>
            <li><Link href="/">Heim</Link></li>
            <li><Link href="/dyr">Dýr</Link></li>
            <li><Link href="/karfa">Karfa</Link></li>
          </ul>
        </header>
        {children}
      </body>
    </html>
  );
}
