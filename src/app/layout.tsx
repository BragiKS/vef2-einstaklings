import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dýrabúðin",
  description: "Öll dýrin",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(options);
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <ul>
            <li>
              <Link href="/">Heim</Link>
            </li>
            <li>
              <Link href="/dyr">Dýr</Link>
            </li>
            <li>
              <Link href="/karfa">Karfa</Link>
            </li>
            <li>
              {session ? (
                <Link href="/api/auth/signout">Sign out</Link>
              ) : (
                <Link href="/api/auth/signin?callbackUrl=/">Sign in</Link>
              )}
            </li>
          </ul>
        </header>
        {children}
      </body>
    </html>
  );
}
