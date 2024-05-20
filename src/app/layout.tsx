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
      <head>
        <meta
          name="description"
          content="デジタルマニ車は、伝統的な仏教のマニ車（祈祷輪）をデジタル化したアプリです。ユーザーは、スマートフォンやタブレットを使って、どこにいても簡単にマニ車を回す体験ができます。"
        />
        <link rel="icon" type="image/svg+xml" href="./icon.svg"/>
        <link rel="apple-touch-icon" href="./icon.svg" sizes="180x180"/>
        <title>デジタルマニ車</title>
      </head>
      <body className={inter.className}>
        <RecoilProvider>{children}</RecoilProvider>
      </body>
    </html>
  );
}
