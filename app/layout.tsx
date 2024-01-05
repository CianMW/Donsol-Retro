import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/Components/Context/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Donsol Retro",
  description: "A Solitaire cardgame in a clean retro themed ui."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body  >
        <Providers>
          <div className={inter.className} style={{overflow:'hidden'}}>

        {children}
          </div>
        </Providers>
        </body>
    </html>
  );
}
