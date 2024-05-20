"use client";

import { Inter } from "next/font/google";
import RecoilProvider from "./recoilProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="jp">
      <body className={inter.className}>
        <RecoilProvider>{children}</RecoilProvider>
      </body>
    </html>
  );
}
